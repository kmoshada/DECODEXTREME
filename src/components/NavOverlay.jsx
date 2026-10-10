import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const NavOverlay = ({ isOpen, onClose, onOpenRegister }) => {
  const overlayRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { x: "0%", duration: 0.6, ease: "power3.out" });
      gsap.fromTo(
        linksRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(overlayRef.current, { x: "100%", duration: 0.6, ease: "power3.inOut" });
    }
  }, [isOpen]);

  const navItems = [
    { num: '01', label: 'The Creed (About)', target: 'about' },
    { num: '02', label: 'Mission Timeline', target: 'timeline' },
    { num: '03', label: 'Program & Sessions', target: 'program' },
    { num: '04', label: 'Recognition & Prizes', target: 'prizes' },
    { num: '05', label: 'Delegate Guide', target: 'guide' },
    { num: '06', label: 'Operatives & Team', target: 'operatives' },
  ];

  const handleNavClick = (target) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex h-[100svh] w-full translate-x-full flex-col justify-start overflow-y-auto bg-[#040608]/95 px-5 py-24 text-white backdrop-blur-2xl max-md:bg-[var(--color-bg)]/98 max-md:text-[#081922] sm:px-8 sm:py-28 md:justify-center md:px-24 md:py-10"
    >
      <div className="mb-7 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-primary)] sm:mb-8 sm:text-xs sm:tracking-widest">
        // SYSTEM NAVIGATION MATRIX
      </div>

      <div ref={linksRef} className="space-y-2.5 sm:space-y-4">
        {navItems.map((item) => (
          <div
            key={item.num}
            onClick={() => handleNavClick(item.target)}
            className="group nav-angular-button flex cursor-pointer items-baseline gap-2.5 border-b border-white/10 py-3 text-white transition-colors hover:bg-white/5 hover:text-[var(--color-primary)] max-md:border-slate-900/10 max-md:text-[#081922] max-md:hover:bg-[var(--color-bg-elevated)] sm:gap-4"
          >
            <span className="font-mono text-[10px] text-[var(--color-primary)] opacity-60 sm:text-sm">
              {item.num}
            </span>
            <span className="font-display text-[clamp(1.35rem,7vw,2.25rem)] font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
              {item.label}
            </span>
          </div>
        ))}

        <div className="flex flex-col items-start gap-4 pt-7 sm:flex-row sm:items-center sm:pt-8">
          <button
            onClick={() => { onClose(); onOpenRegister(); }}
            className="nav-angular-button flex items-center gap-2 border border-[var(--color-secondary)] bg-[var(--color-primary)] px-5 py-3 text-[10px] font-display font-bold uppercase tracking-[0.08em] text-[#052126] transition-colors hover:bg-[var(--color-electric-aqua)] sm:px-8 sm:py-3.5 sm:text-xs sm:tracking-wider"
          >
            Register for DecodeXtreme <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavOverlay;
