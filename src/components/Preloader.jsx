import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const wipeRef = useRef(null);
  const hudRef = useRef(null);

  const [count, setCount] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);

  const phaseLabels = [
    {
      phase: '01 / DNA SIGNAL ACQUISITION',
      detail: 'Searching encoded memory fragments...',
      tag: 'ACQUIRING SIGNAL'
    },
    {
      phase: '02 / STRAND ALIGNMENT',
      detail: 'Rebuilding sequence structure...',
      tag: 'MAPPING STRANDS'
    },
    {
      phase: '03 / CIPHER DECRYPTION',
      detail: 'Resolving encrypted memory sectors...',
      tag: 'DECODING ARCHIVE'
    },
    {
      phase: '04 / FULL SYNCHRONIZATION',
      detail: 'Memory reconstruction complete.',
      tag: 'SYNCHRONIZING'
    }
  ];

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let now = 0;
    let raf = 0;
    let finished = false;

    const visual = {
      speed: 1,
      spread: 1,
      resolve: 0,
      glow: 0.65,
      disperse: 0,
      turn: 0
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resize);
    resize();

    const fract = (x) => x - Math.floor(x);
    const rnd = (x) => fract(Math.sin(x * 127.1 + 78.233) * 43758.5453123);

    // Horizontal DNA Double Helix strand calculation
    const strand = (t, s) => {
      const cycles = W > 768 ? 3 : 2;
      const ph = t * Math.PI * cycles + now * 0.42 + visual.turn;
      const rad = Math.cos(ph);
      const scale = Math.min(W / 1200, H / 760, 1.5);
      const A = Math.min(125, Math.max(50, H * 0.16)) * visual.spread;
      const perspective = 0.68 + (0.32 * (rad + 1)) / 2;

      return {
        // x spans horizontally across screen width with edge bleed
        x: W * 0.5 + t * (W * 0.52),
        // y oscillates vertically around center
        y: H * 0.5 + Math.sin(ph) * A * s * perspective,
        z: rad * s,
        scale,
        perspective
      };
    };

    const draw = () => {
      now += 0.012 * visual.speed;
      ctx.clearRect(0, 0, W, H);

      // Atmospheric radial gradient for pristine white Animus corridor
      const g = ctx.createRadialGradient(W * 0.5, H * 0.5, 10, W * 0.5, H * 0.5, Math.max(W, H) * 0.55);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      g.addColorStop(0.55, 'rgba(235, 240, 242, 0.08)');
      g.addColorStop(1, 'rgba(215, 222, 226, 0.03)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Compute DNA nodes along horizontal span
      const count = Math.min(220, Math.max(100, Math.floor(W / 6.5)));
      const DNA = [];
      for (let i = 0; i < count; i++) {
        const t = (i / (count - 1) - 0.5) * 2;
        const a = strand(t, 1);
        const b = strand(t, -1);
        DNA.push([a, b, t]);
      }

      // Density fog: soft floating memory dust particles
      for (let i = 0; i < 220; i++) {
        const q = rnd(i * 3.3);
        const r = rnd(i * 4.9);
        const u = rnd(i * 8.2);
        const y = fract(r + now * (0.002 + 0.003 * u)) * H;
        const x = fract(q + Math.sin(now * 0.18 + i) * 0.008) * W;
        const dx = (x - W / 2) / (W / 2);
        const dy = (y - H / 2) / (H / 2);
        const opacity = (0.05 + 0.18 * (1 - Math.min(1, Math.sqrt(dx * dx + dy * dy)))) * (0.5 + visual.glow * 0.5);

        ctx.fillStyle =
          i % 7 === 0
            ? `rgba(8, 180, 195, ${opacity * 0.85})`
            : i % 13 === 0
            ? `rgba(200, 60, 75, ${opacity * 0.8})`
            : `rgba(90, 115, 126, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, 0.4 + u * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connecting horizontal base-pair rungs
      for (let i = 1; i < count; i += 2) {
        const [a, b, t] = DNA[i];
        const near = Math.max(0, Math.cos(t * Math.PI * 0.5) * 0.35 + 0.65);
        const depth = (a.z + 1) / 2;
        const alpha = (0.12 + 0.42 * depth) * near * (1 - visual.disperse);

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(8, 170, 185, ${alpha})`);
        grad.addColorStop(0.5, `rgba(120, 145, 155, ${alpha * 0.8})`);
        grad.addColorStop(1, `rgba(195, 55, 70, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = 0.85;
        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      // Dual strands as long continuous ribbons (Strand 0 = Cyan/Slate, Strand 1 = Crimson)
      for (let s = 0; s < 2; s++) {
        for (let pass = 0; pass < 3; pass++) {
          ctx.beginPath();
          for (let i = 0; i < count; i++) {
            const p = DNA[i][s];
            const j = pass - 1;
            const x = p.x;
            const y = p.y + j * (1.8 + Math.abs(p.z) * 2.8);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          if (s === 0) {
            // Cyan / Slate strand
            ctx.strokeStyle =
              pass === 1
                ? `rgba(8, 165, 180, ${0.4 + 0.45 * visual.glow})`
                : `rgba(50, 120, 135, ${0.12 * visual.glow})`;
            ctx.lineWidth = pass === 1 ? 1.8 : 3.4;
          } else {
            // Crimson strand
            ctx.strokeStyle =
              pass === 1
                ? `rgba(195, 55, 70, ${0.4 + 0.45 * visual.glow})`
                : `rgba(215, 75, 90, ${0.12 * visual.glow})`;
            ctx.lineWidth = pass === 1 ? 1.8 : 3.4;
          }
          ctx.stroke();
        }
      }

      // Genomic data pixels (Base nodes)
      for (let i = 0; i < count; i += 2) {
        const [a, b, t] = DNA[i];
        for (let s = 0; s < 2; s++) {
          const p = s ? b : a;
          const z = Math.max(0, (p.z + 1) / 2);
          const fade = Math.pow(Math.max(0, 1 - Math.pow(Math.abs(t), 2)), 0.4);
          const n = rnd(i * 19 + s * 7);
          const alpha = (0.22 + 0.75 * z) * fade * (0.4 + visual.glow * 0.6);
          const size = 1.2 + 2.8 * z;

          ctx.fillStyle = s === 0 ? `rgba(8, 160, 175, ${alpha})` : `rgba(195, 50, 65, ${alpha})`;
          ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);

          if (n > 0.88) {
            ctx.strokeStyle = s === 0 ? `rgba(8, 160, 175, ${alpha * 0.55})` : `rgba(195, 50, 65, ${alpha * 0.55})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - 7);
            ctx.lineTo(p.x, p.y + 7);
            ctx.stroke();
          }
        }
      }

      // Horizontal ghost filaments
      for (let i = 0; i < 160; i++) {
        const t = rnd(i * 4.19) * 2 - 1;
        const side = i % 2 ? 1 : -1;
        const p = strand(t, side);
        const driftX = (rnd(i * 8.4) - 0.5) * 160 * (0.5 + visual.disperse * 3);
        const driftY = (rnd(i * 6.22) - 0.5) * 45;
        const x = p.x + driftX;
        const y = p.y + driftY;
        const alpha = (0.07 + 0.25 * rnd(i * 9.2)) * (1 - Math.abs(t) * 0.65) * (1 - visual.disperse * 0.4);

        ctx.fillStyle = i % 8 === 0 ? `rgba(195, 55, 70, ${alpha})` : `rgba(75, 105, 118, ${alpha})`;
        const len = i % 4 === 0 ? 11 : 3.5;
        ctx.fillRect(x - len / 2, y, len, 0.85);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    // GSAP Timeline for progression
    let tl = gsap.timeline({ delay: 0.2 });

    const finish = () => {
      if (finished) return;
      finished = true;

      const endTl = gsap.timeline();
      endTl
        .to(visual, {
          spread: 0.02,
          speed: 2.5,
          disperse: 1,
          glow: 1.6,
          duration: 0.7,
          ease: 'power3.inOut'
        })
        .to(hudRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.35,
          ease: 'power2.in'
        }, '<+0.1')
        .to(wipeRef.current, {
          opacity: 0.95,
          duration: 0.2,
          ease: 'power2.in'
        }, '-=0.1')
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            if (onComplete) onComplete();
          }
        }, '<+0.15');
    };

    // Store finish handler on container for Skip button
    if (containerRef.current) {
      containerRef.current.__finish = () => {
        if (tl) tl.kill();
        finish();
      };
    }

    const counterObj = { value: 0 };
    const stepDuration = 0.55;

    phaseLabels.forEach((label, i) => {
      tl.call(() => {
        setPhaseIdx(i);
      });

      tl.to(counterObj, {
        value: (i + 1) * 25,
        duration: stepDuration,
        ease: 'power1.inOut',
        onUpdate: () => {
          setCount(Math.round(counterObj.value));
        }
      });

      tl.to(
        visual,
        {
          speed: 1.15 + i * 0.15,
          glow: 0.65 + i * 0.12,
          spread: 1 + i * 0.06,
          turn: (i + 1) * 0.2,
          duration: stepDuration,
          ease: 'sine.inOut'
        },
        '<'
      );

      tl.to({}, { duration: 0.08 });
    });

    tl.call(finish);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      if (tl) tl.kill();
      gsap.killTweensOf(visual);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (containerRef.current && containerRef.current.__finish) {
      containerRef.current.__finish();
    } else if (onComplete) {
      onComplete();
    }
  };

  const activePhase = phaseLabels[phaseIdx] || phaseLabels[0];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse 80% 67% at 52% 48%, #ffffff 5%, #eef1f2 62%, #dae0e3 100%)',
        color: '#081922'
      }}
    >
      {/* Horizontal DNA Canvas */}
      <canvas
        ref={canvasRef}
        aria-label="Animated horizontal DNA memory helix"
        className="absolute inset-0 w-full h-full block z-10 pointer-events-none"
      />

      {/* Animus Noise Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-20"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.72\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.14\'/%3E%3C/svg%3E")'
        }}
      />

      {/* Cyber Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0 4px, rgba(72, 94, 107, 0.035) 5px 6px)'
        }}
      />

      {/* HUD Telemetry Frame */}
      <div ref={hudRef} className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
        {/* Top Header */}
        <header className="flex justify-between items-start text-[10px] tracking-[0.2em] font-mono text-[#5f7179]">
          <div>
            <div className="font-hud font-bold text-base md:text-lg tracking-[0.16em] text-[#081922] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#08d1d8] animate-ping" />
              <span>ANIMUS // NEURAL INTERFACE</span>
            </div>
            <div className="text-[10px] text-[#71828a] mt-1 tracking-widest">
              IEEE PRE-XTREME // SESSION 0004
            </div>
          </div>

          <div className="text-right leading-relaxed text-[10px] hidden sm:block text-[#5f7179]">
            <div>
              GENETIC ARCHIVE: <span className="text-[#08d1d8] font-bold">ONLINE</span>
            </div>
            <div>MEMORY INTEGRITY: SYNCHRONIZING</div>
            <div className="text-[#7d8c94]">RECONSTRUCTION PROTOCOL</div>
          </div>
        </header>

        {/* Left Side Rail: Sequence Analysis */}
        <div className="absolute top-1/2 left-6 md:left-10 -translate-y-1/2 hidden md:flex items-center gap-3 pointer-events-none">
          <div
            className="h-44 w-2 opacity-70"
            style={{
              background: 'repeating-linear-gradient(to bottom, #9ba8ad 0 1px, transparent 1px 11px)'
            }}
          />
          <div className="font-mono text-[9px] tracking-[0.28em] text-[#8c989e] [writing-mode:vertical-rl] rotate-180">
            SEQUENCE ANALYSIS / GENETIC CODE
          </div>
        </div>

        {/* Center Loading Information */}
        <section className="self-center text-center max-w-lg w-full px-4">
          {/* Status Tag */}
          <div className="font-mono text-[10px] tracking-[0.38em] text-[#08a5ac] uppercase mb-2 font-medium">
            [ {activePhase.tag} ]
          </div>

          {/* Subtitle */}
          <div className="font-hud text-xs md:text-sm tracking-[0.28em] uppercase text-[#4a5860] font-semibold">
            GENETIC SEQUENCE RECONSTRUCTION
          </div>

          {/* Progress Percentage Display */}
          <div className="font-hud text-7xl md:text-9xl font-bold tracking-tight text-[#1c2c34] my-2 md:my-4 tabular-nums drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
            {String(count).padStart(3, '0')}
            <span className="text-3xl md:text-4xl text-[#08d1d8] ml-1 font-semibold">%</span>
          </div>

          {/* Current Phase */}
          <div className="font-mono text-xs tracking-[0.25em] text-[#34424a] uppercase min-h-[20px] font-medium">
            {activePhase.phase}
          </div>

          {/* Phase Detail */}
          <div className="font-mono text-[10px] tracking-[0.12em] text-[#78878f] mt-1 min-h-[20px]">
            {activePhase.detail}
          </div>

          {/* Progress Bar */}
          <div className="w-64 max-w-full h-[2px] bg-[#c7d0d3] mx-auto mt-5 overflow-hidden rounded-full">
            <div
              className="h-full bg-[#08d1d8] transition-all duration-75"
              style={{ width: `${count}%` }}
            />
          </div>
        </section>

        {/* Bottom Phase List and Skip Button */}
        <footer className="flex flex-col sm:flex-row items-center sm:items-end justify-between text-[10px] font-mono tracking-[0.16em] text-[#71828a] gap-4">
          <div className="flex gap-4 md:gap-6 flex-wrap justify-center sm:justify-start">
            {['01 / ACQUISITION', '02 / ALIGNMENT', '03 / DECRYPTION', '04 / SYNCHRONIZATION'].map((step, idx) => (
              <span
                key={step}
                className={`relative pt-3 transition-all duration-300 ${
                  phaseIdx === idx
                    ? 'text-[#08a5ac] font-bold opacity-100'
                    : phaseIdx > idx
                    ? 'text-[#485b63] opacity-85'
                    : 'opacity-40 text-[#8e9ca2]'
                }`}
              >
                <span
                  className={`absolute top-0 left-0 w-full h-[2px] transition-colors duration-300 ${
                    phaseIdx >= idx ? 'bg-[#08d1d8]' : 'bg-[#9ca9af]'
                  }`}
                />
                {step}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-[9px] tracking-[0.2em] text-[#87969e]">
              ANIMUS MEMORY ARCHIVE · SESSION SYNC
            </span>
            <button
              type="button"
              onClick={handleSkip}
              className="pointer-events-auto border border-[#a6b2b6] hover:border-[#08d1d8] text-[#475760] hover:text-[#08d1d8] px-4 py-1.5 rounded text-[10px] tracking-[0.18em] uppercase transition-all duration-200 bg-white/60 hover:bg-white cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>SKIP INTRO</span>
              <span className="text-[#08d1d8]">↗</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Animus Flash Wipe Overlay */}
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-white pointer-events-none opacity-0 z-40 transition-opacity"
      />
    </div>
  );
};

export default Preloader;
