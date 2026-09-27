import React from 'react';
import { Sparkles, ArrowRight, Compass, RefreshCw } from 'lucide-react';

interface DiscoveryTrailProps {
  trail: string[];
  onResetTrail: () => void;
  onExploreEvents: () => void;
  onExploreProjects: () => void;
  onOpenJoin: () => void;
}

export const DiscoveryTrail: React.FC<DiscoveryTrailProps> = ({
  trail,
  onResetTrail,
  onExploreEvents,
  onExploreProjects,
  onOpenJoin
}) => {
  const count = trail.length;

  return (
    <section className="py-20 border-b border-[#121316]/8 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00629B]/8 text-[#00629B] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Session Connection Engine</span>
        </div>

        {/* Trail Nodes */}
        {count > 0 ? (
          <div className="mb-8">
            <p className="text-xs uppercase font-mono tracking-wider text-[#121316]/50 mb-4">
              Your Real-Time Trajectory ({count} connections discovered)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {trail.slice(-6).map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-3 py-1 rounded-md bg-[#FBFBFA] border border-[#121316]/10 text-xs font-medium text-[#121316]">
                    {item}
                  </span>
                  {idx < Math.min(trail.length - 1, 5) && (
                    <span className="text-[#00629B] font-bold text-xs">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={onResetTrail}
                className="inline-flex items-center gap-1.5 text-xs text-[#121316]/40 hover:text-[#121316] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset trajectory memory</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#121316]/50 font-mono mb-6">
            Click on any event, project case study, tech tag, or mentor profile to begin charting your trajectory.
          </p>
        )}

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316] mb-4">
          YOU FOUND A PATH.
        </h2>

        <p className="text-base sm:text-lg text-[#121316]/70 max-w-xl mx-auto mb-8">
          “Where does yours lead?” Explore. Learn. Build. Connect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreEvents}
            className="px-5 py-2.5 text-xs font-semibold text-[#121316] bg-[#FBFBFA] hover:bg-white border border-[#121316]/12 rounded-md shadow-2xs transition-colors"
          >
            EXPLORE EVENTS
          </button>
          <button
            onClick={onExploreProjects}
            className="px-5 py-2.5 text-xs font-semibold text-[#121316] bg-[#FBFBFA] hover:bg-white border border-[#121316]/12 rounded-md shadow-2xs transition-colors"
          >
            EXPLORE PROJECTS
          </button>
          <button
            onClick={onOpenJoin}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] rounded-md shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>JOIN IEEE CS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
