import React, { useLayoutEffect, useRef } from 'react';
import { MoveRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../assets/hero.png';
import heroVideo from '../assets/Hooded_character_gazing_at_city_20261007122346.mp4';
import sbLogo from '../assets/sb-logo-color.webp';
import csLogo from '../assets/IEEE-CS_LogoTM-orange.webp';
import xtremeLogo from '../assets/IEEEXtreme 20.0 Color Logo (1).webp';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ loading, onOpenRegister }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const telemetryRef = useRef(null);

  useLayoutEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Animation
      gsap.from(".hero-badge-pill", {
        y: -20,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15
      });

      gsap.from(titleRef.current?.children || [], {
        y: 60,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power4.out",
        delay: 0.3
      });

      gsap.from(".hero-date-line", {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.65
      });

      gsap.from(".hero-action-dock", {
        y: 25,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.8
      });

      gsap.from(".hero-metric-chip", {
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.5)",
        delay: 0.95
      });

      // 2. Parallax Depth on Background Video
      gsap.to(".hero-video-wrap", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-4 overflow-hidden bg-transparent"
    >
      {/* Background Cinematic Hooded Character Video (Crystal Clear & Crisp) */}
      <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src={heroVideo}
          poster={heroImage}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-cover opacity-85 md:opacity-90 filter contrast-105 brightness-100 scale-100"
        />
        {/* Soft targeted vignettes: dark center behind text, clear video on sides, gentle bottom feather */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,6,8,0.6)_0%,rgba(4,6,8,0.2)_45%,transparent_75%)]" />
      </div>

      {/* Main Centered Animus Nexus Viewport */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex-grow flex flex-col items-center justify-center text-center py-8">
        
        {/* 1. Animus Status Indicator Badge */}
        <div className="hero-badge-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
          <span className="font-hud text-xs tracking-[0.25em] text-[var(--color-primary)] uppercase font-semibold">
            ANIMUS PROTOCOL 20.0
          </span>
          <span className="text-white/20 font-mono">|</span>
          <span className="text-gray-300 font-mono text-[11px] tracking-wider">
            SRI LANKA
          </span>
        </div>

        {/* 2. Monumental Dual-Typography Title (Zero Text Bloat) */}
        <div ref={titleRef} className="mb-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black leading-[0.92] tracking-tight uppercase">
            <div className="overflow-hidden">
              <span className="section-heading-outline block tracking-tighter">
                DECODEXTREME
              </span>
            </div>
            <div className="overflow-hidden mt-1 md:mt-2">
              <span className="section-heading-italic block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white">
                The Animus Initiation
              </span>
            </div>
          </h1>
        </div>

        {/* 3. Razor-Sharp Single-Line Subtitle */}
        <div className="hero-date-line mb-8">
          <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-gray-300 flex items-center justify-center gap-2 flex-wrap">
            <span>OCTOBER 12 – 24, 2026</span>
            <span className="text-[var(--color-primary)]">·</span>
            <span>ONLINE COMPETITIVE PROGRAMMING BOOTCAMP</span>
            <span className="text-[var(--color-primary)]">·</span>
            <span className="text-[var(--color-primary)] font-bold">IEEEXTREME 20.0</span>
          </p>
        </div>

        {/* 4. Interactive Call-To-Action Gateway */}
        <div className="hero-action-dock flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
          <button
            onClick={onOpenRegister}
            className="group w-full sm:w-auto px-8 py-4 bg-[var(--color-primary)] text-black rounded-full font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1bc2c5] shadow-[0_0_35px_rgba(var(--color-primary-rgb),0.4)] transition-all hover:scale-105 cursor-pointer"
          >
            <span>Initiate Synchronization</span>
            <span className="p-1 bg-black text-white rounded-full group-hover:bg-white group-hover:text-black transition-colors">
              <MoveRight size={14} />
            </span>
          </button>

          <button
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all hover:border-[var(--color-primary)]/50 cursor-pointer backdrop-blur-md"
          >
            <span>Mission Timeline</span>
            <ArrowDown size={14} className="text-[var(--color-primary)]" />
          </button>
        </div>

        {/* 5. Minimalist 3-Pill Telemetry Cluster (Pure Data, No Bloat) */}
        <div
          ref={telemetryRef}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-3xl"
        >
          <div className="hero-metric-chip flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-xs font-mono text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="font-bold text-white">03</span>
            <span className="text-gray-400">Open Virtual Sessions</span>
          </div>

          <div className="hero-metric-chip flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-xs font-mono text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="font-bold text-white">09-HR</span>
            <span className="text-gray-400">PreXtreme SLTC Challenge</span>
          </div>

          <div className="hero-metric-chip flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-xs font-mono text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="font-bold text-white">LKR 100K+</span>
            <span className="text-gray-400">Prize Pool &amp; Certificates</span>
          </div>
        </div>

      </div>

      {/* 6. Sleek Minimal Organizer Ribbon at Base */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md py-3.5 px-6 mt-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            <span>ORGANIZED BY</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2.5 group">
              <img
                src={sbLogo}
                alt="SLTC IEEE Student Branch"
                className="h-7 md:h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100"
              />
              <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                IEEE SB of SLTC
              </span>
            </div>

            <div className="w-px h-4 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2.5 group">
              <img
                src={csLogo}
                alt="IEEE Computer Society SLTC"
                className="h-6 md:h-7 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100"
              />
              <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                Computer Society
              </span>
            </div>

            <div className="w-px h-4 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2.5 group">
              <img
                src={xtremeLogo}
                alt="IEEEXtreme 20.0"
                className="h-6 md:h-7 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100"
              />
              <span className="text-xs font-mono text-[var(--color-primary)] opacity-80 group-hover:opacity-100 transition-colors">
                IEEEXtreme 20.0
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
