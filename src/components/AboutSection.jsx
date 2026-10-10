import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Eye, Users, Trophy, ShieldCheck, ArrowUpRight } from 'lucide-react';
import projectChair from '../assets/projectchair.jpeg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const pillarsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".about-header-anim", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // Cards staggered reveal
      gsap.fromTo(".about-pillar-card", {
        autoAlpha: 0,
        y: 50,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: "top 80%",
          once: true,
        }
      });

      // Organizer dossier reveal
      gsap.from(".about-dossier", {
        scale: 0.95,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-dossier",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      badge: "ALGORITHMIC VISION",
      title: "Problem Solving Process",
      desc: "Learn to deconstruct complex algorithmic problems into modular steps, select optimal data structures, and stress-test boundary edge cases.",
      icon: Eye,
      tag: "Session 2 · 14 Oct"
    },
    {
      num: "02",
      badge: "BROTHERHOOD TRIAGE",
      title: "Team Strategy & Time Mastery",
      desc: "Coordinate seamlessly with your 3-member roster. Master real-time problem triage, parallel task assignment, and high-pressure contest execution.",
      icon: Users,
      tag: "Session 3 · 21 Oct"
    },
    {
      num: "03",
      badge: "THE LEAP OF FAITH",
      title: "Contest Confidence",
      desc: "Put your skills to the ultimate test in the 9-hour online PreXtreme battle on HackerRank before representing at the global 24-hour IEEEXtreme 20.0 arena.",
      icon: Trophy,
      tag: "PreXtreme · 24 Oct"
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-slate-900/10 bg-[var(--color-bg)] px-6 py-28 md:px-12"
    >
      {/* Decorative Animus Scanlines & Grid */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 bg-[var(--color-primary)]/5 blur-[140px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="about-header-anim mb-10 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          <span className="h-px w-10 bg-[var(--color-primary)]" />
          <span>THE CREED // MEMORY DIRECTIVE</span>
        </div>

        <div className="mb-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.25fr_0.9fr] lg:gap-12">
          <div className="about-header-anim max-w-sm">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              PREPARATION FOR IEEEXTREME 20.0
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-[-0.06em] text-[#081922] md:text-5xl">
              Think.
              <br />
              Solve.
              <br />
              Compete.
            </h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-slate-600">
              DecodeXtreme is a focused online programming experience by the IEEE Student Branch of SLTC, built to help student teams sharpen their algorithms, strategy, and confidence.
            </p>
            <div className="mt-6 flex items-center gap-3 border-l-2 border-[var(--color-primary)] pl-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
              <ShieldCheck size={16} className="shrink-0 text-[var(--color-secondary)]" />
              <span>Open access · Sri Lanka · 100% online</span>
            </div>
          </div>

          <div className="about-dossier mx-auto w-full max-w-[360px]">
            <div className="nav-angular overflow-hidden border border-slate-900/10 bg-white p-2 shadow-[0_18px_50px_rgba(8,25,34,0.1)]">
              <div className="relative aspect-[0.9] overflow-hidden bg-[#dfe7e9]">
                <img
                  src={projectChair}
                  alt="Organizer leadership"
                  className="h-full w-full object-cover grayscale-[0.2]"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                  <span className="bg-[#081922]/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white">
                    Organizer profile
                  </span>
                  <span className="bg-[var(--color-primary)] p-2 text-[#052126]">
                    <Quote size={14} fill="currentColor" />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-3">
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.03em] text-[#081922]">
                    IEEE Student Branch of SLTC
                  </h3>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                    Student Chapter · Computer Society
                  </p>
                </div>
                <span className="font-mono text-[9px] text-slate-400">2026</span>
              </div>
            </div>
          </div>

          <div className="about-header-anim space-y-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Program focus</p>
              <p className="mt-2 font-display text-2xl font-bold uppercase tracking-[-0.04em] text-[#081922]">Digital problem solvers</p>
            </div>
            <div className="border-t border-slate-900/10 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Format</p>
              <p className="mt-2 font-display text-lg font-bold uppercase text-[var(--color-secondary)]">100% online · free</p>
            </div>
            <blockquote className="border-l-2 border-[var(--color-primary)] pl-3 font-body text-xs italic leading-relaxed text-slate-500">
              “Every boundary can be breached through algorithmic insight and team synergy.”
            </blockquote>
          </div>
        </div>

        {/* 3 Pillars Grid (CodeSprint High-Tech Cards) */}
        <div ref={pillarsRef} className="about-pillars-grid grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="about-pillar-card animus-card nav-angular group flex flex-col justify-between p-8 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-bold text-[var(--color-primary)]/80 group-hover:text-[var(--color-primary)] transition-colors">
                      {p.num}
                    </span>
                    <div className="border border-slate-900/10 bg-white/70 p-3 text-[var(--color-secondary)] transition-colors group-hover:border-[var(--color-primary)]/50">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-2">
                    {p.badge}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-display text-2xl font-bold text-[#081922] transition-colors group-hover:text-[var(--color-secondary)]">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-slate-500">
                    {p.desc}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="flex items-center justify-between border-t border-slate-900/10 pt-4 font-mono text-xs text-slate-500">
                  <span>{p.tag}</span>
                  <span className="text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
