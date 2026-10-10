import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight, Video, Code2, Users, Trophy, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SESSIONS = [
  {
    id: 'awareness',
    date: '12 OCT 2026',
    num: '01',
    title: 'Awareness Session',
    subtitle: 'DISCOVER THE PATHWAY',
    desc: 'An in-depth introduction to IEEEXtreme 20.0, competitive programming standards, preparation roadmaps, and local event expectations.',
    time: '8:00 PM – 10:00 PM (SLT)',
    platform: 'Zoom Online',
    eligibility: 'Open to Everyone Worldwide',
    icon: Video,
    image: '',
    imageLabel: 'BACKGROUND IMAGE / AWARENESS',
    accent: 'var(--color-primary)',
    isChallenge: false,
  },
  {
    id: 'fundamentals',
    date: '14 OCT 2026',
    num: '02',
    title: 'Programming Fundamentals',
    subtitle: 'ALGORITHMS & PROBLEM SOLVING',
    desc: 'Hands-on decomposition of programming challenges, core algorithms, edge-case testing, and live debugging tactics on contest platforms.',
    time: '8:00 PM – 10:00 PM (SLT)',
    platform: 'Zoom Online',
    eligibility: 'Open to Everyone Worldwide',
    icon: Code2,
    image: '',
    imageLabel: 'BACKGROUND IMAGE / FUNDAMENTALS',
    accent: 'var(--color-primary)',
    isChallenge: false,
  },
  {
    id: 'strategy',
    date: '21 OCT 2026',
    num: '03',
    title: 'Advanced Strategy',
    subtitle: 'TEAMWORK & TIME TRIAGE',
    desc: 'Formulate your team game plan. Triage problems efficiently, manage sub-task dispatching, avoid contest traps, and preserve mental endurance.',
    time: '8:00 PM – 10:00 PM (SLT)',
    platform: 'Zoom Online',
    eligibility: 'Open to Everyone Worldwide',
    icon: Users,
    image: '',
    imageLabel: 'BACKGROUND IMAGE / STRATEGY',
    accent: 'var(--color-primary)',
    isChallenge: false,
  },
  {
    id: 'prextreme',
    date: '24 OCT 2026',
    num: '04',
    title: 'PreXtreme Team Battle',
    subtitle: '9-HOUR HACKERRANK CHALLENGE',
    desc: 'The defining arena. Exactly three SLTC undergraduates compete side-by-side in a nine-hour coding sprint with live leaderboard scoring.',
    time: '8:00 AM Check-in · 9:00 AM – 6:00 PM Coding',
    platform: 'HackerRank Arena',
    eligibility: 'SLTC Undergraduates Only (Teams of 3)',
    icon: Trophy,
    image: '',
    imageLabel: 'BACKGROUND IMAGE / PREXTREME',
    accent: '#ff334b',
    isChallenge: true,
  },
];

const CLIP_HIDDEN = 'inset(100% 0% 0% 0%)';
const CLIP_SHOWN = 'inset(0% 0% 0% 0%)';

// Plays forward when the trigger enters, plays backward when scrolled back above it.
const toggleOnScroll = (trigger, start = 'top 85%') => ({
  trigger,
  start,
  toggleActions: 'play none none reverse',
});

// One panel: a curtain wipe, then its content rises in a short stagger.
const revealPanel = (panel, vars = {}) => {
  const items = panel.querySelectorAll('.prog-panel-item');

  return gsap
    .timeline({ defaults: { ease: 'power3.out' }, ...vars })
    .fromTo(
      panel,
      { clipPath: CLIP_HIDDEN, y: 48 },
      { clipPath: CLIP_SHOWN, y: 0, duration: 0.9, ease: 'power4.inOut' },
      0,
    )
    .fromTo(
      items,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07 },
      0.35,
    );
};

const buildHeader = (section, q) => {
  gsap
    .timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: toggleOnScroll(section.querySelector('.prog-header'), 'top 80%'),
    })
    .fromTo(q('.prog-eyebrow-line'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 0.6, ease: 'power2.inOut' }, 0)
    .fromTo(q('.prog-eyebrow-text'), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 0.1)
    .fromTo(q('.prog-heading-word'), { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.14, ease: 'power4.out' }, 0.2)
    .fromTo(q('.prog-header-note'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.7);
};

const buildFootnote = (section) => {
  const footnote = section.querySelector('.prog-footnote');
  gsap.fromTo(
    footnote,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: toggleOnScroll(footnote, 'top 94%'),
    },
  );
};

