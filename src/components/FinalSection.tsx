import React from 'react';
import { ArrowRight, Globe, Github, Linkedin, Mail } from 'lucide-react';

interface FinalSectionProps {
  onExploreEvents: () => void;
  onExploreProjects: () => void;
  onOpenJoin: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({
  onExploreEvents,
  onExploreProjects,
  onOpenJoin
}) => {
  return (
    <footer className="relative bg-[#121316] text-white pt-24 pb-12 overflow-hidden">
      {/* Subtle converging background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <line x1="100" y1="0" x2="720" y2="280" stroke="#00629B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="400" y1="0" x2="720" y2="280" stroke="#00629B" strokeWidth="1" />
          <line x1="720" y1="0" x2="720" y2="280" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="1040" y1="0" x2="720" y2="280" stroke="#00629B" strokeWidth="1" />
          <line x1="1340" y1="0" x2="720" y2="280" stroke="#00629B" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="720" cy="280" r="4" fill="#0284C7" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Converged Focal Statement */}
        <p className="text-xs uppercase tracking-widest text-[#0284C7] font-semibold mb-4">
          Convergence · The Digital Pulse
        </p>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="block">EVERY CONNECTION</span>
          <span className="block text-[#0284C7]">LEADS SOMEWHERE.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/70 max-w-xl mx-auto mb-10 tracking-tight">
          “Explore. Learn. Build. Connect.”
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-20">
          <button
            onClick={onExploreEvents}
            className="px-6 py-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-md transition-colors"
          >
            EXPLORE EVENTS
          </button>
          <button
            onClick={onExploreProjects}
            className="px-6 py-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-md transition-colors"
          >
            EXPLORE PROJECTS
          </button>
          <button
            onClick={onOpenJoin}
            className="px-6 py-3 text-xs font-semibold text-[#121316] bg-white hover:bg-white/90 rounded-md transition-colors flex items-center gap-1.5"
          >
            <span>JOIN IEEE CS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00629B]" />
          </button>
        </div>

        {/* Quiet Production Footer (Zero Slop) */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-bold text-white text-sm">IEEE CS MBITS</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Mar Baselios Institute of Technology and Science, Kothamangalam</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#network" className="hover:text-white transition-colors">Network</a>
            <a href="#events" className="hover:text-white transition-colors">Events</a>
            <a href="#build-lab" className="hover:text-white transition-colors">Build Lab</a>
            <a href="#people" className="hover:text-white transition-colors">People</a>
            <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mbits-ieee-cs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub Organization"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:cs@mbits.edu.in"
              className="hover:text-white transition-colors"
              aria-label="Chapter Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} IEEE Computer Society MBITS Student Branch Chapter · IEEE Kerala Section. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
