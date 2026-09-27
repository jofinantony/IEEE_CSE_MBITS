import React from 'react';
import { History, ArrowRight, X, RotateCcw } from 'lucide-react';

interface SessionResumeBannerProps {
  previousTrail: string[];
  lastSection?: string;
  onResume: () => void;
  onDiscard: () => void;
  onDismiss: () => void;
}

export const SessionResumeBanner: React.FC<SessionResumeBannerProps> = ({
  previousTrail,
  lastSection,
  onResume,
  onDiscard,
  onDismiss
}) => {
  if (!previousTrail || previousTrail.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%] sm:w-full animate-fade-in pointer-events-auto">
      <div className="bg-[#121316] text-white p-4 rounded-lg shadow-2xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-[#00629B]/30 border border-[#0284C7]/40 flex items-center justify-center text-[#0284C7] shrink-0 mt-0.5">
            <History className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#0284C7] font-semibold">
                Session Detected
              </span>
              <span className="text-[10px] text-white/40">· sessionStorage</span>
            </div>
            <p className="text-xs font-medium text-white/90 mt-0.5">
              Restore your {previousTrail.length}-step Discovery Trail:
            </p>
            <p className="text-[11px] text-white/60 truncate max-w-xs sm:max-w-sm mt-0.5 font-mono">
              {previousTrail.slice(-3).join(' → ')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={onDiscard}
            className="px-2.5 py-1.5 text-xs text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors flex items-center gap-1"
            title="Start a brand new session"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Start Fresh</span>
          </button>

          <button
            onClick={onResume}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#121316] bg-white hover:bg-white/90 rounded transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Resume Trail</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00629B]" />
          </button>

          <button
            onClick={onDismiss}
            className="p-1 text-white/40 hover:text-white rounded ml-1"
            aria-label="Dismiss prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
