import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight, Shield, Video, Code2, Users, Trophy, ExternalLink, CheckCircle2 } from 'lucide-react';

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

      gsap.from(".prog-card-anim", {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".prog-grid",
          start: "top 80%",
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
      accent: '#ff334b',
      isChallenge: true
    }
  ];

  return (
    <section
      id="program"
      ref={sectionRef}
      className="relative w-full py-28 px-6 md:px-12 bg-transparent text-white overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-30" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* CodeSprint Signature Section Header */}
        <div className="section-header">
          <div className="section-label prog-header-anim">
            <span>PROGRAM &amp; REGISTRATION // FOUR PHASES</span>
          </div>

          <div className="section-heading-wrap prog-header-anim">
            <span className="section-heading-outline">CHOOSE YOUR PATH</span>
            <span className="section-heading-italic">Program &amp; Challenges</span>
          </div>

          <p className="section-subtext prog-header-anim">
            THREE OPEN SESSIONS AND ONE SLTC TEAM CHALLENGE · FREE PARTICIPATION
          </p>
        </div>

        {/* Sessions Grid */}
        <div className="prog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sessions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`prog-card-anim animus-card p-6 md:p-8 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 hud-bracket ${
                  item.isChallenge
                    ? 'border-red-500/30 bg-gradient-to-b from-red-950/20 to-black/60 shadow-[0_0_30px_rgba(255,51,75,0.1)]'
                    : ''
                }`}
              >
                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-white/40 group-hover:text-[var(--color-primary)] transition-colors">
                      {item.num}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border ${
                      item.isChallenge
                        ? 'border-red-500/40 text-red-400 bg-red-500/10'
                        : 'border-[var(--color-primary)]/30 text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    }`}>
                      {item.date}
                    </span>
                  </div>

                  {/* Icon & Subtitle */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Meta & Action */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="font-mono text-[11px] space-y-1 text-gray-400">
                    <div className="flex justify-between">
                      <span className="text-gray-500">FORMAT:</span>
                      <span className="text-white">{item.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">AUDIENCE:</span>
                      <span className={item.isChallenge ? 'text-red-400 font-semibold' : 'text-emerald-400'}>
                        {item.isChallenge ? 'SLTC Only' : 'Everyone'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenRegister}
                    className={`w-full py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      item.isChallenge
                        ? 'bg-[#ff334b] text-white hover:bg-red-600 shadow-[0_0_20px_rgba(255,51,75,0.4)]'
                        : 'bg-white/10 hover:bg-[var(--color-primary)] hover:text-black text-white'
                    }`}
                  >
                    <span>{item.isChallenge ? 'Register Team' : 'Enroll Session'}</span>
                    <MoveRight size={14} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Resources & Preparation Footnote Bar */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-[var(--color-primary)]" />
            <span>Preparation guidelines, session slides, and HackerRank sample questions will be shared with registered delegates.</span>
          </div>
          <button
            onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[var(--color-primary)] hover:underline whitespace-nowrap"
          >
            Read Delegate Guide →
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
