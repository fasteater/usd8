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

const superPowers = [
  {
    key: "hack-coverage",
    label: "Hack Coverage",
    img: "/assets/power-hacker.png",
    hero: "/assets/hero-hacker.png",
    desc: "This superpower provides hack coverage to USD8 users by dripping Cover Tokens to them every block — a non-transferable token that can be used to claim reimbursement if the holder’s positions are hacked in a covered DeFi protocol (not limited to USD8 positions).",
  },
  {
    key: "yield",
    label: "Yield",
    img: "/assets/power-yield.png",
    hero: "/assets/hero-yield.png",
    desc: "This superpower provides underlying yield to USD8 users. By staking USD8, users get competitive yield while still keeping other benefits on top, such as the Cover Token for hack coverage.",
  },
  {
    key: "free-transfer",
    label: "Free Transfer",
    img: "/assets/power-transfer.png",
    hero: "/assets/hero-transfer.png",
    desc: "This superpower refunds the gas fees users incur when transferring USD8 on supported chains. Users can periodically claim a rebate based on their USD8 transfer activity, all within a generous fair-use cap that covers the vast majority of users."
  },
  {
    key: "privacy",
    label: "Privacy",
    img: "/assets/power-privacy.png",
    hero: "/assets/hero-privacy.png",
    desc: "This super power will cloak USD8 balances and transfers behind on-chain privacy layers, bringing payment-grade confidentiality to an otherwise transparent blockchain.",
  },
  {
    key: "multi-collateral",
    label: "Multi-Collateral",
    img: "/assets/power-collateral.png",
    hero: "/assets/hero-collateral.png",
    desc: "This superpower aims to diversify USD8's backing to a basket of tier-one stable coins, lowering the protocol's exposure to any single asset and making USD8 more resilient to potential de-pegs.",
  },
];

