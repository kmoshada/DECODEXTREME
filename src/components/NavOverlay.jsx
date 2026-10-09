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
      className="fixed inset-0 bg-[#040608]/95 backdrop-blur-2xl z-40 translate-x-full h-screen w-full flex flex-col justify-center px-8 md:px-24"
    >
      <div className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest mb-8">
        // SYSTEM NAVIGATION MATRIX
      </div>

      <div ref={linksRef} className="space-y-4">
        {navItems.map((item) => (
          <div
            key={item.num}
            onClick={() => handleNavClick(item.target)}
            className="group flex items-baseline gap-4 cursor-pointer text-white hover:text-[var(--color-primary)] transition-colors py-1"
          >
            <span className="font-mono text-sm text-[var(--color-primary)] opacity-60">
              {item.num}
            </span>
            <span className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              {item.label}
            </span>
          </div>
        ))}

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={() => { onClose(); onOpenRegister(); }}
            className="px-8 py-3.5 bg-[var(--color-primary)] text-black rounded-full font-display font-bold uppercase tracking-wider text-xs flex items-center gap-2"
          >
            Register for DecodeXtreme <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavOverlay;
