import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  ArrowDown,
  Crosshair,
  MoveRight,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import heroImage from '../assets/hero.png';
import sbLogo from '../assets/sb-logo-color.webp';
import csLogo from '../assets/IEEE-CS_LogoTM-orange.webp';
import xtremeLogo from '../assets/IEEEXtreme 20.0 Color Logo (1).webp';

// Replace these two values when the final creative assets arrive.
const HERO_BACKGROUND_VIDEO_SRC =
  '/Hooded_character_gazing_at_city_20261007122346.mp4';
const HERO_CHARACTER_IMAGE_SRC = '';
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&';

gsap.registerPlugin(ScrollTrigger);

const scrambleText = (element, duration = 0.7) => {
  if (!element) return null;

  const finalText = element.textContent;
  const letters = [...finalText];
  const scrambledText = letters
    .map((character) => (
      character === ' '
        ? ' '
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    ))
    .join('');
  let lastRendered = '';

  return gsap.to(element, {
    duration,
    ease: 'power2.out',
    onStart: () => {
      element.textContent = scrambledText;
      lastRendered = scrambledText;
    },
    onUpdate: function updateScramble() {
      const revealed = Math.floor(this.progress() * letters.length);
      const nextText = letters
        .map((character, index) => {
          if (character === ' ') return ' ';
          if (index < revealed || this.progress() === 1) return character;
          return scrambledText[index];
        })
        .join('');
      if (nextText !== lastRendered) {
        element.textContent = nextText;
        lastRendered = nextText;
      }
    },
    onComplete: () => {
      element.textContent = finalText;
    },
  });
};