// Add a mapping for polygon images
const polygonImages = {
  "hack-coverage": "/assets/polygon-hack.png",
  "yield": "/assets/polygon-yield.png",
  "free-transfer": "/assets/polygon-transfer.png",
  "privacy": "/assets/polygon-privacy.png",
  "multi-collateral": "/assets/polygon-collateral.png",
};

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
  const [selectedPower, setSelectedPower] = useState(superPowers[0].key);
  const [navGridVisible, setNavGridVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const formRef = useRef(null);
  const navGridRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setInvitationValue(code);
      if (invitationRef.current) invitationRef.current.value = code;
    }
  }, []);

  useEffect(() => {
    // Intersection Observer for nav grid animation
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNavGridVisible(true);
      },
      { threshold: 0.2 }
    );
    if (navGridRef.current) observer.observe(navGridRef.current);
    return () => {
      if (navGridRef.current) observer.unobserve(navGridRef.current);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setDescVisible(true), 700); // show desc after nav grid animates in
  }, [navGridVisible, selectedPower]);

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

  // Add scroll to form function
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: "#252525", minHeight: "100vh", width: "100vw" }}>
      <style>
        {`
          @font-face {
            font-family: 'delight-bold';
            src: url('/assets/fonts/delight-bold.woff2') format('woff2'),
                 url('/assets/fonts/delight-bold.woff') format('woff');
            font-weight: bold;
            font-style: normal;
          }
        `}
      </style>
      <div
        className="font-blex min-h-screen text-white flex flex-col items-center justify-center p-4"
        style={{
          maxWidth: "1044px",
          margin: "0 auto",
        }}
      >
        <img
          src="/assets/logo.png"
          className="md:w-[269px] w-[200px] h-auto z-10 mt-[80px] mb-[20px]"
        />
     

        {/* Overlay tyche.png and usd8bg.png to match tyche-statue.png position and size */}
        <div className="hidden md:flex w-full justify-center z-10 mt-[50px] mb-[50px]">
          <div
            className="relative"
            style={{
              width: 1044,
              height: 700, // adjust as needed to match original tyche-statue.png aspect ratio
              minHeight: 400,
              maxWidth: "100vw",
            }}
          >
            <img
              src="/assets/usd8bg.png"
              alt="USD8 Background"
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                zIndex: 1,
                filter: "blur(2px)",
              }}
            />
            <img
              src="/assets/tyche.png"
              alt="Tyche"
              className="absolute animate-float"
              style={{
                left: "22%",
                top: "0%",
                width: "50%",
                height: "auto",
                transform: "translate(-50%, -54%)", // visually center Tyche over bg
                zIndex: 2,
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        {/* Remove tyche-mobile.png, use tyche.png on mobile */}
        <div className="block md:hidden w-full flex justify-center z-10 mt-[50px] mb-[50px]">
          <div
            className="relative"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "593px",
              maxWidth: "100vw",
            }}
          >
            <img
              src="/assets/usd8bgmobile.png"
              alt="USD8 Background Mobile"
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                zIndex: 1,
                filter: "blur(2px)",
              }}
            />
            <img
              src="/assets/tyche.png"
              alt="Tyche"
              className="absolute animate-float"
              style={{
                left: 0,
                top: "-0",
                width: "100%",
                height: "100%",
                zIndex: 2,
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <p className="text-center text-base mb-10 leading-[30px] md:leading-[43px]">
          USD8 is a stablecoin wrapper with superpowers like hack coverage, free transfers, privacy, and more.
          Built by security auditors for DeFi users.
        </p>

        {/* --- Super Powers Section --- */}
        <div className="flex flex-col items-center mt-10 mb-10 w-full">
          <h2
            className="text-center"
            style={{ 
              fontFamily: "delight-bold", 
              marginTop: 100, 
              fontSize: 50,
              marginBottom: 32
            }}
          >
            Explore Superpowers
          </h2>
          {/* Navigation Grid */}
          <div
            ref={navGridRef}
            className="relative flex justify-center items-center mx-auto"
            style={{
              width: 309,
              height: 221,
              minWidth: 309,
              minHeight: 221,
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            {/* Hack Coverage */}
            <div
              className={`absolute cursor-pointer flex items-center justify-center rounded-[18px] transition-all duration-700
                ${navGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                left: 0,
                top: 0,
                width: 127,
                height: 147,
                background: selectedPower === "hack-coverage" ? "#4CF6FF" : "#181818",
                transitionDelay: navGridVisible ? "360ms" : "0ms", // random order
                transitionProperty: "opacity, transform",
              }}
              onClick={() => setSelectedPower("hack-coverage")}
              onMouseEnter={e => {
                if (selectedPower !== "hack-coverage") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#4CF6FF";
                }
              }}
              onMouseLeave={e => {
                if (selectedPower !== "hack-coverage") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#181818";
                }
              }}
            >
              <img
                src="/assets/power-hacker.png"
                alt="Hack Coverage"
                style={{
                  width: 60,
                  height: "auto",
                  position: "absolute",
                  left: 12,
                  top: 12,
                  objectFit: "contain"
                }}
              />
            </div>
            {/* Yield */}
            <div
              className={`absolute cursor-pointer flex items-center justify-end pr-4 rounded-[14px] transition-all duration-700
                ${navGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                left: 137,
                top: 0,
                width: 173,
                height: 65,
                background: selectedPower === "yield" ? "#4CF6FF" : "#181818",
                transitionDelay: navGridVisible ? "0ms" : "0ms", // random order
                transitionProperty: "opacity, transform",
              }}
              onClick={() => setSelectedPower("yield")}
              onMouseEnter={e => {
                if (selectedPower !== "yield") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#4CF6FF";
                }
              }}
              onMouseLeave={e => {
                if (selectedPower !== "yield") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#181818";
                }
              }}
            >
              <img src="/assets/power-yield.png" alt="Yield" style={{ width: 50, height: 50 }} />
            </div>
            {/* Free Transfer */}
            <div
              className={`absolute cursor-pointer flex items-center justify-center rounded-[14px] transition-all duration-700
                ${navGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                left: 137,
                top: 74,
                width: 96,
                height: 75,
                background: selectedPower === "free-transfer" ? "#4CF6FF" : "#181818",
                transitionDelay: navGridVisible ? "480ms" : "0ms", // random order
                transitionProperty: "opacity, transform",
              }}
              onClick={() => setSelectedPower("free-transfer")}
              onMouseEnter={e => {
                if (selectedPower !== "free-transfer") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#4CF6FF";
                }
              }}
              onMouseLeave={e => {
                if (selectedPower !== "free-transfer") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#181818";
                }
              }}
            >
              <img src="/assets/power-transfer.png" alt="Free Transfer" style={{ width: 50, height: 50 }} />
            </div>
            {/* Privacy */}
            <div
              className={`absolute cursor-pointer flex items-center justify-center rounded-[14px] transition-all duration-700
                ${navGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                left: 243,
                top: 74,
                width: 69,
                height: 149,
                background: selectedPower === "privacy" ? "#4CF6FF" : "#181818",
                transitionDelay: navGridVisible ? "120ms" : "0ms", // random order
                transitionProperty: "opacity, transform",
              }}
              onClick={() => setSelectedPower("privacy")}
              onMouseEnter={e => {
                if (selectedPower !== "privacy") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#4CF6FF";
                }
              }}
              onMouseLeave={e => {
                if (selectedPower !== "privacy") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#181818";
                }
              }}
            >
              <img
                src="/assets/power-privacy.png"
                alt="Privacy"
                style={{
                  width: 50,
                  height: "auto",
                  position: "absolute",
                  top: 14,
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
              />
            </div>
            {/* Multi-Collateral */}
            <div
              className={`absolute cursor-pointer flex items-center pl-6 rounded-[14px] transition-all duration-700
                ${navGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                left: 0,
                top: 157,
                width: 232,
                height: 67,
                background: selectedPower === "multi-collateral" ? "#4CF6FF" : "#181818",
                transitionDelay: navGridVisible ? "240ms" : "0ms", // random order
                transitionProperty: "opacity, transform",
              }}
              onClick={() => setSelectedPower("multi-collateral")}
              onMouseEnter={e => {
                if (selectedPower !== "multi-collateral") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#4CF6FF";
                }
              }}
              onMouseLeave={e => {
                if (selectedPower !== "multi-collateral") {
                  e.currentTarget.style.transition = "background-color 0s";
                  e.currentTarget.style.background = "#181818";
                }
              }}
            >
              <img
                src="/assets/power-collateral.png"
                alt="Multi-Collateral"
                style={{
                  width: 50,
                  height: "auto",
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)"
                }}
              />
            </div>
          </div>
          {/* Details Section */}
          <div className="flex flex-col items-center mt-10 w-full">
            <div
              className={`relative w-[213px] h-[213px] mb-[100px] transition-all
                ${descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: descVisible ? "700ms" : "700ms",
                transitionDelay: descVisible ? "0ms" : "0ms",
              }}
            >
              {/* Polygon overlay, centered with hero image */}
              <div
                className="absolute"
                style={{
                  width: 213,
                  height: 213,
                  left: "-12%",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              >
                <img
                  src={polygonImages[selectedPower]}
                  alt="Polygon"
                  className="animate-float-polygon"
                  style={{
                    width: 213,
                    height: 213,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: "none",
                    opacity: 0.95,
                    filter: "blur(2px)",
                  }}
                />
              </div>
              {/* Hero image/icon */}
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: 213,
                  height: 213,
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              >
                <img
                  src={superPowers.find(p => p.key === selectedPower).img}
                  alt={superPowers.find(p => p.key === selectedPower).label}
                  className={
                    (descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8") +
                    " animate-float"
                  }
                  style={{
                    width: 213,
                    height: 213,
                    objectFit: "contain",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "700ms",
                    transitionDelay: descVisible ? "0ms" : "0ms",
                  }}
                />
              </div>
            </div>
            <h3
              className={`text-center transition-all
                ${descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                fontFamily: "delight-bold",
                fontSize: 35,
                fontWeight: "normal",
                transitionProperty: "opacity, transform",
                transitionDuration: "700ms",
                transitionDelay: descVisible ? "120ms" : "0ms",
                marginBottom: 8
              }}
            >
              {superPowers.find(p => p.key === selectedPower).label}
            </h3>
            <p
              className={`text-center text-base mb-6 w-full transition-all
                ${descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                md:leading-[43px] leading-[30px]`}
              style={{
                marginTop: 20,
                maxWidth: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                transitionProperty: "opacity, transform",
                transitionDuration: "700ms",
                transitionDelay: descVisible ? "240ms" : "0ms",
              }}
            >
              {superPowers.find(p => p.key === selectedPower).desc}
            </p>
            <a
              href={`https://docs.usd8.finance/${selectedPower.replace('-', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-[#73EFF1] hover:bg-[#00CC99] text-black font-semibold px-6 py-3 rounded transition-all
                ${descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "700ms",
                transitionDelay: descVisible ? "360ms" : "0ms",
                marginTop: 30,
                display: "inline-block"
              }}
            >
              Learn More
            </a>
          </div>
        </div>
        {/* --- End Super Powers Section --- */}

        <div ref={formRef} className="w-full max-w-md text-center mt-[50px] ">
          <h2
            className="text-center"
            style={{ 
              fontFamily: "delight-bold", 
              marginTop: 80, 
              fontSize: 50,
              marginBottom: 32 
            }}
          >
            Waiting List
          </h2>
          {/* Add gap below the title to match the gap between "Explore Superpowers" and the navigation grid */}
          <div style={{ marginTop: 100 }} />
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
            <button
              disabled={loading}
              className="bg-[#73EFF1] hover:bg-[#00CC99] text-black font-semibold md:px-6 md:py-4 px-8 py-5 rounded"
              style={{ marginTop: 50 }}
              onClick={handleJoinInClick}
            >
              {loading ? (
                "Hold on ..."
              ) : (
                "join"
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

        <footer className=" bottom-4 flex text-gray-400 mb-[100px] mt-[250px]">
          <a href="https://x.com/usd8_official" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            X
          </a>
          <span className="w-[100px] h-auto"></span>
          <a href="https://docs.usd8.finance" className="hover:text-white">Docs</a>
        </footer>
      </div>
    </div>
  );
}
