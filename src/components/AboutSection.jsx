import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Eye, Users, Trophy, ShieldCheck, ArrowUpRight } from 'lucide-react';
import projectChair from '../assets/projectchair.jpeg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

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
      gsap.from(".about-pillar-card", {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-pillars-grid",
          start: "top 80%",
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
      className="relative w-full py-28 px-6 md:px-12 bg-transparent overflow-hidden border-b border-white/10"
    >
      {/* Decorative Animus Scanlines & Grid */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* CodeSprint Signature Section Header */}
        <div className="section-header">
          <div className="section-label about-header-anim">
            <span>THE CREED // MEMORY DIRECTIVE</span>
          </div>

          <div className="section-heading-wrap about-header-anim">
            <span className="section-heading-outline">THE INITIATION</span>
            <span className="section-heading-italic">What is DecodeXtreme?</span>
          </div>

          <p className="section-subtext about-header-anim">
            PREPARATION FOR IEEEXTREME 20.0 · SLTC RESEARCH UNIVERSITY
          </p>
        </div>

        {/* Narrative & Context Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-gray-300 font-body text-base md:text-lg leading-relaxed">
            <p>
              <strong className="text-white">DecodeXtreme 2026</strong> is the premier virtual competitive programming boot-camp organized by the <strong className="text-[var(--color-primary)]">IEEE Student Branch of SLTC</strong> alongside the <strong className="text-white">IEEE Computer Society Student Branch Chapter</strong>.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Structured as a progressive four-stage synchronization path, DecodeXtreme prepares aspiring student programmers to think algorithmically, collaborate seamlessly in 3-member teams, and solve under intense time constraints.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-3">
              <ShieldCheck className="text-[var(--color-primary)] shrink-0" size={20} />
              <span>
                <strong>Open Access Policy:</strong> The Awareness, Fundamentals, and Strategy sessions welcome participants from any institution worldwide. The PreXtreme challenge is exclusively reserved for undergraduate teams of three from SLTC.
              </span>
            </div>
          </div>

          {/* Organizer Dossier Card */}
          <div className="lg:col-span-5 about-dossier">
            <div className="animus-card p-6 md:p-8 hud-bracket">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)]">
                    ORGANIZER DOSSIER
                  </span>
                </div>
                <span className="font-mono text-[11px] text-gray-500">IEEE SB // SLTC</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={projectChair}
                    alt="Organizer Leadership"
                    className="w-16 h-16 rounded-xl object-cover grayscale border border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[var(--color-primary)] text-black p-1 rounded-full">
                    <Quote size={10} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">IEEE Student Branch of SLTC</h4>
                  <p className="font-mono text-xs text-[var(--color-primary)]">Student Chapter · Computer Society</p>
                  <p className="font-mono text-[11px] text-gray-400 mt-0.5">Sri Lanka Technological Campus</p>
                </div>
              </div>

              <blockquote className="text-xs text-gray-300 italic border-l-2 border-[var(--color-primary)] pl-3 py-1 mb-6">
                "Nothing is true, everything is permitted. In competitive coding, every boundary can be breached through algorithmic insight and unwavering team synergy."
              </blockquote>

              <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 pt-4 border-t border-white/5">
                <span>FORMAT: 100% ONLINE</span>
                <span className="text-[var(--color-primary)]">FREE PARTICIPATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid (CodeSprint High-Tech Cards) */}
        <div className="about-pillars-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="about-pillar-card animus-card p-8 group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-bold text-[var(--color-primary)]/80 group-hover:text-[var(--color-primary)] transition-colors">
                      {p.num}
                    </span>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[var(--color-primary)]/50 transition-colors text-[var(--color-primary)]">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-primary)] mb-2">
                    {p.badge}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
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
