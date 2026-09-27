import React from 'react';
import { BookOpen, Terminal, Trophy, Network, ArrowRight } from 'lucide-react';
import { IntentMode } from '../types';

interface IntentSelectorProps {
  currentIntent: IntentMode;
  onSelectIntent: (intent: IntentMode) => void;
}

export const IntentSelector: React.FC<IntentSelectorProps> = ({
  currentIntent,
  onSelectIntent
}) => {
  const options: {
    id: IntentMode;
    title: string;
    description: string;
    icon: React.ElementType;
    targets: string[];
  }[] = [
    {
      id: 'learn',
      title: 'LEARN',
      description: 'Hands-on labs, engineering roadmaps & IEEE literature',
      icon: BookOpen,
      targets: ['Bytes & Neurons Workshop', 'Systems Curriculum', 'PyTorch Lab']
    },
    {
      id: 'build',
      title: 'BUILD',
      description: 'Student engineering case studies & open-source tools',
      icon: Terminal,
      targets: ['PulseNet Telemetry', 'BioSignal AI', 'SecAudit Scanner']
    },
    {
      id: 'compete',
      title: 'COMPETE',
      description: 'Collegiate hackathons, code sprints & regional laurels',
      icon: Trophy,
      targets: ['HackPulse 24h Hackathon', 'Smart India Hackathon', 'Kochi Hub Award']
    },
    {
      id: 'connect',
      title: 'CONNECT',
      description: 'Meet student researchers, mentors & ExeCom leadership',
      icon: Network,
      targets: ['Chapter ExeCom', 'Advisory Faculty', 'Peer Study Circles']
    }
  ];

  return (
    <section className="py-14 border-b border-[#121316]/8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-1.5">
              02. Guided Exploration
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121316]">
              What are you here to do?
            </h2>
          </div>

          {currentIntent !== 'all' && (
            <button
              onClick={() => onSelectIntent('all')}
              className="text-xs font-semibold text-[#00629B] hover:text-[#004e7c] underline underline-offset-4"
            >
              Reset to Full Overview
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = currentIntent === option.id;

            return (
              <button
                key={option.id}
                onClick={() => onSelectIntent(isSelected ? 'all' : option.id)}
                className={`group text-left p-5 rounded-lg border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'border-[#00629B] bg-[#00629B]/5 shadow-xs ring-1 ring-[#00629B]/20'
                    : 'border-[#121316]/10 bg-[#FBFBFA] hover:border-[#00629B]/40 hover:bg-white'
                }`}
              >
                {/* Active indicator bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-[#00629B] transition-transform duration-200 ${
                    isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#00629B] text-white'
                        : 'bg-white border border-[#121316]/10 text-[#00629B] group-hover:border-[#00629B]/30'
                    }`}
                  >
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-[#00629B] translate-x-0.5'
                        : 'text-[#121316]/30 group-hover:text-[#00629B] group-hover:translate-x-1'
                    }`}
                  />
                </div>

                <h3 className="text-sm font-bold text-[#121316] tracking-wide mb-1 flex items-center gap-1.5">
                  <span>{option.title}</span>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-[#00629B] bg-white px-1.5 py-0.5 rounded border border-[#00629B]/20">
                      Active
                    </span>
                  )}
                </h3>
                <p className="text-xs text-[#121316]/70 leading-relaxed mb-3">
                  {option.description}
                </p>

                {/* Sub-targets preview */}
                <div className="pt-2 border-t border-[#121316]/6 space-y-1">
                  {option.targets.map((tgt, i) => (
                    <div key={i} className="text-[11px] text-[#121316]/60 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#00629B]/60" />
                      <span className="truncate">{tgt}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
