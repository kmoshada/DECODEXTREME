import { useEffect, useRef, useState } from 'react';
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
  'SEQ 07 // ARCHIVE COMPLETE',
];

const AnimusGlobalBackground = () => {
  const battlefieldRef = useRef(null);
  const eagleVisionRef = useRef(null);
  const crestRef = useRef(null);
  const [syncProgress, setSyncProgress] = useState(0);
  const [activeSeq, setActiveSeq] = useState(0);

  useEffect(() => {
    const context = gsap.context(() => {
      const updateTelemetry = (progress) => {
        setSyncProgress(Math.round(progress * 100));
        setActiveSeq(
          Math.min(
            SEQUENCE_NAMES.length - 1,
            Math.floor(progress * SEQUENCE_NAMES.length),
          ),
        );
      };

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: ({ progress }) => updateTelemetry(progress),
      });

      gsap.to(battlefieldRef.current, {
        yPercent: 14,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '45% top',
          scrub: true,
        },
      });

      gsap.fromTo(
        battlefieldRef.current,
        { opacity: 0.34 },
        {
          opacity: 0.72,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: '20% top',
            scrub: true,
          },
        },
      );

      gsap.to(battlefieldRef.current, {
        opacity: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: '28% top',
          end: '56% top',
          scrub: true,
        },
      });

      gsap.fromTo(
        eagleVisionRef.current,
        { opacity: 0, scale: 1.08, yPercent: -8 },
        {
          opacity: 0.52,
          scale: 1,
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: '28% top',
            end: '62% top',
            scrub: true,
          },
        },
      );

      gsap.to(eagleVisionRef.current, {
        opacity: 0.16,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: '68% top',
          end: '92% top',
          scrub: true,
        },
      });

      gsap.to(crestRef.current, {
        rotation: 210,
        scale: 0.82,
        xPercent: 15,
        yPercent: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      <div
        ref={battlefieldRef}
        className="absolute inset-0 overflow-hidden opacity-35"
      >
        <img
          src={battlefieldBg}
          alt=""
          className="h-full w-full scale-105 object-cover contrast-110 brightness-105 saturate-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/85 via-[var(--color-bg)]/35 to-[var(--color-bg)]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/55 via-transparent to-[var(--color-bg)]/55" />
      </div>

      <div
        ref={eagleVisionRef}
        className="absolute inset-0 overflow-hidden opacity-0"
      >
        <img
          src={eagleVisionBg}
          alt=""
          className="h-full w-full scale-105 object-cover contrast-110 brightness-105 saturate-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/88 via-[var(--color-bg)]/30 to-[var(--color-bg)]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/55 via-transparent to-[var(--color-bg)]/55" />
      </div>

      <div className="absolute inset-0 bg-cyber-grid opacity-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,242,254,0.025),transparent)] bg-[length:100%_8px] opacity-25" />

      <div
        ref={crestRef}
        className="absolute left-1/2 top-1/4 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 text-[var(--color-primary)] opacity-15 sm:h-[520px] sm:w-[520px] md:h-[720px] md:w-[720px]"
      >
        <svg
          viewBox="0 0 200 240"
          className="h-full w-full fill-none stroke-current stroke-[0.8] drop-shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.45)]"
        >
          <path d="M100,10 L165,135 L135,145 L100,75 L65,145 L35,135 Z" />
          <path d="M100,55 L135,130 L115,138 L100,105 L85,138 L65,130 Z" strokeDasharray="4,2" />
          <path d="M100,140 L125,200 L100,225 L75,200 Z" />
          <circle cx="100" cy="115" r="75" strokeDasharray="3,4" />
          <circle cx="100" cy="115" r="95" />
          <circle cx="100" cy="115" r="45" strokeDasharray="1,5" />
          <line x1="10" y1="115" x2="190" y2="115" />
          <line x1="100" y1="5" x2="100" y2="235" />
        </svg>
      </div>

      <div className="fixed bottom-4 left-4 z-[60] hidden items-center gap-3 rounded-full border border-slate-900/10 bg-white/75 px-3.5 py-2 font-mono text-[10px] tracking-widest text-slate-600 backdrop-blur-md lg:flex">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)]" />
        <span className="font-bold text-slate-800">{SEQUENCE_NAMES[activeSeq]}</span>
        <span className="text-slate-300">|</span>
        <span className="text-[var(--color-secondary)]">SYNC: {syncProgress}%</span>
      </div>
    </div>
  );
};

export default AnimusGlobalBackground;
