import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Quote, ShieldCheck } from 'lucide-react';
import projectChair from '../assets/projectchair.jpeg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

  const learningTracks = [
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative w-full overflow-hidden border-b border-slate-900/10 bg-(--color-bg)"
    >
      <div className="content-rail relative z-10 flex flex-1 flex-col justify-center">
        <div className="about-header-anim about-section-header mb-7 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-secondary)">
          <span className="h-px w-10 bg-(--color-primary)" />
          <span>THE CREED // MEMORY DIRECTIVE</span>
        </div>

        <div className="about-section-grid grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(260px,330px)_minmax(0,1.1fr)] lg:items-center lg:gap-10 xl:gap-14">
            <div className="about-header-anim min-w-0 max-w-sm lg:pb-2">
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
              <button
                type="button"
                className="nav-angular-button mt-6 inline-flex items-center gap-3 bg-(--color-primary) px-4 py-3 font-display text-[10px] font-bold uppercase tracking-widest text-[#052126] transition-colors hover:bg-(--color-electric-aqua)"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Join the mission</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
              <div className="mt-5 flex items-center gap-3 border-l-2 border-(--color-primary) pl-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
                <ShieldCheck size={16} className="shrink-0 text-(--color-secondary)" />
                <span>Open access · Sri Lanka · 100% online</span>
              </div>
            </div>

            <div className="about-dossier min-w-0 w-full max-w-82.5 justify-self-center lg:justify-self-auto">
              <div className="nav-angular overflow-hidden border border-slate-900/10 bg-white p-2 shadow-[0_18px_50px_rgba(8,25,34,0.1)]">
                <div className="relative aspect-[0.92] overflow-hidden bg-[#dfe7e9]">
                  <img
                    src={projectChair}
                    alt="Organizer leadership"
                    className="h-full w-full object-cover grayscale-[0.2]"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                    <span className="bg-[#081922]/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white">
                      Organizer profile
                    </span>
                    <span className="bg-(--color-primary) p-2 text-[#052126]">
                      <Quote size={14} fill="currentColor" />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-3">
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-[0.03em] text-[#081922]">IEEE Student Branch of SLTC</h3>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-(--color-secondary)">
                      Student Chapter · Computer Society
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-slate-400">2026</span>
                </div>
              </div>
            </div>

            <div className="about-header-anim min-w-0 space-y-6 lg:pb-2">
              {learningTracks.map((track) => (
                <div key={track.num} className="border-t border-slate-900/10 pt-5">
                  <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-(--color-primary)">
                    <span>{track.badge}</span>
                    <span>{track.num}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase leading-none tracking-[-0.04em] text-[#081922]">
                    {track.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{track.desc}</p>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{track.tag}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
};

export default AboutSection;
