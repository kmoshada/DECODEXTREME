import { Volume2, VolumeX } from 'lucide-react';

const SoundAmbiance = ({ isMuted, setIsMuted }) => {
  return (
    <button
      type="button"
      onClick={() => setIsMuted(!isMuted)}
      className="nav-angular-button flex min-h-10 items-center gap-2 border border-slate-900/15 bg-white/90 px-3 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-slate-600 shadow-[0_6px_18px_rgba(8,25,34,0.04)] transition-all hover:border-[var(--color-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-secondary)]"
      title={isMuted ? 'Enable Animus Ambiance' : 'Mute Ambiance'}
      aria-label={isMuted ? 'Enable background ambience' : 'Mute background ambience'}
      aria-pressed={!isMuted}
    >
      {isMuted ? (
        <>
          <VolumeX size={14} className="text-slate-500" />
          <span className="hidden sm:inline text-[10px]">Audio muted</span>
        </>
      ) : (
        <>
          <Volume2 size={14} className="animate-pulse text-[var(--color-secondary)]" />
          <span className="hidden sm:inline text-[10px] font-bold text-[var(--color-secondary)]">Animus Sync</span>
        </>
      )}
    </button>
  );
};

export default SoundAmbiance;
