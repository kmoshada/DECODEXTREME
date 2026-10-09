import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import battlefieldBg from '../assets/animus-battlefield-bg.jpg';
import eagleVisionBg from '../assets/animus-eaglevision-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const SEQUENCE_NAMES = [
  'SEQ 01 // BATTLEFIELD INITIATION',
  'SEQ 02 // THE BROTHERHOOD CREED',
  'SEQ 03 // EAGLE VISION TIMELINE',
  'SEQ 04 // CHOOSE YOUR PATH',
  'SEQ 05 // CHAMPION RECOGNITION',
  'SEQ 06 // DELEGATE CODEX',
  'SEQ 07 // ARCHIVE & SYNCHRONIZATION COMPLETE',
];

const AnimusGlobalBackground = () => {
  const canvasRef = useRef(null);
  const crestRef = useRef(null);
  const battlefieldRef = useRef(null);
  const eagleVisionRef = useRef(null);
  const aura1Ref = useRef(null);
  const aura2Ref = useRef(null);

  const [syncProgress, setSyncProgress] = useState(0);
  const [activeSeq, setActiveSeq] = useState(0);

  // 1. Canvas Dynamic Battlefield Embers, Smoke & Cyber Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool: Embers, Sparks, Smoke motes, Cyber fragments
    const particleCount = 85;
    const particles = [];

    // Ember & Animus color palette matching the reference image
    const emberColors = [
      '#ff4500', // Fiery Orange-Red
      '#ff8c00', // Dark Orange
      '#ffa500', // Bright Amber
      '#ffcc00', // Golden Spark
      '#00f2fe', // Animus Cyan
      '#ffffff', // White Flash
    ];

    for (let i = 0; i < particleCount; i++) {
      const isEmber = Math.random() > 0.3;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isEmber ? Math.random() * 2.5 + 1 : Math.random() * 1.5 + 0.8,
        speedY: -(Math.random() * 0.7 + 0.3),
        speedX: (Math.random() - 0.5) * 0.6,
        baseOpacity: Math.random() * 0.6 + 0.3,
        opacity: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        color: isEmber
          ? emberColors[Math.floor(Math.random() * (emberColors.length - 1))]
          : '#00f2fe',
        isEmber,
        isFragment: Math.random() > 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    // Drifting Volumetric Smoke Clouds
    const smokePuffs = [];
    for (let s = 0; s < 5; s++) {
      smokePuffs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 250 + 200,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(Math.random() * 0.1 + 0.05),
        opacity: Math.random() * 0.05 + 0.02,
      });
    }

    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = (currentScrollY - lastScrollY) * 0.2;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Scroll speed decay
      scrollSpeed *= 0.92;

      // Draw Volumetric Smoke Clouds
      for (let s = 0; s < smokePuffs.length; s++) {
        const puff = smokePuffs[s];
        puff.x += puff.speedX;
        puff.y += puff.speedY - scrollSpeed * 0.1;

        if (puff.y < -puff.radius) puff.y = height + puff.radius;
        if (puff.y > height + puff.radius) puff.y = -puff.radius;
        if (puff.x < -puff.radius) puff.x = width + puff.radius;
        if (puff.x > width + puff.radius) puff.x = -puff.radius;

        const smokeGrad = ctx.createRadialGradient(
          puff.x,
          puff.y,
          0,
          puff.x,
          puff.y,
          puff.radius
        );
        smokeGrad.addColorStop(0, `rgba(200, 215, 230, ${puff.opacity})`);
        smokeGrad.addColorStop(0.6, `rgba(160, 180, 200, ${puff.opacity * 0.5})`);
        smokeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Glowing Fire Embers & Animus Fragments
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulsePhase += p.pulseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.25;

        // Turbulence and scroll velocity
        const turbulence = Math.sin(time + p.x * 0.01) * 0.35;
        p.y += p.speedY - scrollSpeed * 0.45;
        p.x += p.speedX + turbulence;
        p.rotation += p.rotSpeed;

        // Mouse avoidance/repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Screen boundary wrap
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isEmber) {
          // Fire Ember with soft burning glow
          const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.8);
          glowGrad.addColorStop(0, p.color);
          glowGrad.addColorStop(0.5, p.color);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Core hot spark
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.isFragment) {
          // Triangular Animus Chevron
          ctx.fillStyle = `rgba(0, 242, 254, ${p.opacity})`;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(p.size, p.size);
          ctx.lineTo(0, p.size * 0.5);
          ctx.lineTo(-p.size, p.size);
          ctx.closePath();
          ctx.fill();
        } else {
          // Standard cyan memory dot
          ctx.fillStyle = `rgba(0, 242, 254, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. GSAP ScrollTrigger for Parallax Battlefield & Eagle Vision Crossfades
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Full document scroll monitor
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setSyncProgress(Math.round(progress * 100));

          const seqIndex = Math.min(
            SEQUENCE_NAMES.length - 1,
            Math.floor(progress * SEQUENCE_NAMES.length)
          );
          setActiveSeq(seqIndex);

          // Atmospheric light modulation
          if (aura1Ref.current && aura2Ref.current) {
            if (progress < 0.25) {
              // Phase 1: Battlefield Cold Smoke & Cyan Animus Grid
              gsap.to(aura1Ref.current, { backgroundColor: 'rgba(0, 242, 254, 0.12)', duration: 0.6 });
              gsap.to(aura2Ref.current, { backgroundColor: 'rgba(255, 69, 0, 0.08)', duration: 0.6 });
            } else if (progress < 0.55) {
              // Phase 2: Eagle Vision Golden Sunset & Sunbeams
              gsap.to(aura1Ref.current, { backgroundColor: 'rgba(245, 158, 11, 0.16)', duration: 0.6 });
              gsap.to(aura2Ref.current, { backgroundColor: 'rgba(217, 119, 6, 0.12)', duration: 0.6 });
            } else if (progress < 0.8) {
              // Phase 3: Animus Cyber Turquoise & Champion Gold
              gsap.to(aura1Ref.current, { backgroundColor: 'rgba(234, 179, 8, 0.15)', duration: 0.6 });
              gsap.to(aura2Ref.current, { backgroundColor: 'rgba(0, 242, 254, 0.09)', duration: 0.6 });
            } else {
              // Phase 4: Stealth Obsidian & Crimson Embers
              gsap.to(aura1Ref.current, { backgroundColor: 'rgba(255, 51, 75, 0.14)', duration: 0.6 });
              gsap.to(aura2Ref.current, { backgroundColor: 'rgba(0, 242, 254, 0.06)', duration: 0.6 });
            }
          }
        },
      });

      // Layer 1: Parallax Battlefield Fog Artwork (Clear & Vivid)
      if (battlefieldRef.current) {
        gsap.to(battlefieldRef.current, {
          yPercent: 18,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '45% top',
            scrub: true,
          },
        });

        // Visible right from the start at 0.45, rises to 0.85 in The Creed for stunning clarity
        gsap.fromTo(
          battlefieldRef.current,
          { opacity: 0.45 },
          {
            opacity: 0.85,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: '22% top',
              scrub: true,
            },
          }
        );

        // Crossfades into Eagle Vision as user approaches Timeline
        gsap.to(battlefieldRef.current, {
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: '30% top',
            end: '55% top',
            scrub: true,
          },
        });
      }

      // Layer 2: Eagle Vision Sunset Horizon Artwork (Vivid & Clear during Timeline & Program)
      if (eagleVisionRef.current) {
        gsap.fromTo(
          eagleVisionRef.current,
          { opacity: 0, scale: 1.08, yPercent: -8 },
          {
            opacity: 0.80,
            scale: 1.0,
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: '30% top',
              end: '65% top',
              scrub: true,
            },
          }
        );

        // Settles down gracefully for later sections
        gsap.to(eagleVisionRef.current, {
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: '70% top',
            end: '92% top',
            scrub: true,
          },
        });
      }

      // Layer 3: Rotating Assassin Insignia Crest (Prominent & Clear)
      if (crestRef.current) {
        gsap.to(crestRef.current, {
          rotation: 210,
          scale: 0.85,
          xPercent: 15,
          yPercent: 130,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Cinematic Battlefield Smoke Background Artwork (Clear, Vivid, High-Def) */}
      <div
        ref={battlefieldRef}
        className="absolute inset-0 w-full h-full opacity-45 transition-opacity duration-700 overflow-hidden"
      >
        <img
          src={battlefieldBg}
          alt="Assassin's Creed Battlefield Smoke"
          className="w-full h-full object-cover filter contrast-115 brightness-95 saturate-110 scale-105"
        />
        {/* Soft feathering instead of heavy black blockage */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-[var(--color-bg)]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/40 via-transparent to-[var(--color-bg)]/40 pointer-events-none" />
      </div>

      {/* 2. Eagle Vision Sunset Viewpoint (Clear, Warm Golden Light) */}
      <div
        ref={eagleVisionRef}
        className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-700 overflow-hidden"
      >
        <img
          src={eagleVisionBg}
          alt="Assassin's Creed Eagle Vision Horizon"
          className="w-full h-full object-cover filter contrast-115 brightness-95 saturate-115 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-[var(--color-bg)]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/40 via-transparent to-[var(--color-bg)]/40 pointer-events-none" />
      </div>

      {/* 3. Dynamic Ambient Color Lighting Auras */}
      <div
        ref={aura1Ref}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] md:w-[1300px] h-[600px] md:h-[800px] rounded-full blur-[140px] md:blur-[180px] transition-colors duration-1000 bg-[rgba(0,242,254,0.14)]"
      />
      <div
        ref={aura2Ref}
        className="absolute bottom-1/4 right-0 w-[600px] md:w-[900px] h-[500px] md:h-[700px] rounded-full blur-[150px] md:blur-[200px] transition-colors duration-1000 bg-[rgba(255,69,0,0.10)]"
      />

      {/* 4. Global Cyber Perspective Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />

      {/* 5. Horizontal Animus Scanning Horizon Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,242,254,0.02)_50%,transparent_100%)] bg-[length:100%_8px] opacity-30 pointer-events-none" />

      {/* 6. Dynamic 60fps Battlefield Embers & Smoke Particle Engine (Canvas) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 7. Rotating Assassin's Creed Insignia Crest (Sharp, Glowing & Clear) */}
      <div
        ref={crestRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[580px] md:w-[720px] h-[420px] sm:h-[580px] md:h-[720px] opacity-25 text-[var(--color-primary)] transition-opacity duration-700 pointer-events-none"
      >
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full stroke-current fill-none stroke-[0.8] filter drop-shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.6)]"
        >
          <path
            d="M100,10 L165,135 L135,145 L100,75 L65,145 L35,135 Z"
            strokeWidth="0.8"
          />
          <path
            d="M100,55 L135,130 L115,138 L100,105 L85,138 L65,130 Z"
            strokeWidth="0.6"
            strokeDasharray="4,2"
          />
          <path
            d="M100,140 L125,200 L100,225 L75,200 Z"
            strokeWidth="0.7"
          />
          <circle cx="100" cy="115" r="75" strokeWidth="0.3" strokeDasharray="3,4" />
          <circle cx="100" cy="115" r="95" strokeWidth="0.25" />
          <circle cx="100" cy="115" r="45" strokeWidth="0.3" strokeDasharray="1,5" />
          <line x1="10" y1="115" x2="190" y2="115" strokeWidth="0.25" />
          <line x1="100" y1="5" x2="100" y2="235" strokeWidth="0.25" />
          <polygon points="100,5 95,15 105,15" fill="currentColor" />
          <polygon points="190,115 180,110 180,120" fill="currentColor" />
          <polygon points="10,115 20,110 20,120" fill="currentColor" />
          <polygon points="100,235 95,225 105,225" fill="currentColor" />
        </svg>
      </div>

      {/* 8. Live Animus Telemetry Status Widget (Bottom-Left Corner) */}
      <div className="fixed bottom-6 left-6 z-[60] hidden lg:flex items-center gap-3 px-3.5 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest text-gray-400">
        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
        <span className="text-white font-bold">{SEQUENCE_NAMES[activeSeq]}</span>
        <span className="text-white/20">|</span>
        <span className="text-[var(--color-primary)]">SYNC: {syncProgress}%</span>
        <span className="text-white/20">|</span>
        <span className="text-gray-400">LOC: SLTC [6.8402° N, 80.0034° E]</span>
      </div>
    </div>
  );
};

export default AnimusGlobalBackground;
