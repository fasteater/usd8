//UUWWWWWUUWWWWWWUUUUWWWWWWWWWWWWWUUUWWWWWWWWWWWWUUUUUWWWWWWWWWWWWWUU
//UZ      U       UU              UUU             ZUU               U
//UZ      U       UU              UUU              UU       U       U
//UZ      U       UU        WUUUUUUUU      Z       UU       W       U
//UZ      U       UU              UUU      Z       UU               U
//UZ      U       UU              UUU      Z       UU               U
//UZ              UUUWUWUW        UUU      Z       UU       W       U
//UZ              UU              UUU              UU       U       U
//UZ              UU              UUU             ZUU               U
//UUWWWWWWWWWWWWWUUUUWWWWWWWWWWWWWUUUWWWWWWWWWWWWUUUUUWWWWWWWWWWWWWUU

import React, { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sqgkhcgjwiskwfraanth.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ2toY2dqd2lza3dmcmFhbnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzIxODEsImV4cCI6MjA2NjAwODE4MX0.uckBxNZK-y1KQbUnOFMLUhnlXvEPT15aakqSyQz_5Yw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LandingPage() {
  const emailRef = useRef(null);
  const budgetRef = useRef(null);
  const invitationRef = useRef(null); 
  const [success, setSuccess] = useState(false);
  const [responded, setResponded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invitationValue, setInvitationValue] = useState(""); // Add state for invitation
  const [errorCode, setErrorCode] = useState(null); // Track error code
  const [tokenAllocation, setTokenAllocation] = useState(null); // Track token allocation

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setInvitationValue(code);
      if (invitationRef.current) invitationRef.current.value = code;
    }
  }, []);

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleJoinInClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorCode(null);
    setTokenAllocation(null);
    const email = emailRef.current.value;
    const budget = budgetRef.current.value;
    const invitation = invitationRef.current.value || null;

    // Frontend email validation
    if (!validateEmail(email)) {
      setLoading(false);
      setSuccess(false);
      setResponded(true);
      setErrorCode(null); // Use null to trigger the 'Incorrect email' message
      return;
    }

    try {
      const response = await fetch('https://sqgkhcgjwiskwfraanth.supabase.co/functions/v1/webjoinWithInvitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, budget, invitation })
      });
      const result = await response.json();
      setResponded(true);
      if (result.code === 0) {
        setSuccess(true);
        if (result.tokenAllocation !== undefined && result.tokenAllocation !== null) {
          setTokenAllocation(result.tokenAllocation);
        }
      } else {
        setSuccess(false);
        setErrorCode(result.code);
      }
    } catch (err) {
      setSuccess(false);
      setErrorCode(2);
    }
    setLoading(false);
  };

  return (
    <div className="font-blex min-h-screen bg-[#252525] text-white flex flex-col items-center justify-center p-4">
      <img src="/assets/logo.png" className="md:w-[269px] w-[200px] h-auto z-10 mt-[80px] mb-[20px]"/>
      <p className="mt-2 items-center text-base">Stable Coin Wrapper with Super Powers</p>

      <img
        src="/assets/tyche-statue.png"
        alt="Tyche Statue"
        className="hidden md:block w-[1044px] h-auto z-10 mt-[50px] mb-[50px]"
      />
      <img
        src="/assets/tyche-mobile.png"
        alt="Tyche Statue"
        className="block md:hidden w-[1044px] h-auto z-10 mt-[50px] mb-[50px]"
      />

      <p className="text-center text-base mb-10 leading-[30px] md:leading-[43px]">
        USD8 gives stable coin super powers, like hack protection, free transfer, privacy and more. <br />
        Built by security auditors, for defi users. 
      </p>

      <div className="w-full max-w-md text-center mt-[80px] ">
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          onChange={() => {setResponded(false);}}
          className="w-full block mx-auto px-6 md:py-4 py-5 bg-gray-200 text-black rounded mb-[40px] "
        />
        <div className="mb-4">
          <select
            id="stable-amount"
            name="stable-amount"
            ref={budgetRef}
            className="appearance-none w-full block mx-auto px-6 md:py-4 py-5 bg-gray-200 text-black rounded mb-[40px]"
            required
          >
            <option value="0">Amount to wrap?</option>
            <option value="500">up to $500</option>
            <option value="1000">up to $1k</option>
            <option value="10000">up to $10k</option>
            <option value="100000">up to $100k</option>
            <option value="1000000">up to $1 million</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Invitation Code (optional)"
          ref={invitationRef}
          value={invitationValue}
          onChange={e => { setInvitationValue(e.target.value); setResponded(false); }}
          className="w-full block mx-auto px-6 md:py-4 py-5 bg-gray-200 text-black rounded mb-[40px] "
        />
        {!success && !responded &&(
          <button disabled={loading} className="bg-[#00B7AB] hover:bg-[#00CC99] text-black font-semibold md:px-6 md:py-4 px-8 py-5 rounded" onClick={handleJoinInClick}>
            {loading ? (
           "Hold on ..."
          ) : (
            "join waiting list"
          )}
          </button>
        )}
        {success && responded && tokenAllocation !== null ? (
          <div style={{ color: "green", marginTop: "10px" }}>
            You are on the waiting list! The invitation code gives you {tokenAllocation} Cover Token Allocation. <a href="https://x.com/usd8_official" target="_blank" rel="noopener noreferrer" className="hover:text-white text-gray-400">Follow our X</a> for future redeem instructions.
          </div>
        ) : success && responded && (
          <div style={{ color: "green", marginTop: "10px" }}>You are on the waiting list! <a href="https://x.com/usd8_official" target="_blank" rel="noopener noreferrer" className="hover:text-white text-gray-400">Follow our X</a> for more updates.</div>
        )}
        {!success && responded && errorCode === 1 && (
          <div style={{ color: "red", marginTop: "10px" }}>This email is already on the waiting list.</div>
        )}
        {!success && responded && errorCode === 2 && (
          <div style={{ color: "red", marginTop: "10px" }}>An unexpected error occurred, is your email valid?</div>
        )}
        {!success && responded && errorCode === 4 && (
          <div style={{ color: "red", marginTop: "10px" }}>Invitation code not found. Please check your code.</div>
        )}
        {!success && responded && errorCode === null && (
          <div style={{ color: "red", marginTop: "10px" }}>Incorrect email, please try again.</div>
        )}
        {!success && responded && errorCode === 'invalid_email' && (
          <div style={{ color: "red", marginTop: "10px" }}>Please enter a valid email address.</div>
        )}
       {/* <p className="text-xs text-gray-600 mt-[30px]">batch one 800/1000</p> */}
      </div>

      <footer className=" bottom-4 flex text-gray-400 mb-[100px] mt-[200px]">
        <a href="https://x.com/usd8_official" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          X.com/usd8_official
        </a>
        <span className="w-[100px] h-auto"></span>
        <a href="https://docs.usd8.finance" className="hover:text-white">Docs</a>
      </footer>
    </div>
  );
}
