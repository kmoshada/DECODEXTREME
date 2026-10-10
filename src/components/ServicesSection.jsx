import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight, Video, Code2, Users, Trophy, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = ({ onOpenRegister }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prog-header-anim", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      gsap.from(".prog-panel-anim", {
        y: 80,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".prog-panels",
          start: "top 80%",
          once: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sessions = [
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
      isChallenge: false
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
      isChallenge: false
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
      isChallenge: false
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
      isChallenge: true
    }
  ];

  return (
    <section
      id="program"
      ref={sectionRef}
      className="relative w-full py-28 bg-transparent text-white overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-30" />
      <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-(--color-primary)/5 blur-[140px] pointer-events-none" />

      <div className="content-rail relative z-10">
        
        <div className="prog-header mb-10 text-left sm:mb-14">
          <div className="prog-header-anim mb-4 inline-flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-(--color-secondary) sm:text-[10px]">
            <span className="h-px w-10 bg-(--color-primary)" />
            <span>PROGRAM // FOUR PHASES</span>
          </div>

          <h2 className="prog-heading prog-header-anim max-w-4xl font-display text-[clamp(3.8rem,12vw,8rem)] font-bold uppercase leading-[0.8] tracking-[-0.08em] text-[#081922]">
            <span className="block">THE</span>
            <span className="block text-(--color-secondary)">PROGRAM</span>
          </h2>

          <p className="prog-header-anim mt-6 max-w-xl border-l-2 border-(--color-primary) pl-4 font-mono text-[10px] font-medium uppercase leading-[1.7] tracking-[0.12em] text-slate-600 sm:mt-8 sm:text-[11px]">
            FOUR PHASES · ONE FINAL CHALLENGE · FREE TO JOIN
          </p>
        </div>

        {/* Editorial panel layout. Replace each image placeholder with a background asset when available. */}
        <div className="prog-panels grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-2 md:grid-cols-4">
          {sessions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`prog-panel-anim group relative flex min-h-128 flex-col justify-end overflow-hidden bg-[#dde8eb] p-5 transition-colors duration-500 sm:min-h-144 lg:min-h-156 ${
                  item.isChallenge
                    ? 'bg-[#28151a]'
                    : ''
                }`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,20,24,0.08)_18%,rgba(5,20,24,0.88)_88%)] transition-opacity duration-500 group-hover:opacity-75" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(8,209,216,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.1),transparent_55%)] opacity-75 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-4 border border-white/20 transition-all duration-500 group-hover:inset-3 group-hover:border-(--color-primary)/70" />
                <div className="absolute left-5 top-5 right-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                  <span>{item.imageLabel}</span>
                  <span>{item.num}</span>
                </div>
                {!item.image && (
                  <div className="absolute left-1/2 top-1/3 -translate-x-1/2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                    <div className="mx-auto mb-3 h-px w-12 bg-white/40" />
                    Image placeholder
                  </div>
                )}

                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon size={16} className={item.isChallenge ? 'text-red-300' : 'text-(--color-primary)'} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">{item.date}</span>
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold uppercase leading-[0.92] text-white transition-colors duration-300 group-hover:text-(--color-electric-aqua)">
                    {item.title}
                  </h3>
                  <p className="mb-5 text-xs leading-relaxed text-white/65">{item.desc}</p>
                  <div className="mb-5 border-t border-white/20 pt-3 font-mono text-[9px] uppercase tracking-widest text-white/55">
                    <p>{item.platform}</p>
                    <p className="mt-1">{item.eligibility}</p>
                  </div>
                  <button
                    onClick={onOpenRegister}
                    className={`nav-angular-button inline-flex items-center gap-2 px-4 py-3 font-display text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      item.isChallenge
                        ? 'bg-[#ff334b] text-white hover:bg-red-600'
                        : 'bg-(--color-primary) text-[#052126] hover:bg-(--color-electric-aqua)'
                    }`}
                  >
                    <span>{item.isChallenge ? 'Register team' : 'Enroll session'}</span>
                    <MoveRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resources & Preparation Footnote Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border border-white/10 bg-white/2 p-6 font-mono text-xs text-gray-400 md:flex-row">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-(--color-primary)" />
            <span>Preparation guidelines, session slides, and HackerRank sample questions will be shared with registered delegates.</span>
          </div>
          <button
            onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-(--color-primary) hover:underline whitespace-nowrap"
          >
            Read Delegate Guide →
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
