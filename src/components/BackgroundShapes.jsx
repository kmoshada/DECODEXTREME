import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BackgroundShapes = () => {
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(shape1Ref.current, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5
        }
      });

      gsap.to(shape2Ref.current, {
        rotation: -270,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Ambient Radial Fog */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[var(--color-primary)]/[0.03] rounded-full blur-[180px]" />

      {/* Animus Hexagonal Ring - Top Left */}
      <div ref={shape1Ref} className="absolute -top-32 -left-32 w-[550px] h-[550px] opacity-15 text-[var(--color-primary)]">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-current stroke-[0.4] fill-none">
          <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" />
          <polygon points="100,30 160,65 160,135 100,170 40,135 40,65" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="45" className="stroke-[0.2]" />
          <line x1="20" y1="55" x2="180" y2="145" className="stroke-[0.2]" />
          <line x1="20" y1="145" x2="180" y2="55" className="stroke-[0.2]" />
        </svg>
      </div>

      {/* Cyber Dodecahedron - Middle Right */}
      <div ref={shape2Ref} className="absolute top-1/3 -right-48 w-[700px] h-[700px] opacity-10 text-[var(--color-primary)]">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-current stroke-[0.35] fill-none">
          <path d="M100,5 L155,30 L180,80 L145,130 L100,195 L55,130 L20,80 L45,30 Z" />
          <path d="M100,5 L100,70 M155,30 L100,70 M45,30 L100,70" />
          <path d="M100,70 L60,110 M100,70 L140,110" />
          <path d="M60,110 L20,80 M140,110 L180,80" />
          <path d="M60,110 L100,195 M140,110 L100,195" />
          <circle cx="100" cy="100" r="85" className="stroke-[0.15]" strokeDasharray="4,4" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundShapes;
