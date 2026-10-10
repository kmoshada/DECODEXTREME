import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimusGlobalBackground from './components/AnimusGlobalBackground';
import AboutSection from './components/AboutSection';
import HistorySection from './components/HistorySection';
import ServicesSection from './components/ServicesSection';
import TimelineFullscreenMap from './components/TimelineFullscreenMap';
import PrizesSection from './components/PrizesSection';
import GuidelinesSection from './components/GuidelinesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import Preloader from './components/Preloader';
import RegistrationModal from './components/RegistrationModal';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Newsletter from './pages/Newsletter';
import Pages from './pages/Pages';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isLoading, onOpenRegister }) => {
  return (
    <>
      <Hero loading={isLoading} onOpenRegister={() => onOpenRegister('individual')} />
      <AboutSection />
      <TimelineFullscreenMap onOpenRegister={() => onOpenRegister('individual')} />
      <ServicesSection onOpenRegister={() => onOpenRegister('individual')} />
      <PrizesSection />
      <GuidelinesSection />
      <ContactSection />
      <Footer onOpenRegister={() => onOpenRegister('individual')} />
    </>
  );
};

const App = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [isMuted, setIsMuted] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regType, setRegType] = useState('individual');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const openRegister = (type = 'individual') => {
    setRegType(type);
    setIsRegisterOpen(true);
  };

  useLayoutEffect(() => {
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'none'
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const hoverables = document.querySelectorAll('button, a, input, select');
    const handleEnter = () => {
      gsap.to(cursor, {
        scale: 1.8,
        borderColor: 'var(--color-primary)',
        backgroundColor: 'rgba(0, 242, 254, 0.08)',
        duration: 0.2
      });
    };
    const handleLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'transparent',
        duration: 0.2
      });
    };

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [theme, isLoading]);

  return (
    <div className="relative min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-black">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Cyber Reticle Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[300] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[border-color,background-color]"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full pointer-events-none z-[300] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      <AnimusGlobalBackground />

      <Navbar
        onOpenRegister={() => openRegister('individual')}
        theme={theme}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} onOpenRegister={openRegister} />} />
        <Route path="/portfolio" element={<Portfolio onOpenRegister={() => openRegister('individual')} />} />
        <Route path="/services" element={<Services onOpenRegister={() => openRegister('individual')} />} />
        <Route path="/newsletter" element={<Newsletter onOpenRegister={() => openRegister('individual')} />} />
        <Route path="/pages" element={<Pages onOpenRegister={() => openRegister('individual')} />} />
      </Routes>

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        defaultType={regType}
      />

      <ScrollIndicator />
    </div>
  );
};

export default App;
