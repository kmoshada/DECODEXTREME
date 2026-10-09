import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundAmbiance = ({ isMuted, setIsMuted }) => {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);

  useEffect(() => {
    // Only init audio context once user toggles unmute (browser autoplay policy)
    if (!isMuted && !audioCtxRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);
        gainNodeRef.current = masterGain;

        // Lowpass filter for deep cinematic Animus drone
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, ctx.currentTime);

        // Sub bass oscillator
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

        // Soft shimmer harmonic
        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
      } catch (e) {
        console.warn('Web Audio not permitted yet', e);
      }
    } else if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      if (isMuted) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      } else {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        gainNodeRef.current.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      }
    }
  }, [isMuted]);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-[var(--color-primary)]/50 hover:bg-white/10 transition-all text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white"
      title={isMuted ? 'Enable Animus Ambiance' : 'Mute Ambiance'}
      aria-label="Toggle Sound"
    >
      {isMuted ? (
        <>
          <VolumeX size={14} className="text-gray-500" />
          <span className="hidden sm:inline text-[10px]">Audio Muted</span>
        </>
      ) : (
        <>
          <Volume2 size={14} className="text-[var(--color-primary)] animate-pulse" />
          <span className="hidden sm:inline text-[10px] text-[var(--color-primary)]">Animus Sync</span>
        </>
      )}
    </button>
  );
};

export default SoundAmbiance;
