import React, { useState,useRef } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sqgkhcgjwiskwfraanth.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ2toY2dqd2lza3dmcmFhbnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzIxODEsImV4cCI6MjA2NjAwODE4MX0.uckBxNZK-y1KQbUnOFMLUhnlXvEPT15aakqSyQz_5Yw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LandingPage() {
  const emailRef = useRef(null);
  const budgetRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [responded, setResponded] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleJoinInClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const budget = budgetRef.current.value;

    const { data } = await supabase
      .rpc('webjoin', {email, budget});
  
    console.log(data);
    setResponded(true);

    if (!data) {
      setSuccess(false);
    
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="font-blex min-h-screen bg-[#252525] text-white flex flex-col items-center justify-center p-4">
      <img src="/assets/logo.png" className="md:w-[269px] w-[200px] h-auto z-10 mt-[80px] mb-[20px]"/>
      <p className="mt-2 items-center text-base">Protection Wrapper for Stable Coins</p>

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
        Wrap your stables for hack protection. <br />
        Built by security auditors, for defi users.
      </p>

      <div className="w-full max-w-md text-center mt-[80px] ">
        <label className="block mb-2 text-sm mb-[40px]">waiting list</label>
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
            className="w-full block mx-auto px-6 md:py-4 py-5 bg-gray-200 text-black rounded mb-[40px]"
            required
          >
            <option value="0">How much will you wrap into USD8</option>
            <option value="500">up to $500</option>
            <option value="1000">up to $1k</option>
            <option value="10000">up to $10k</option>
            <option value="100000">up to $100k</option>
            <option value="1000000">up to $1 million</option>
          </select>
        </div>
        {!success && !responded &&(
          <button disabled={loading} className="bg-[#00B7AB] hover:bg-[#00CC99] text-black font-semibold md:px-6 md:py-4 px-8 py-5 rounded" onClick={handleJoinInClick}>
            {loading ? (
           "Hold on ..."
          ) : (
            "join in"
          )}
          </button>
        )}
        {success && responded && (
          <div style={{ color: "green", marginTop: "10px" }}>You are on the waiting list! <a href="https://x.com/usd8_official" target="_blank" rel="noopener noreferrer" className="hover:text-white text-gray-400">Follow our X</a> for more updates.</div>
        )}
        {!success && responded && (
          <div style={{ color: "red", marginTop: "10px" }}>Incorrect email, please try again.</div>
        )}
       {/* <p className="text-xs text-gray-600 mt-[30px]">batch one 800/1000</p> */}
      </div>

      <footer className=" bottom-4 flex text-gray-400 mb-[100px] mt-[200px]">
        <a href="https://x.com/usd8_official" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          X.com/usd8
        </a>
        <span className="w-[100px] h-auto"></span>
        <a href="/docs" className="hover:text-white">Docs</a>
      </footer>
    </div>
  );
}
