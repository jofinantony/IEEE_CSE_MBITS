import React from 'react';
import { Award, BookOpen, Trophy, CheckCircle, ExternalLink } from 'lucide-react';
import { AchievementItem } from '../types';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <section id="achievements" className="py-20 border-b border-[#121316]/8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
            08. Verified Record
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-3">
            Achievements & Laurels
          </h2>
          <p className="text-base text-[#121316]/70 leading-relaxed">
            Documented recognitions, IEEE regional commendations, national hackathon podiums, and peer-reviewed research outputs.
          </p>
        </div>

        {/* Quantified Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-lg bg-[#FBFBFA] border border-[#121316]/8">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#00629B] font-mono tabular-nums mb-1">
              100%
            </p>
            <p className="text-xs font-semibold text-[#121316]">Peer-Reviewed Builds</p>
            <p className="text-[11px] text-[#121316]/60">Open source on GitHub</p>
          </div>

          <div className="p-5 rounded-lg bg-[#FBFBFA] border border-[#121316]/8">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-mono tabular-nums mb-1">
              #1
            </p>
            <p className="text-xs font-semibold text-[#121316]">Regional Commendation</p>
            <p className="text-[11px] text-[#121316]/60">IEEE Kerala Section CS</p>
          </div>

          <div className="p-5 rounded-lg bg-[#FBFBFA] border border-[#121316]/8">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#00629B] font-mono tabular-nums mb-1">
              SIH '26
            </p>
            <p className="text-xs font-semibold text-[#121316]">National Finalist</p>
            <p className="text-[11px] text-[#121316]/60">Smart India Hackathon</p>
          </div>

          <div className="p-5 rounded-lg bg-[#FBFBFA] border border-[#121316]/8">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#121316] font-mono tabular-nums mb-1">
              1.2M+
            </p>
            <p className="text-xs font-semibold text-[#121316]">Edge Neural Weights</p>
            <p className="text-[11px] text-[#121316]/60">BioSignal ONNX Engine</p>
          </div>
        </div>

        {/* Detailed Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-lg bg-[#FBFBFA] border border-[#121316]/8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2 font-mono text-[#00629B]">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </div>
                  <span className="font-mono text-[#121316]/50">{item.year}</span>
                </div>

                <h3 className="text-lg font-bold text-[#121316] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#121316]/75 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#121316]/6 flex items-center justify-between text-xs">
                <span className="text-[#121316]/70 font-medium">
                  {item.recipient}
                </span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.verificationBadge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
