import React, { useState, useRef, useLayoutEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import NavOverlay from './NavOverlay';
import logo from '../assets/DecodeXtreme Logo.webp';
import fallbackLogo from '../assets/logo.png';
import SoundAmbiance from './SoundAmbiance';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ onOpenRegister, theme, toggleTheme, isMuted, setIsMuted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const showAnim = gsap.from(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.25,
        ease: 'power2.out'
      }).progress(1);

      ScrollTrigger.create({
        start: 'top -80',
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === -1) {
            showAnim.play();
          } else {
            showAnim.reverse();
          }
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <NavOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenRegister={onOpenRegister}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#040608]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Logo with Animus Glow */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            aria-label="DecodeXtreme 2026 Homepage"
          >
            <img
              src={logo}
              onError={(e) => { e.currentTarget.src = fallbackLogo; }}
              alt="DecodeXtreme 2026"
              className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-primary)] opacity-80 border-l border-white/20 pl-3">
              ANIMUS 20.0
            </span>
          </a>

          {/* Desktop Center Navigation (CodeSprint Style with Glowing Dots) */}
          <div className="hidden lg:flex items-center gap-1 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <button
              onClick={() => scrollTo('about')}
              className="px-3.5 py-1 text-xs font-mono tracking-wider uppercase text-gray-300 hover:text-[var(--color-primary)] transition-colors"
            >
              The Creed
            </button>
            <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]/50" />

            <button
              onClick={() => scrollTo('timeline')}
              className="px-3.5 py-1 text-xs font-mono tracking-wider uppercase text-gray-300 hover:text-[var(--color-primary)] transition-colors"
            >
              Timeline
            </button>
            <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]/50" />

            <button
              onClick={() => scrollTo('program')}
              className="px-3.5 py-1 text-xs font-mono tracking-wider uppercase text-gray-300 hover:text-[var(--color-primary)] transition-colors"
            >
              Program
            </button>
            <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]/50" />

            <button
              onClick={() => scrollTo('guide')}
              className="px-3.5 py-1 text-xs font-mono tracking-wider uppercase text-gray-300 hover:text-[var(--color-primary)] transition-colors"
            >
              Delegate Guide
            </button>
            <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]/50" />

            <button
              onClick={() => scrollTo('operatives')}
              className="px-3.5 py-1 text-xs font-mono tracking-wider uppercase text-gray-300 hover:text-[var(--color-primary)] transition-colors"
            >
              Our Team
            </button>
          </div>

          {/* Desktop Right Actions: Sound, Theme, Register Button */}
          <div className="hidden md:flex items-center gap-3">
            <SoundAmbiance isMuted={isMuted} setIsMuted={setIsMuted} />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Toggle Light/Dark Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} className="text-yellow-400" />}
            </button>

            <button
              onClick={onOpenRegister}
              className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#1bc2c5] shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] transition-all hover:scale-105"
            >
              Register Now
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-black font-display font-bold text-[11px] uppercase tracking-wider"
            >
              Register
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-[var(--color-primary)] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
