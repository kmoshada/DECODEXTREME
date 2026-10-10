import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TimelineSection from './components/TimelineSection';
import PrizesSection from './components/PrizesSection';
import GuidelinesSection from './components/GuidelinesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import Preloader from './components/Preloader';
import RegistrationModal from './components/RegistrationModal';
import AnimusGlobalBackground from './components/AnimusGlobalBackground';

import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Newsletter from './pages/Newsletter';
import Pages from './pages/Pages';

// Background audio stored in the public directory.
// Correct URL: do not include "public" in the path.
const BACKGROUND_AUDIO_SRC = '/audio/The_Measured_Thought.mp3';
const BACKGROUND_AUDIO_VOLUME = 0.22;

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isLoading, onOpenRegister }) => (
  <>
    <Hero
      loading={isLoading}
      onOpenRegister={() => onOpenRegister('individual')}
    />

    <AboutSection />

    {/* <TimelineSection
      onOpenRegister={() => onOpenRegister('individual')}
    /> */}

    <ServicesSection
      onOpenRegister={() => onOpenRegister('individual')}
    />

    <PrizesSection />
    <GuidelinesSection />
    <ContactSection />

    <Footer
      onOpenRegister={() => onOpenRegister('individual')}
    />
  </>
);

const App = () => {
  const audioRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regType, setRegType] = useState('individual');

  // Enforce light theme globally. No theme toggle is provided.
  useLayoutEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }, []);

  // Refresh ScrollTrigger measurements after the preloader disappears.
  useLayoutEffect(() => {
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  // Attempt audible playback immediately. Browsers that block autoplay will
  // retry from the first visitor interaction without changing the default UI.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = BACKGROUND_AUDIO_VOLUME;

    const startAudio = async () => {
      try {
        audio.muted = false;
        await audio.play();
        removeInteractionListeners();
      } catch {
        // Autoplay may remain blocked until a later interaction.
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', startAudio);
      window.removeEventListener('keydown', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('scroll', startAudio);
    };

    startAudio();

    window.addEventListener('pointerdown', startAudio, { passive: true });
    window.addEventListener('keydown', startAudio);
    window.addEventListener('touchstart', startAudio, { passive: true });
    window.addEventListener('scroll', startAudio, { passive: true });

    return removeInteractionListeners;
  }, []);

  const openRegister = (type = 'individual') => {
    setRegType(type);
    setIsRegisterOpen(true);
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    });
  };

  // Handles both boolean values and functional state updates from Navbar.
  const handleSetMuted = async (nextValue) => {
    const nextMuted =
      typeof nextValue === 'function'
        ? nextValue(isMuted)
        : nextValue;

    const audio = audioRef.current;

    // Stop playback when the visitor mutes the audio.
    if (nextMuted) {
      if (audio) {
        audio.pause();
        audio.muted = true;
      }
      setIsMuted(true);
      return;
    }

    if (!audio) {
      setIsMuted(true);
      return;
    }

    try {
      // Keep background audio subtle.
      audio.volume = BACKGROUND_AUDIO_VOLUME;
      audio.muted = false;

      // Playback is initiated by the visitor's sound-control interaction.
      await audio.play();

      setIsMuted(false);
    } catch (error) {
      // Playback can fail if the codec is unsupported or the browser
      // blocks playback. Keep the requested unmuted state for the next
      // user interaction, which can satisfy the browser's autoplay policy.
      console.warn('Background audio could not be played:', error);
    }
  };

  const handleAudioError = () => {
    setIsMuted(true);
    console.error(
      'Unable to load background audio:',
      BACKGROUND_AUDIO_SRC
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-primary)] selection:text-[#05090d]">
      {/* Background ambience */}
      <audio
        ref={audioRef}
        src={BACKGROUND_AUDIO_SRC}
        loop
        autoPlay
        preload="metadata"
        onError={handleAudioError}
        aria-label="Ambient background audio"
      />

      {/* Initial loading screen */}
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* <AnimusGlobalBackground /> */}

      {/* Navigation: light theme, no theme toggle */}
      <Navbar
        onOpenRegister={() => openRegister('individual')}
        isMuted={isMuted}
        setIsMuted={handleSetMuted}
        audioAvailable={Boolean(BACKGROUND_AUDIO_SRC)}
        showThemeToggle={false}
      />

      {/* Application routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoading={isLoading}
              onOpenRegister={openRegister}
            />
          }
        />

        <Route
          path="/portfolio"
          element={
            <Portfolio
              onOpenRegister={() => openRegister('individual')}
            />
          }
        />

        <Route
          path="/services"
          element={
            <Services
              onOpenRegister={() => openRegister('individual')}
            />
          }
        />

        <Route
          path="/newsletter"
          element={
            <Newsletter
              onOpenRegister={() => openRegister('individual')}
            />
          }
        />

        <Route
          path="/pages"
          element={
            <Pages
              onOpenRegister={() => openRegister('individual')}
            />
          }
        />
      </Routes>

      {/* Registration modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        defaultType={regType}
      />

      {/* Scroll position indicator */}
      <ScrollIndicator />
    </div>
  );
};

export default App;