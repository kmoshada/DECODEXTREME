import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Quote, ShieldCheck } from 'lucide-react';
import projectChair from '../assets/projectchair.jpeg';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = ['Think.', 'Solve.', 'Compete.'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const scrambleText = (element, duration = 0.65) => {
  if (!element) return;

  gsap.killTweensOf(element);

  const finalText = element.dataset.aboutOriginalText || element.textContent;
  element.dataset.aboutOriginalText = finalText;
  const letters = [...finalText];
  let frame = 0;

  gsap.to(element, {
    duration,
    ease: 'power2.out',
    onUpdate: function updateScramble() {
      const progress = this.progress();
      const cursor = Math.min(
        letters.length,
        Math.floor(progress * (letters.length + 2)),
      );
      frame += 1;
      const nextText = letters
        .map((character, index) => {
          if (!/[A-Za-z0-9]/.test(character)) return character;
          if (index < cursor || progress === 1) return character;
          if (index < cursor + 2) {
            return SCRAMBLE_CHARS[(index * 7 + frame) % SCRAMBLE_CHARS.length];
          }
          return character;
        })
        .join('');

      element.textContent = nextText;
    },
    onComplete: () => { element.textContent = finalText; },
  });
};

const buildScrambleReveals = (section, { mobile = false } = {}) => {
  section.querySelectorAll('[data-about-scramble]').forEach((target, index) => {
    const trigger = target.closest('.about-track, .about-dossier, .about-intro-fade') || target;
    const duration = mobile ? 0.85 + (index % 3) * 0.1 : 0.55 + (index % 3) * 0.08;

    ScrollTrigger.create({
      trigger,
      start: mobile ? 'top 72%' : 'top 80%',
      onEnter: () => scrambleText(target, duration),
      onEnterBack: () => scrambleText(target, duration),
    });
  });
};

const LEARNING_TRACKS = [
  {
    num: '01',
    badge: 'ALGORITHMIC VISION',
    title: 'Problem Solving Process',
    desc: 'Learn to deconstruct complex algorithmic problems into modular steps, select optimal data structures, and stress-test boundary edge cases.',
    tag: 'Session 2 · 14 Oct',
  },
  {
    num: '02',
    badge: 'BROTHERHOOD TRIAGE',
    title: 'Team Strategy & Time Mastery',
    desc: 'Coordinate seamlessly with your 3-member roster. Master real-time problem triage, parallel task assignment, and high-pressure contest execution.',
    tag: 'Session 3 · 21 Oct',
  },
  {
    num: '03',
    badge: 'THE LEAP OF FAITH',
    title: 'Contest Confidence',
    desc: 'Put your skills to the ultimate test in the 9-hour online PreXtreme battle on HackerRank before representing at the global 24-hour IEEEXtreme 20.0 arena.',
    tag: 'PreXtreme · 24 Oct',
  },
];

const CLIP_HIDDEN = 'inset(100% 0% 0% 0%)';
const CLIP_SHOWN = 'inset(0% 0% 0% 0%)';

/* -------------------------------------------------------------------------
   DESKTOP: one pinned stage, one scrubbed timeline.
   Scroll down  -> the timeline plays forward (things appear)
   Scroll up    -> the same timeline plays backward (things disappear)
   ------------------------------------------------------------------------- */
const buildPinnedSequence = (section, q) => {
  const tracks = q('.about-track');
  const progress = q('.about-rail-progress');

  gsap.set(progress, { scaleY: 0, transformOrigin: 'top center' });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3.2}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: 2,
    },
  });

  // 1. Eyebrow + headline (masked line reveal)
  tl.from(q('.about-eyebrow-line'), { scaleX: 0, transformOrigin: 'left center', duration: 0.7, ease: 'power2.inOut' }, 0)
    .from(q('.about-eyebrow-text'), { autoAlpha: 0, x: -24, duration: 0.6 }, 0.1)
    .from(q('.about-kicker'), { autoAlpha: 0, y: 16, duration: 0.5 }, 0.4)
    .from(q('.about-headline-word'), { yPercent: 115, duration: 0.9, stagger: 0.18, ease: 'power4.out' }, 0.5)

    // 2. Supporting copy, CTA, access note
    .from(q('.about-intro-fade'), { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.2 }, 1.2)

    // 3. Organizer card: card lifts in, photo is unmasked and settles
    .from(q('.about-dossier'), { autoAlpha: 0, y: 64, duration: 0.9 }, 1.5)
    .fromTo(
      q('.about-dossier-reveal'),
      { clipPath: CLIP_HIDDEN },
      { clipPath: CLIP_SHOWN, duration: 1.1, ease: 'power4.inOut' },
      1.6,
    )
    .from(q('.about-dossier-img'), { scale: 1.35, duration: 1.4, ease: 'power2.out' }, 1.6)
    .from(q('.about-dossier-meta'), { autoAlpha: 0, y: 14, duration: 0.5 }, 2.4);

  // 4. Tracks: each one lands in turn while the rail fills to match
  tracks.forEach((track, i) => {
    const at = 2.4 + i * 0.75;
    tl.from(track.querySelector('.about-track-body'), { autoAlpha: 0, x: 56, duration: 0.8 }, at)
      .from(track.querySelector('.about-track-line'), { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power2.inOut' }, at)
      .from(track.querySelector('.about-track-dot'), { scale: 0, duration: 0.5, ease: 'back.out(2.4)' }, at + 0.1)
      .to(progress, { scaleY: (i + 1) / tracks.length, duration: 0.75, ease: 'none' }, at);
  });

  // 5. Short hold so the finished composition rests before the section unpins
  tl.to({}, { duration: 0.8 });
  buildScrambleReveals(section);
};

/* -------------------------------------------------------------------------
   MOBILE / SHORT SCREENS: no pin. Each block reveals as it enters and
   reverses when scrolled back above its trigger.
   ------------------------------------------------------------------------- */
const buildFlowReveals = (section, q) => {
  const toggle = (trigger, start = 'top 88%') => ({
    trigger,
    start,
    toggleActions: 'play none none reverse',
  });

  q('.about-eyebrow, .about-kicker, .about-intro-fade, .about-dossier, .about-track').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: toggle(el),
      },
    );
  });

  gsap.fromTo(
    q('.about-headline-word'),
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: toggle(section.querySelector('.about-headline')),
    },
  );

  const dossier = section.querySelector('.about-dossier');

  gsap.fromTo(
    q('.about-dossier-reveal'),
    { clipPath: CLIP_HIDDEN, y: 20 },
    { clipPath: CLIP_SHOWN, y: 0, duration: 0.8, ease: 'power4.inOut', scrollTrigger: toggle(dossier) },
  );

  gsap.fromTo(
    q('.about-dossier-img'),
    { scale: 1.18 },
    {
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: toggle(dossier),
    },
  );

  buildScrambleReveals(section, { mobile: true });
};

const AboutSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const q = gsap.utils.selector(section);
    let disposed = false;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isTall: '(min-height: 700px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, isTall, reduceMotion } = context.conditions;

          // Reduced motion: no animation at all, everything stays visible.
          if (reduceMotion) return undefined;

          // Pin only when the whole stage fits the viewport.
          if (isDesktop && isTall) {
            buildPinnedSequence(section, q);
          } else {
            buildFlowReveals(section, q);
          }
          return undefined;
        },
      );
    }, section);

    // Web fonts change text height, so re-measure pin distances once they load.
    document.fonts?.ready.then(() => {
      if (!disposed) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    });

    requestAnimationFrame(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative w-full overflow-hidden border-b border-slate-900/10 bg-(--color-bg) py-20 lg:flex lg:min-h-screen lg:items-center lg:py-24"
    >
      <div className="content-rail relative z-10 w-full">

        <div className="mx-auto grid min-w-0 max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Intro */}
          <div className="min-w-0 lg:col-span-5">

            <h2 className="about-headline font-display text-[clamp(3.25rem,17vw,4.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.07em] text-[#081922] sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl">
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="-my-[0.08em] block overflow-hidden py-[0.08em]">
                  <span className="about-headline-word block will-change-transform">{line}</span>
                </span>
              ))}
            </h2>

            <p data-about-scramble className="about-intro-fade mt-6 font-body text-sm leading-relaxed text-slate-600">
              DecodeXtreme is a focused online programming experience by the IEEE Student Branch of SLTC, built to help student teams sharpen their algorithms, strategy, and confidence.
            </p>

            <div className="about-intro-fade mt-6">
              <button
                type="button"
                className="nav-angular-button inline-flex items-center gap-3 bg-(--color-primary) px-4 py-3 font-display text-[10px] font-bold uppercase tracking-widest text-[#052126] transition-colors hover:bg-(--color-electric-aqua)"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Join the mission</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="about-intro-fade mt-5 flex items-center gap-3 border-l-2 border-(--color-primary) pl-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
              <ShieldCheck size={16} className="shrink-0 text-(--color-secondary)" aria-hidden="true" />
              <span data-about-scramble>Open access · Sri Lanka · 100% online</span>
            </div>
          </div>

          {/* Organizer card */}
          <div className="mx-auto w-full min-w-0 max-w-sm lg:col-span-3 lg:max-w-none">
            <div className="about-dossier nav-angular overflow-hidden border border-slate-900/10 bg-white p-2 shadow-[0_18px_50px_rgba(8,25,34,0.1)]">
              <div className="about-dossier-reveal relative aspect-[0.92] overflow-hidden bg-[#dfe7e9]">
                <img
                  src={projectChair}
                  alt="Organizer leadership"
                  className="about-dossier-img h-full w-full object-cover grayscale-[0.2] will-change-transform"
                />
                <div className="about-dossier-meta absolute inset-x-4 bottom-4 flex items-end justify-between">
                  <span className="bg-[#081922]/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white">
                    <span data-about-scramble>Organizer profile</span>
                  </span>
                  <span className="bg-(--color-primary) p-2 text-[#052126]">
                    <Quote size={14} fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <div>
                  <h3 data-about-scramble className="font-display text-sm font-bold uppercase tracking-[0.03em] text-[#081922]">
                    IEEE Student Branch of SLTC
                  </h3>
                  <p data-about-scramble className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-(--color-secondary)">
                    Student Chapter · Computer Society
                  </p>
                </div>
                <span className="font-mono text-[9px] text-slate-400">2026</span>
              </div>
            </div>
          </div>

          {/* Tracks with progress rail */}
          <div className="relative min-w-0 pl-7 lg:col-span-4">
            <span aria-hidden="true" className="about-rail-progress absolute left-0 top-0 h-full w-px origin-top bg-(--color-primary)" />

            <div className="grid auto-rows-fr gap-6">
              {LEARNING_TRACKS.map((track) => (
                <article key={track.num} className="about-track relative pt-5">
                  <span aria-hidden="true" className="about-track-line absolute inset-x-0 top-0 h-px bg-slate-900/10" />
                  <span
                    aria-hidden="true"
                    className="about-track-dot absolute -left-7 top-0 -ml-[3.5px] -mt-1 h-2 w-2 rounded-full bg-(--color-primary) ring-4 ring-(--color-bg)"
                  />

                  <div className="about-track-body">
                    <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-(--color-primary)">
                      <span >{track.badge}</span>
                      <span>{track.num}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase leading-none tracking-[-0.04em] text-[#081922]">
                      {track.title}
                    </h3>
                    <p data-about-scramble className="mt-3 text-xs leading-relaxed text-slate-500">{track.desc}</p>
                    <p data-about-scramble className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{track.tag}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;