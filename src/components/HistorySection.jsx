import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Award, Users, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const historyData = [
    { year: "01", title: "Problem Solving", description: "Learn to break problems into steps, choose algorithms, and test and debug your code in the Programming Fundamentals session.", icon: Sparkles, stats: "14 October | Open to everyone" },
    { year: "02", title: "Team Strategy", description: "Practice problem triage, teamwork, and time management in Advanced Strategy before putting your approach to the test.", icon: Users, stats: "21 October | Open to everyone" },
    { year: "03", title: "Contest Confidence", description: "Apply your preparation in the nine-hour online PreXtreme challenge on HackerRank with a complete three-member SLTC team.", icon: Award, stats: "24 October | SLTC teams only" }
];

const HistorySection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const progressLineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            // Progress line animation
            gsap.fromTo(progressLineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

            // Animate history cards
            cardsRef.current.forEach((card) => {
                gsap.fromTo(card,
                    {
                        y: 80,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Parallax effect for individual cards
                gsap.to(card, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToCardsRef = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen py-24 px-4 md:px-10 overflow-hidden bg-[#050505]">
            {/* Background gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-20">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Clock className="text-[var(--color-primary)]" size={32} />
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                            Your <span className="text-[var(--color-primary)]">Preparation</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
                        Build the skills and confidence to think clearly, solve together, and compete.
                    </p>
                    <div className="w-32 h-1 bg-[var(--color-primary)] mx-auto mt-8"></div>
                </div>

                {/* Progress Line */}
                <div className="relative mb-12">
                    <div className="w-full h-[2px] bg-white/10 mx-auto">
                        <div ref={progressLineRef} className="h-full bg-gradient-to-r from-[var(--color-primary)] via-purple-500 to-[var(--color-primary)] origin-left"></div>
                    </div>
                </div>

                {/* History Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {historyData.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                ref={addToCardsRef}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-[var(--color-primary)]/50 transition-all duration-500 overflow-hidden">
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-purple-500/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-purple-500/5 transition-all duration-500"></div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Year Badge */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="inline-block px-5 py-2 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30">
                                                <span className="text-[var(--color-primary)] font-bold text-2xl tracking-wider">{item.year}</span>
                                            </div>
                                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-primary)]/50 transition-colors duration-300">
                                                <IconComponent className="text-[var(--color-primary)]" size={24} />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                                            {item.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="pt-4 border-t border-white/10">
                                            <p className="text-[var(--color-primary)] font-semibold text-sm">
                                                {item.stats}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Decorative corner elements */}
                                    <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/5 rounded-tr-2xl"></div>
                                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-white/5 rounded-bl-2xl"></div>
                                </div>

                                {/* Connection line (only for first two cards) */}
                                {index < historyData.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-[2px] bg-gradient-to-r from-[var(--color-primary)]/50 to-transparent"></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom decorative text */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 text-sm tracking-[0.3em] uppercase font-bold">
                        Think. Solve. Compete.
                    </p>
                </div>
            </div>

            {/* Decorative grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>
        </section>
    );
};

export default HistorySection;
