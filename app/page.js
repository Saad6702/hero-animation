"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// grab the local image so github pages doesn't break the path
import carImg from "@/public/car.png"; 

gsap.registerPlugin(ScrollTrigger);

// --- SVG Components for the feature cards ---

// Rocket icon
const IllustrationRocket = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <circle className="star s1" cx="8"  cy="12" r="1.2" fill="#ff5500" opacity="0.5"/>
    <circle className="star s2" cx="56" cy="18" r="1"   fill="#ff8800" opacity="0.4"/>
    <circle className="star s3" cx="14" cy="48" r="0.9" fill="#ff5500" opacity="0.35"/>
    <circle className="star s4" cx="52" cy="44" r="1.1" fill="#ffaa00" opacity="0.4"/>
    <g className="rocket-body">
      <path d="M32 6 C26 14 24 26 24 34 L40 34 C40 26 38 14 32 6Z" fill="rgba(255,85,0,0.15)" stroke="#ff5500" strokeWidth="1.4"/>
      <path d="M32 6 L29 14 L35 14 Z" fill="rgba(255,85,0,0.3)"/>
      <circle cx="32" cy="24" r="3.5" fill="none" stroke="#ff8800" strokeWidth="1.2"/>
      <circle cx="32" cy="24" r="1.5" fill="rgba(255,136,0,0.4)"/>
      <path d="M24 34 L18 42 L24 40 Z" fill="rgba(255,85,0,0.2)" stroke="#ff5500" strokeWidth="1.2"/>
      <path d="M40 34 L46 42 L40 40 Z" fill="rgba(255,85,0,0.2)" stroke="#ff5500" strokeWidth="1.2"/>
    </g>
    <g className="flame">
      <path d="M28 40 Q30 48 32 52 Q34 48 36 40 Z" fill="rgba(255,85,0,0.7)"/>
      <path className="flame-inner" d="M30 40 Q31 46 32 49 Q33 46 34 40 Z" fill="rgba(255,200,0,0.8)"/>
    </g>
  </svg>
);

// Spinning gem icon
const IllustrationGem = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <circle className="gem-ring" cx="32" cy="34" r="22" stroke="rgba(255,85,0,0.12)" strokeWidth="1" fill="none"/>
    <circle className="gem-ring-2" cx="32" cy="34" r="27" stroke="rgba(255,85,0,0.06)" strokeWidth="1" fill="none"/>
    <g className="gem-rotate">
      <polygon points="32,10 20,26 32,22 44,26" fill="rgba(255,100,0,0.18)" stroke="#ff5500" strokeWidth="1.3"/>
      <polygon points="20,26 32,22 32,52" fill="rgba(255,85,0,0.1)"  stroke="#ff6600" strokeWidth="1.3"/>
      <polygon points="44,26 32,22 32,52" fill="rgba(255,140,0,0.18)" stroke="#ff8800" strokeWidth="1.3"/>
      <polygon points="20,26 32,52 10,36" fill="rgba(255,60,0,0.12)"  stroke="#ff5500" strokeWidth="1.1"/>
      <polygon points="44,26 54,36 32,52" fill="rgba(255,120,0,0.15)" stroke="#ff7700" strokeWidth="1.1"/>
    </g>
    <g className="sparkle">
      <line x1="32" y1="4"  x2="32" y2="9"  stroke="#ff9900" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="32" y1="59" x2="32" y2="64" stroke="#ff9900" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4"  y1="34" x2="9"  y2="34" stroke="#ff9900" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="55" y1="34" x2="60" y2="34" stroke="#ff9900" strokeWidth="1.2" strokeLinecap="round"/>
    </g>
  </svg>
);

