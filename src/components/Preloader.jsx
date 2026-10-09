import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '../assets/DecodeXtreme Logo.webp';
import fallbackLogo from '../assets/logo.png';
import { FastForward } from 'lucide-react';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          setCount(Math.round(counterObj.value));
        }
      });

      tl.to('.preloader-content', {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in'
      });

      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: onComplete
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-[#040608] text-white flex flex-col items-center justify-center p-6 bg-cyber-grid"
    >
      <div className="preloader-content flex flex-col items-center text-center max-w-md w-full">
        {/* Animus Logo Mark */}
        <div className="mb-6 relative">
          <img
            src={logo}
            onError={(e) => { e.currentTarget.src = fallbackLogo; }}
            alt="DecodeXtreme Logo"
            className="h-14 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(0,242,254,0.5)]"
          />
        </div>

        {/* Telemetry status */}
        <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
          <span>ANIMUS SYNCHRONIZATION IN PROGRESS</span>
        </div>

        {/* Big Counter */}
        <div className="font-display font-black text-8xl md:text-9xl tabular-nums tracking-tighter text-white mb-6">
          {count}<span className="text-3xl text-[var(--color-primary)]">%</span>
        </div>

        {/* DNA Sync Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-white transition-all duration-100"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* Skip Intro Button */}
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white hover:border-[var(--color-primary)] transition-all cursor-pointer"
        >
          <span>Skip Intro</span>
          <FastForward size={14} />
        </button>
      </div>

      <div className="absolute bottom-6 font-mono text-[10px] text-gray-600 tracking-widest uppercase">
        IEEE SB OF SLTC · IEEEXTREME 20.0 PREPARATION
      </div>
    </div>
  );
};

export default Preloader;
