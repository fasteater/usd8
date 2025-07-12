// supabase/functions/webjoinWithInvitation/index.js
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
serve(async (req)=>{
  if (req.method === "OPTIONS") {
    // Handle CORS preflight
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  let body;
  try {
    body = await req.json();
  } catch  {
    return new Response(JSON.stringify({
      code: 2,
      error: "Invalid JSON"
    }), {
      status: 400,
      headers: corsHeaders
    });
  }
  const { email, budget, invitation } = body;
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, supabaseKey);
  // 1. Check if email already exists
  const { data: existing, error: emailErr } = await supabase.from("waitinglist").select("email").eq("email", email).maybeSingle();
  if (emailErr) {
    return new Response(JSON.stringify({
      code: 2,
      error: "DB error"
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
  if (existing) {
    return new Response(JSON.stringify({
      code: 1
    }), {
      status: 200,
      headers: corsHeaders
    });
  }
  // 2. If invitation provided, check if it exists and get bonus values
  let inviterEmail = null, bonusInvitee = 0, bonusSelf = 0;
  if (invitation) {
    const { data: inviteRow, error: inviteErr } = await supabase.from("invitation").select("email, bonusInvitee, bonusSelf").eq("invitation", invitation).maybeSingle();
    if (inviteErr) {
      return new Response(JSON.stringify({
        code: 2,
        error: "DB error"
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
    if (!inviteRow) {
      return new Response(JSON.stringify({
        code: 4
      }), {
        status: 200,
        headers: corsHeaders
      });
    }
    inviterEmail = inviteRow.email;
    bonusInvitee = inviteRow.bonusInvitee || 0;
    bonusSelf = inviteRow.bonusSelf || 0;
  }
  // 3. Insert new waitinglist entry
  const { error: insertErr } = await supabase.from("waitinglist").insert([
    {
      email,
      budget,
      invitation
    }
  ]);
  if (insertErr) {
    return new Response(JSON.stringify({
      code: 2,
      error: "DB error"
    }), {
      status: 200,
      headers: corsHeaders
    });
  }
  // 4. Add bonusInvitee to tokenAllocation of the new email
  let userTokenAllocation = null;
  if (bonusInvitee) {
    const { data: userRow } = await supabase.from("waitinglist").select("tokenAllocation").eq("email", email).maybeSingle();
    userTokenAllocation = (userRow?.tokenAllocation || 0) + bonusInvitee;
    await supabase.from("waitinglist").update({
      tokenAllocation: userTokenAllocation
    }).eq("email", email);
  } else if (invitation) {
    // If invitation exists but no bonusInvitee, still fetch the current allocation
    const { data: userRow } = await supabase.from("waitinglist").select("tokenAllocation").eq("email", email).maybeSingle();
    userTokenAllocation = userRow?.tokenAllocation || 0;
  }
  // 5. Add bonusSelf to tokenAllocation of the inviter's email
  if (inviterEmail && bonusSelf) {
    const { data: inviterRow } = await supabase.from("waitinglist").select("tokenAllocation").eq("email", inviterEmail).maybeSingle();
    const newAllocation = (inviterRow?.tokenAllocation || 0) + bonusSelf;
    await supabase.from("waitinglist").update({
      tokenAllocation: newAllocation
    }).eq("email", inviterEmail);
  }

  return new Response(JSON.stringify({
    code: 0,
    tokenAllocation: userTokenAllocation
  }), {
    status: 200,
    headers: corsHeaders
  });
});