// DESKTOP: panels cascade left to right, tied directly to scroll position.
// Scroll down builds them, scroll up unbuilds them. No pin (the About section already pins).
const buildPanelsScrubbed = (section, q) => {
  const master = gsap.timeline({
    scrollTrigger: {
      trigger: section.querySelector('.prog-panels'),
      start: 'top 85%',
      end: 'top 30%',
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });

  q('.prog-panel').forEach((panel, i) => master.add(revealPanel(panel), i * 0.2));
};

// TABLET / MOBILE: each panel reveals as it enters and reverses when scrolled back up.
const buildPanelsFlow = (q) => {
  q('.prog-panel').forEach((panel) => {
    revealPanel(panel, { scrollTrigger: toggleOnScroll(panel, 'top 82%') });
  });
};

const ServicesSection = ({ onOpenRegister }) => {
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
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;

          // Reduced motion: no animation, everything stays visible.
          if (reduceMotion) return undefined;

          buildHeader(section, q);
          buildFootnote(section);

          if (isDesktop) {
            buildPanelsScrubbed(section, q);
          } else {
            buildPanelsFlow(q);
          }
          return undefined;
        },
      );
    }, section);

    // Web fonts change heading height, so re-measure trigger positions once they load.
    document.fonts?.ready.then(() => {
      if (!disposed) requestAnimationFrame(() => ScrollTrigger.refresh());
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
      id="program"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-slate-900/10 bg-transparent py-28"
    >
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-30" />
      <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-(--color-primary)/5 blur-[140px] pointer-events-none" />

      <div className="content-rail relative z-10">
        <div className="prog-header mb-10 text-left sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-(--color-secondary) sm:text-[10px]">
            <span className="prog-eyebrow-line h-px w-10 bg-(--color-primary)" />
            <span className="prog-eyebrow-text">PROGRAM // FOUR PHASES</span>
          </div>

          <h2 className="prog-heading max-w-4xl font-display text-[clamp(3.8rem,12vw,8rem)] font-bold uppercase leading-[0.8] tracking-[-0.08em] text-[#081922]">
            <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
              <span className="prog-heading-word block will-change-transform">THE</span>
            </span>
            <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
              <span className="prog-heading-word block text-(--color-secondary) will-change-transform">PROGRAM</span>
            </span>
          </h2>

          <p className="prog-header-note mt-6 max-w-xl border-l-2 border-(--color-primary) pl-4 font-mono text-[10px] font-medium uppercase leading-[1.7] tracking-[0.12em] text-slate-600 sm:mt-8 sm:text-[11px]">
            FOUR PHASES · ONE FINAL CHALLENGE · FREE TO JOIN
          </p>
        </div>

        {/* Replace each image placeholder with a background asset by filling `image` in SESSIONS. */}
        <div className="prog-panels grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {SESSIONS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="prog-panel group relative flex min-h-128 flex-col justify-end overflow-hidden p-5 sm:min-h-144 lg:min-h-156"
                style={{
                  backgroundColor: item.isChallenge ? '#1d0911' : '#081922',
                  '--panel-accent': item.accent,
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {/* Accent glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 65% 20%, color-mix(in srgb, ${item.accent} 28%, transparent), transparent 40%), linear-gradient(135deg, rgba(255,255,255,0.06), transparent 55%)`,
                  }}
                />

                {/* Legibility gradient: keeps text readable with or without a background image */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_10%,rgba(0,0,0,0.68)_95%)]"
                />

                {/* Frame */}
                <div
                  aria-hidden="true"
                  className="absolute inset-4 border border-white/15 transition-all duration-500 group-hover:inset-3 group-hover:border-(--panel-accent)/70"
                />

                <div className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                  <span>Phase {item.num}</span>
                  {item.isChallenge && <span style={{ color: item.accent }}>Final challenge</span>}
                </div>

                {!item.image && (
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/3 w-4/5 -translate-x-1/2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-white/45"
                  >
                    <div className="mx-auto mb-3 h-px w-12 bg-white/40" />
                    {item.imageLabel}
                  </div>
                )}

                <div className="relative z-10">
                  <div className="prog-panel-item mb-3 flex items-center gap-2">
                    <Icon size={16} style={{ color: item.accent }} aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{item.date}</span>
                  </div>

                  <h3 className="prog-panel-item mb-1 font-display text-2xl font-bold uppercase leading-[0.92] text-white transition-colors duration-300 group-hover:text-(--panel-accent)">
                    {item.title}
                  </h3>
                  <p className="prog-panel-item mb-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                    {item.subtitle}
                  </p>

                  <p className="prog-panel-item mb-5 text-xs leading-relaxed text-white/70">{item.desc}</p>

                  <div className="prog-panel-item mb-5 space-y-1 border-t border-white/20 pt-3 font-mono text-[9px] uppercase tracking-widest text-white/60">
                    <p>{item.time}</p>
                    <p>{item.platform}</p>
                    <p>{item.eligibility}</p>
                  </div>

                  <div className="prog-panel-item">
                    <button
                      type="button"
                      onClick={onOpenRegister}
                      className={`nav-angular-button inline-flex items-center gap-2 px-4 py-3 font-display text-[10px] font-bold uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                        item.isChallenge
                          ? 'bg-[#ff334b] text-[#1d0911] hover:bg-white'
                          : 'bg-(--color-primary) text-[#052126] hover:bg-(--color-electric-aqua)'
                      }`}
                    >
                      <span>{item.isChallenge ? 'Register team' : 'Enroll session'}</span>
                      <MoveRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Resources & preparation footnote */}
        <div className="prog-footnote mt-8 flex flex-col items-start justify-between gap-6 border border-slate-900/10 bg-white/70 p-6 font-mono text-xs text-slate-600 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-(--color-secondary)" aria-hidden="true" />
            <span>
              Preparation guidelines, session slides, and HackerRank sample questions will be shared with registered delegates.
            </span>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
            className="whitespace-nowrap font-bold text-(--color-secondary) underline-offset-4 hover:underline"
          >
            Read Delegate Guide →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;