// Shield icon with drawing checkmark
const IllustrationShield = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
    <circle className="pulse-ring r1" cx="32" cy="34" r="26" stroke="rgba(255,85,0,0.2)"  strokeWidth="1" fill="none"/>
    <circle className="pulse-ring r2" cx="32" cy="34" r="20" stroke="rgba(255,85,0,0.15)" strokeWidth="1" fill="none"/>
    <path className="shield-body" d="M32 8 L52 16 L52 32 C52 44 42 54 32 58 C22 54 12 44 12 32 L12 16 Z" fill="rgba(255,85,0,0.08)" stroke="#ff5500" strokeWidth="1.5" />
    <path d="M32 14 L46 20 L46 32 C46 41 39 49 32 52 C25 49 18 41 18 32 L18 20 Z" fill="rgba(255,85,0,0.05)" stroke="rgba(255,85,0,0.3)" strokeWidth="0.8" />
    <path className="check-path" d="M22 33 L29 41 L42 26" stroke="#ff6600" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// simple arrow for the buttons
const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Home() {
  // refs for GSAP
  const heroRef       = useRef(null);
  const lettersRef    = useRef([]);
  const statsRef      = useRef([]);
  const carRef        = useRef(null);
  const subtitleRef   = useRef(null);
  const scrollHintRef = useRef(null);
  const section2Ref   = useRef(null);

  const headline = "WELCOME ITZFIZZ";
  const letters  = headline.split(""); // split to animate letter by letter

  // dummy data for the hero stats
  const statsData = [
    { value: "58%", description: "Increase in pick-up point use" },
    { value: "23%", description: "Decreased customer phone calls" },
    { value: "27%", description: "Growth in repeat engagement" },
    { value: "40%", description: "Reduced operational overhead" },
  ];

  const features = [
    {
      Illustration: IllustrationRocket,
      number: "01",
      title: "Lightning Performance",
      body: "Sub-second load times and silky 60 fps interactions across every device — no trade-offs, no compromises.",
    },
    {
      Illustration: IllustrationGem,
      number: "02",
      title: "Precision Design",
      body: "Every spacing decision, every typographic choice, every colour value is deliberate. Aesthetics as a competitive advantage.",
    },
    {
      Illustration: IllustrationShield,
      number: "03",
      title: "Built to Last",
      body: "Enterprise-grade architecture with zero single points of failure. Your product stays live when it matters most.",
    },
  ];

  useEffect(() => {
    // filter out any null refs just in case
    const validLetters = lettersRef.current.filter(Boolean);
    const validStats   = statsRef.current.filter(Boolean);

    // scope everything to heroRef so we don't accidentally animate other pages
    const ctx = gsap.context(() => {

      // intro animations on load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        validLetters,
        { opacity: 0, y: 50, rotateX: -90, transformOrigin: "top center" },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.65, stagger: 0.042 }
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.15"
      );

      // stagger the stats in
      tl.fromTo(
        validStats,
        { opacity: 0, y: 22, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.13, ease: "back.out(1.3)" },
        "-=0.25"
      );

      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "+=0.2"
      );

      // --- scroll triggers ---

      // continuous linear scroll for the car (prevents the pausing bug)
      const carTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      carTl.fromTo(
        carRef.current,
        { x: "-110vw" },
        { x: "150vw", ease: "none" }
      );

      // section 2 animations
      const cards = section2Ref.current?.querySelectorAll(".feature-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.18, ease: "power3.out",
            scrollTrigger: { trigger: section2Ref.current, start: "top 78%" },
          }
        );
      }

      const headerItems = section2Ref.current?.querySelectorAll(".hdr");
      if (headerItems?.length) {
        gsap.fromTo(
          headerItems,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.85, stagger: 0.14, ease: "power3.out",
            scrollTrigger: { trigger: section2Ref.current, start: "top 85%" },
          }
        );
      }

    }, heroRef);

    // cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.45; }
          50%       { transform: translateY(6px); opacity: 1; }
        }
        @keyframes pulseBar {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.55; }
        }

        .feature-card { transition: background 0.3s ease; }
        .feature-card:hover { background: rgba(255,255,255,0.038) !important; }
        .feature-card:hover .c-arrow {
          transform: translateX(5px) !important;
          opacity: 1 !important;
        }
        .c-arrow { transition: transform 0.28s ease, opacity 0.28s ease; }

        /* rocket card animations */
        @keyframes rocketFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes flameFlicker {
          0%, 100% { transform: scaleY(1)   translateY(0);  opacity: 0.8; }
          33%       { transform: scaleY(1.3) translateY(2px); opacity: 1;   }
          66%       { transform: scaleY(0.9) translateY(-1px); opacity: 0.7; }
        }
        @keyframes flameFast {
          0%, 100% { transform: scaleY(1)   scaleX(1);   opacity: 0.7; }
          50%       { transform: scaleY(1.4) scaleX(0.8); opacity: 1;   }
        }
        @keyframes starPulse {
          0%, 100% { opacity: 0.2;  transform: scale(1);   }
          50%       { opacity: 1;   transform: scale(1.6); }
        }
        .feature-card:hover .rocket-body { animation: rocketFloat 1.6s ease-in-out infinite; transform-origin: center bottom; }
        .feature-card:hover .flame       { animation: flameFlicker 0.4s ease-in-out infinite; transform-origin: center top; }
        .feature-card:hover .flame-inner { animation: flameFast 0.25s ease-in-out infinite; transform-origin: center top; }
        .feature-card:hover .s1 { animation: starPulse 1.1s 0s    ease-in-out infinite; }
        .feature-card:hover .s2 { animation: starPulse 1.3s 0.2s  ease-in-out infinite; }
        .feature-card:hover .s3 { animation: starPulse 0.9s 0.35s ease-in-out infinite; }
        .feature-card:hover .s4 { animation: starPulse 1.5s 0.1s  ease-in-out infinite; }

        /* gem card animations */
        @keyframes gemSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes ringExpand {
          0%   { transform: scale(0.9); opacity: 0.3; }
          50%  { transform: scale(1.08); opacity: 0.6; }
          100% { transform: scale(0.9); opacity: 0.3; }
        }
        @keyframes sparkleFlash {
          0%, 100% { opacity: 0;   transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
        .feature-card:hover .gem-rotate  { animation: gemSpin    4s linear infinite; transform-origin: 32px 34px; }
        .feature-card:hover .gem-ring    { animation: ringExpand 1.8s ease-in-out infinite; transform-origin: 32px 34px; }
        .feature-card:hover .gem-ring-2  { animation: ringExpand 1.8s 0.4s ease-in-out infinite; transform-origin: 32px 34px; }
        .feature-card:hover .sparkle     { animation: sparkleFlash 1.2s ease-in-out infinite; transform-origin: 32px 34px; }

        /* shield card animations */
        @keyframes shieldPulse {
          0%   { transform: scale(1);    opacity: 0.2; }
          50%  { transform: scale(1.15); opacity: 0.5; }
          100% { transform: scale(1.3);  opacity: 0;   }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0;  }
        }
        @keyframes shieldGlow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(255,85,0,0)); }
          50%       { filter: drop-shadow(0 0 8px rgba(255,85,0,0.5)); }
        }
        .feature-card:hover .r1 { animation: shieldPulse 1.6s 0s   ease-out infinite; transform-origin: 32px 34px; }
        .feature-card:hover .r2 { animation: shieldPulse 1.6s 0.3s ease-out infinite; transform-origin: 32px 34px; }
        .feature-card:hover .check-path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: checkDraw 0.6s 0.1s ease forwards;
        }
        .feature-card:hover .shield-body { animation: shieldGlow 2s ease-in-out infinite; }

        /* button hover states */
        .btn-primary  { transition: box-shadow 0.3s ease, transform 0.25s ease; }
        .btn-primary:hover  { box-shadow: 0 0 44px rgba(255,85,0,0.5) !important; transform: translateY(-2px); }
        .btn-ghost   { transition: border-color 0.3s ease, color 0.3s ease; }
        .btn-ghost:hover { border-color: rgba(255,85,0,0.45) !important; color: #f0ede8 !important; }
      `}</style>

      <div style={{ background: "#080808", color: "#f0ede8", overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Hero Section */}
        <div
          ref={heroRef}
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "radial-gradient(ellipse 80% 55% at 50% 0%, #1d0900 0%, #080808 65%)",
          }}
        >
          {/* subtle background grid */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.028) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,80,0,0.028) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
          }} />

          {/* main title */}
          <h1
            aria-label={headline}
            style={{
              position: "relative", zIndex: 2,
              display: "flex", flexWrap: "wrap", justifyContent: "center",
              gap: "0 0.025em",
              fontSize: "clamp(2.6rem, 8.5vw, 7.2rem)",
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.22em",
              lineHeight: 1,
              marginBottom: "0.45rem",
              perspective: "700px",
            }}
          >
            {letters.map((char, i) => (
              <span
                key={i}
                ref={(el) => (lettersRef.current[i] = el)}
                style={{
                  display: "inline-block",
                  width: char === " " ? "0.32em" : undefined,
                  background: char !== " "
                    ? "linear-gradient(160deg, #ffffff 15%, #c5c0b8 50%, #ff5500 100%)"
                    : undefined,
                  WebkitBackgroundClip: char !== " " ? "text" : undefined,
                  WebkitTextFillColor: char !== " " ? "transparent" : undefined,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            style={{
              position: "relative", zIndex: 2,
              opacity: 0,
              fontSize: "0.62rem",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "#a09890",
              fontWeight: 500,
              marginBottom: "2.4rem",
            }}
          >
            Premium Web Experiences
          </p>

          {/* little glowing divider */}
          <div style={{
            position: "relative", zIndex: 2,
            width: "1px", height: "28px",
            background: "linear-gradient(180deg, transparent, rgba(255,85,0,0.6), transparent)",
            marginBottom: "2.4rem",
            animation: "pulseBar 2.8s ease-in-out infinite",
          }} />

          {/* hero stats */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: "2.8rem",
            rowGap: "1.6rem",
            padding: "0 1.2rem",
          }}>
            {statsData.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                style={{
                  opacity: 0,
                  textAlign: "center",
                  minWidth: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.28rem",
                }}
              >
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  color: "#ff5500",
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                  textShadow: "0 0 22px rgba(255,85,0,0.32)",
                }}>
                  {stat.value}
                </span>
                <div style={{ width: "16px", height: "1px", background: "rgba(255,85,0,0.38)" }} />
                <p style={{
                  fontSize: "0.56rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#8a8078",
                  lineHeight: 1.5,
                  maxWidth: "110px",
                  fontWeight: 600,
                }}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* scrolling car container */}
          <div
            ref={carRef}
            style={{
              position: "absolute",
              bottom: "12%",
              left: "50%",
              transform: "translateX(-110vw)", // start off-screen to the left
              width: "clamp(280px, 44vw, 560px)",
              zIndex: 3,
              pointerEvents: "none",
              willChange: "transform",
              filter: "drop-shadow(0 14px 30px rgba(255,85,0,0.2))",
            }}
          >
            <Image
              src={carImg} 
              alt="Animated Car"
              width={900}
              height={450}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              priority
            />
          </div>

          {/* fake ground line for the car to drive on */}
          <div style={{
            position: "absolute",
            bottom: "calc(12% - 2px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "52vw",
            height: "1px",
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, transparent, rgba(255,85,0,0.2) 20%, rgba(255,85,0,0.2) 80%, transparent)",
          }} />

          {/* bouncing scroll hint at the bottom */}
          <div
            ref={scrollHintRef}
            style={{
              position: "absolute",
              bottom: "1.4rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              opacity: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span style={{
              fontSize: "0.5rem",
              letterSpacing: "0.38em",
              color: "#3a3228",
              textTransform: "uppercase",
            }}>
              Scroll
            </span>
            <svg
              width="12" height="12" viewBox="0 0 16 16" fill="none"
              style={{ animation: "scrollBounce 1.9s ease-in-out infinite" }}
            >
              <path d="M2 5l6 6 6-6" stroke="#ff5500" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

        </div>

        {/* Features Section */}
        <section
          ref={section2Ref}
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "8rem 2rem 10rem",
            background:
              "linear-gradient(180deg, #080808 0%, #0e0400 42%, #080808 100%)",
          }}
        >

          <div style={{ textAlign: "center", maxWidth: "600px", marginBottom: "5rem" }}>
            <p className="hdr" style={{
              fontSize: "0.58rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#ff5500",
              marginBottom: "1.4rem",
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.85rem",
            }}>
              <span style={{ width: "26px", height: "1px", background: "rgba(255,85,0,0.5)", display: "inline-block" }} />
              Our Work in Action
              <span style={{ width: "26px", height: "1px", background: "rgba(255,85,0,0.5)", display: "inline-block" }} />
            </p>

            <h2 className="hdr" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
              letterSpacing: "0.1em",
              lineHeight: 1.02,
              color: "#f0ede8",
              marginBottom: "1.8rem",
              opacity: 0,
            }}>
              Built for the Bold
            </h2>

            <p className="hdr" style={{
              fontSize: "0.9rem",
              lineHeight: 1.9,
              color: "#9a9088",
              fontWeight: 400,
              letterSpacing: "0.015em",
              opacity: 0,
            }}>
              We craft digital experiences that leave a lasting impression.
              Every pixel, every motion, every interaction is deliberate —
              because the details are where trust is built.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(268px, 1fr))",
            gap: "1px",
            width: "100%",
            maxWidth: "980px",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "2px",
            overflow: "hidden",
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card"
                style={{
                  opacity: 0,
                  padding: "3rem 2.4rem",
                  background: "rgba(255,255,255,0.018)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.32em",
                  color: "rgba(255,85,0,0.28)",
                  marginBottom: "2rem",
                }}>
                  {f.number}
                </span>

                <div className="c-illus" style={{
                  marginBottom: "1.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}>
                  <f.Illustration />
                </div>

                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.45rem",
                  letterSpacing: "0.09em",
                  color: "#f0ede8",
                  lineHeight: 1.08,
                  marginBottom: "0.85rem",
                }}>
                  {f.title}
                </h3>

                <div style={{
                  width: "20px",
                  height: "1px",
                  background: "rgba(255,85,0,0.3)",
                  marginBottom: "1.2rem",
                }} />

                <p style={{
                  fontSize: "0.84rem",
                  lineHeight: 1.85,
                  color: "#9a9088",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  flexGrow: 1,
                  marginBottom: "2rem",
                }}>
                  {f.body}
                </p>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.6rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(255,85,0,0.5)",
                }}>
                  <span>Learn more</span>
                  <span className="c-arrow" style={{ display: "flex", opacity: 0.38, transform: "translateX(0)" }}>
                    <IconArrow />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* extra stats strip at the bottom of the section */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: "4.5rem",
            rowGap: "2.2rem",
            width: "100%",
            maxWidth: "820px",
            marginTop: "6rem",
            paddingTop: "3.8rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}>
            {[
              { n: "150+", label: "Projects Delivered" },
              { n: "99%",  label: "Client Satisfaction" },
              { n: "8yr",  label: "Industry Experience" },
              { n: "24/7", label: "Support Available"   },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  color: "#f0ede8",
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}>
                  {m.n}
                </div>
                <p style={{
                  fontSize: "0.56rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#7a7268",
                  fontWeight: 600,
                }}>
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "4.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <button className="btn-primary" style={{
              padding: "0.9rem 2.5rem",
              background: "linear-gradient(90deg, #ff5500, #ff7800)",
              border: "none",
              borderRadius: "2px",
              color: "#080808",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(255,85,0,0.22)",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              See All Projects
            </button>
            <button className="btn-ghost" style={{
              padding: "0.9rem 2rem",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "2px",
              color: "#9a9088",
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Get in Touch
            </button>
          </div>

        </section>

        <footer style={{
          padding: "1.6rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "center",
          fontSize: "0.52rem",
          letterSpacing: "0.28em",
          color: "#5a5048",
          textTransform: "uppercase",
        }}>
          © {new Date().getFullYear()} ItzFizz — All rights reserved
        </footer>

      </div>
    </>
  );
}