const Hero = ({ loading, onOpenRegister }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const videoRef = useRef(null);

  // The loading gate guarantees this intro starts only after the preloader's
  // exit transition has completed.
  useLayoutEffect(() => {
    if (loading || !containerRef.current) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) return undefined;

    const context = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out', overwrite: 'auto' },
      });
      const titleLines = titleRef.current?.querySelectorAll(
        '[data-hero-title-line]',
      );
      const scrambleTargets = containerRef.current.querySelectorAll(
        '[data-hero-scramble]',
      );

      const introGroups = [
        '.hero-kicker, .hero-index',
        titleLines || [],
        '.hero-subtitle, .hero-date-line, .hero-action-dock',
        '.hero-stage',
        '.hero-aside',
        '.hero-organizer',
      ];

      gsap.set(
        introGroups.flatMap((group) =>
          typeof group === 'string' ? gsap.utils.toArray(group) : [...group],
        ),
        { autoAlpha: 0 },
      );

      timeline
        .fromTo(
          '.hero-kicker, .hero-index',
          { y: isMobile ? 10 : 14 },
          { y: 0, autoAlpha: 1, duration: isMobile ? 0.35 : 0.45 },
        )
        .fromTo(
          titleLines || [],
          { y: isMobile ? 20 : 28 },
          {
            y: 0,
            autoAlpha: 1,
            duration: isMobile ? 0.5 : 0.65,
            stagger: isMobile ? 0.07 : 0.1,
            ease: 'power3.out',
          },
          '-=0.2',
        )
        .fromTo(
          '.hero-subtitle, .hero-date-line, .hero-action-dock',
          { y: isMobile ? 12 : 16 },
          { y: 0, autoAlpha: 1, duration: isMobile ? 0.35 : 0.45, stagger: isMobile ? 0.06 : 0.08 },
          '-=0.24',
        )
        .add(
          () => {
            scrambleTargets.forEach((target, index) => {
              scrambleText(target, isMobile ? 0.5 + index * 0.08 : 0.65 + index * 0.1);
            });
          },
          '-=0.18',
        )
        .fromTo(
          '.hero-stage',
          { y: isMobile ? 12 : 20, scale: isMobile ? 0.99 : 0.97 },
          { y: 0, scale: 1, autoAlpha: 1, duration: isMobile ? 0.5 : 0.7, ease: 'power2.out' },
          '-=0.38',
        )
        .fromTo(
          '.hero-aside',
          { x: 18 },
          { x: 0, autoAlpha: 1, duration: 0.5 },
          '-=0.48',
        )
        .fromTo(
          '.hero-organizer',
          { y: 14 },
          { y: 0, autoAlpha: 1, duration: 0.4 },
          '-=0.28',
        );

      const scanLine = containerRef.current.querySelector('.hero-scan-line');
      if (scanLine) {
        gsap.fromTo(
          scanLine,
          { xPercent: -100, autoAlpha: 0.15 },
          {
            xPercent: 100,
            autoAlpha: 0.65,
            duration: 3.2,
            ease: 'none',
            repeat: -1,
            repeatDelay: 1.2,
          },
        );
      }

      const orbit = containerRef.current.querySelector('.hero-orbit');
      if (orbit) {
        gsap.to(orbit, {
          rotate: 360,
          duration: 26,
          ease: 'none',
          repeat: -1,
        });
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => context.revert();
  }, [loading]);

  // Start the decorative video only while the hero is visible. Respect reduced
  // motion and data-saving settings; pause off-screen/background playback.
  useEffect(() => {
    if (loading) return undefined;

    const video = videoRef.current;
    const hero = containerRef.current;
    if (!video || !hero) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const prefersDataSaving = Boolean(navigator.connection?.saveData);

    if (prefersReducedMotion || prefersDataSaving) {
      video.pause();
      return undefined;
    }

    let heroIsVisible = false;

    const syncPlayback = () => {
      if (heroIsVisible && document.visibilityState === 'visible') {
        // Autoplay may be blocked by browser/device policy; the poster remains
        // visible as a graceful fallback.
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const onVisibilityChange = () => syncPlayback();
    document.addEventListener('visibilitychange', onVisibilityChange);

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          heroIsVisible = entry.isIntersecting;
          syncPlayback();
        },
        { threshold: 0.12 },
      );
      observer.observe(hero);
    } else {
      heroIsVisible = true;
      syncPlayback();
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
    };
  }, [loading]);

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className="relative isolate flex h-auto min-h-0 w-full flex-col overflow-hidden bg-[var(--color-bg)] pt-24 sm:pt-28 lg:h-[100svh] lg:min-h-[100svh]"
    >
      {/* Subtle cinematic video. The poster is shown when motion/data saving is preferred. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src={HERO_BACKGROUND_VIDEO_SRC}
          poster={heroImage}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          className="h-full w-full scale-[1.04] object-cover object-[center_35%] opacity-[0.12] saturate-[0.55] sm:opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_0%,rgba(244,250,251,0.72)_28%,rgba(244,250,251,0.5)_55%,var(--color-bg)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-bg)_0%,transparent_35%,var(--color-bg)_94%)]" />
        <div className="bg-cyber-grid absolute inset-0 opacity-30" />
      </div>

      <div className="content-rail hero-content relative z-10 grid min-h-0 flex-1 grid-cols-1 items-center gap-4 pb-10 pt-12 max-lg:min-h-[calc(100svh+3rem)] max-lg:items-start max-lg:pb-10 max-lg:pt-20 sm:max-lg:min-h-[calc(100svh+2rem)] sm:max-lg:pb-12 sm:max-lg:pt-24 lg:grid-cols-[minmax(360px,1.05fr)_minmax(0,1.25fr)_minmax(180px,0.65fr)] lg:gap-8 lg:pb-28 lg:pt-20">
        <div className="hero-copy relative z-20 mt-[11rem] flex min-w-0 max-w-xl flex-col items-center text-center sm:max-lg:mt-[14rem] lg:mt-0 lg:items-start lg:text-left lg:pb-8">
          <div ref={titleRef}>
            <h1 id="hero-title" className="max-w-full font-display text-[clamp(3rem,15vw,5rem)] font-bold uppercase leading-[0.84] tracking-[-0.06em] text-[#081922] lg:text-[clamp(3.5rem,7vw,7.2rem)] lg:leading-[0.82] lg:tracking-[-0.08em]">
              <span className="block overflow-hidden py-1" data-hero-title-line>
                DECODE
              </span>
              <span className="block overflow-hidden py-1 text-[var(--color-secondary)]" data-hero-title-line>
                XTREME
              </span>
            </h1>
            <p className="hero-subtitle mt-6 hidden max-w-[20rem] font-display text-[clamp(1rem,1.8vw,1.45rem)] font-semibold uppercase leading-[1.05] tracking-[0.08em] text-[var(--color-primary)] lg:block">
              <span data-hero-scramble>The Animus Initiation</span>
            </p>
          </div>
          <div className="hero-date-line mt-5 max-w-sm border-l-2 border-[var(--color-primary)] pl-4 text-left sm:mt-7">
            <p className="font-mono text-[10px] font-medium uppercase leading-[1.8] tracking-[0.12em] text-slate-600 sm:text-[11px]">
              <span data-hero-scramble>October 12–24, 2026</span><br />
              <span data-hero-scramble>Online · Sri Lanka</span>{' '}
              <span
                className="ml-1 inline-flex translate-y-px items-center"
                title="Sri Lanka"
                aria-label="Sri Lankan flag"
                role="img"
              >
                <svg
                  aria-hidden="true"
                  className="h-3 w-5 border border-slate-900/15"
                  viewBox="0 0 30 20"
                  role="presentation"
                >
                  <rect width="30" height="20" fill="#f6c344" />
                  <rect x="1" y="1" width="28" height="18" fill="#ffb81c" />
                  <rect x="2" y="2" width="5" height="16" fill="#0b7a3e" />
                  <rect x="7" y="2" width="5" height="16" fill="#eb1c2d" />
                  <rect x="12" y="2" width="16" height="16" fill="#8d153a" />
                  <circle cx="20" cy="10" r="3" fill="#f6c344" />
                  <path
                    d="M20 6.8 20.8 9l2.2.2-1.7 1.4.5 2.2-1.8-1.2-1.8 1.2.5-2.2L17 9.2l2.2-.2L20 6.8Z"
                    fill="#8d153a"
                  />
                </svg>
              </span>
            </p>
          </div>
          <div className="hero-action-dock mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
          <button
            type="button"
            onClick={onOpenRegister}
            className="nav-angular-button group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[var(--color-primary)] px-5 py-3 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-[#052126] shadow-[0_8px_24px_rgba(8,126,135,0.18)] transition-colors duration-200 hover:bg-[var(--color-electric-aqua)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-secondary)] active:translate-y-px sm:w-auto"
          >
            <span>Register now</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#052126] text-white transition-colors duration-200 group-hover:bg-white group-hover:text-[#052126]">
              <MoveRight size={14} aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            onClick={scrollToTimeline}
            className="nav-angular-button inline-flex min-h-12 w-full items-center justify-center gap-2.5 border border-slate-900/15 bg-white/70 px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-slate-700 backdrop-blur-sm transition-colors duration-200 hover:border-[var(--color-secondary)]/50 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-secondary)] active:translate-y-px sm:w-auto"
          >
            <span>View timeline</span>
            <ArrowDown size={14} className="text-[var(--color-secondary)]" aria-hidden="true" />
          </button>
          </div>
        </div>

        <div className="hero-stage relative flex min-w-0 min-h-[390px] w-full items-center justify-center max-lg:pointer-events-none max-lg:absolute max-lg:right-[-18%] max-lg:top-8 max-lg:z-0 max-lg:h-[340px] max-lg:min-h-0 max-lg:w-[88%] max-lg:opacity-30 sm:max-lg:top-12 sm:max-lg:h-[400px] sm:max-lg:w-[84%] lg:col-span-2 lg:h-full lg:min-h-0">
          <div className="absolute inset-x-[5%] top-1/2 h-[78%] -translate-y-1/2 border border-[var(--color-secondary)]/20 bg-white/20 shadow-[0_24px_80px_rgba(8,25,34,0.08)] backdrop-blur-[2px]" />
          <div className="absolute left-[8%] top-[18%] hidden font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 lg:block">
            Target / 20.0
          </div>
          <div className="absolute right-[6%] top-[30%] hidden h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_0_5px_rgba(8,126,135,0.12)] lg:block" />
          {HERO_CHARACTER_IMAGE_SRC ? (
            <img
              src={HERO_CHARACTER_IMAGE_SRC}
              alt="DecodeXtreme assassin character"
              className="relative z-10 max-h-[94%] w-auto object-contain drop-shadow-[0_22px_25px_rgba(8,25,34,0.25)]"
            />
          ) : (
            <div className="relative z-10 flex h-[76%] w-[42%] max-w-[340px] min-w-[180px] items-center justify-center border border-dashed border-[var(--color-secondary)]/35 bg-[linear-gradient(180deg,rgba(8,126,135,0.08),rgba(255,255,255,0.52))] text-center shadow-[0_24px_40px_rgba(8,25,34,0.12)] max-lg:h-[88%] max-lg:w-[68%] max-lg:min-w-0">
              <div className="absolute inset-3 border border-[var(--color-primary)]/25" />
              <div className="relative hidden px-5 lg:block">
                <Crosshair size={30} className="mx-auto mb-4 text-[var(--color-primary)]" strokeWidth={1.2} />
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-secondary)]">Character asset</p>
                <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-slate-400">Replace HERO_CHARACTER_IMAGE_SRC</p>
              </div>
            </div>
          )}
        </div>

        <aside className="hero-aside relative z-30 hidden min-w-0 flex-col gap-3 bg-[var(--color-bg)]/70 lg:flex lg:absolute lg:right-6 lg:top-1/2 lg:w-[200px] lg:-translate-y-1/2 lg:bg-transparent lg:pb-0 xl:right-8 xl:w-[230px]">
          <div className="col-span-3 mb-0 flex items-center justify-between border-b border-slate-900/10 pb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 lg:mb-2 lg:pb-3">
            <span>Field dossier</span>
            <span className="text-[var(--color-primary)]">Live</span>
          </div>
          <div className="hero-stat border-l-2 border-[var(--color-primary)] bg-white/65 p-3 backdrop-blur-md lg:p-4">
            <ScanLine size={16} className="mb-2 text-[var(--color-secondary)] lg:mb-5 lg:h-[18px] lg:w-[18px]" strokeWidth={1.5} />
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Open sessions</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-[-0.08em] text-[#081922] lg:text-4xl">03</p>
          </div>
          <div className="hero-stat border-l-2 border-amber-500 bg-white/65 p-3 backdrop-blur-md lg:p-4">
            <ShieldCheck size={16} className="mb-2 text-amber-600 lg:mb-5 lg:h-[18px] lg:w-[18px]" strokeWidth={1.5} />
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Challenge window</p>
            <p className="mt-1 font-display text-base font-bold uppercase tracking-[-0.04em] text-[#081922] lg:text-xl">09-HR</p>
          </div>
          <div className="hero-stat border-l-2 border-[var(--color-secondary)] bg-[#081922] p-3 text-white shadow-xl lg:p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">Prize archive</p>
            <p className="mt-1 font-display text-sm font-bold tracking-[-0.04em] text-[var(--color-electric-aqua)] lg:text-xl">LKR 100K+</p>
          </div>
        </aside>
      </div>

      {/* Organizer ribbon */}
      <div className="hero-organizer relative z-10 mt-1 border-t border-slate-900/10 bg-white/45 px-4 py-5 backdrop-blur-md sm:mt-10 sm:px-6 sm:py-5 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:border-t-0 lg:bg-transparent">
        <div className="content-rail flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
            <span>Organized by</span>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:w-auto sm:gap-x-7 md:gap-x-9">
            <div className="group flex items-center gap-2.5">
              <img
                src={sbLogo}
                alt="SLTC IEEE Student Branch"
                loading="lazy"
                decoding="async"
                className="h-7 w-auto object-contain opacity-80 transition-opacity duration-200 group-hover:opacity-100 md:h-8"
              />
              <span className="text-[10px] text-slate-500 transition-colors duration-200 group-hover:text-slate-900 sm:text-xs">
                IEEE SB of SLTC
              </span>
            </div>

            <span className="hidden h-5 w-px bg-slate-900/10 sm:block" aria-hidden="true" />

            <div className="group flex items-center gap-2.5">
              <img
                src={csLogo}
                alt="IEEE Computer Society SLTC"
                loading="lazy"
                decoding="async"
                className="h-6 w-auto object-contain opacity-80 transition-opacity duration-200 group-hover:opacity-100 md:h-7"
              />
              <span className="text-[10px] text-slate-500 transition-colors duration-200 group-hover:text-slate-900 sm:text-xs">
                Computer Society
              </span>
            </div>

            <span className="hidden h-5 w-px bg-slate-900/10 sm:block" aria-hidden="true" />

            <div className="group flex items-center gap-2.5">
              <img
                src={xtremeLogo}
                alt="IEEEXtreme 20.0"
                loading="lazy"
                decoding="async"
                className="h-6 w-auto object-contain opacity-85 transition-opacity duration-200 group-hover:opacity-100 md:h-7"
              />
              <span className="text-[10px] font-medium text-[var(--color-secondary)] sm:text-xs">
                IEEEXtreme 20.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
