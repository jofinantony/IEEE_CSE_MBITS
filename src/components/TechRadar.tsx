import React, { useState } from 'react';
import { Technology, TechnologyCategory } from '../types';
import { Radio, ArrowRight, ExternalLink } from 'lucide-react';

interface TechRadarProps {
  technologies: Technology[];
  onSelectTechnologyFilter: (techName: string) => void;
  onRecordConnection?: (label: string) => void;
}

export const TechRadar: React.FC<TechRadarProps> = ({
  technologies,
  onSelectTechnologyFilter,
  onRecordConnection
}) => {
  const [activeCategory, setActiveCategory] = useState<TechnologyCategory | 'All'>('All');
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  const categories: (TechnologyCategory | 'All')[] = [
    'All',
    'AI',
    'Systems',
    'Web',
    'Cyber',
    'Cloud',
    'Data',
    'IoT'
  ];

  const rings: ('Adopt' | 'Trial' | 'Assess')[] = ['Adopt', 'Trial', 'Assess'];

  const filteredTechnologies = activeCategory === 'All'
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  const handleTechClick = (tech: Technology) => {
    setSelectedTech(tech);
    onSelectTechnologyFilter(tech.name);
    onRecordConnection?.(`Radar: ${tech.name} (${tech.ring})`);
  };

  return (
    <section id="tech-radar" className="py-20 border-b border-[#121316]/8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
              06. Stack Architecture & Horizons
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-3">
              Tech Radar
            </h2>
            <p className="text-base text-[#121316]/70 leading-relaxed">
              Our active assessment of tools, languages, and frameworks actively deployed in MBITS chapter builds and study tracks.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#121316] text-white border-[#121316]'
                    : 'bg-[#FBFBFA] text-[#121316]/70 border-[#121316]/10 hover:border-[#121316]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Ring Columns: Adopt, Trial, Assess */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rings.map((ring) => {
            const itemsInRing = filteredTechnologies.filter((t) => t.ring === ring);

            return (
              <div
                key={ring}
                className="bg-[#FBFBFA] rounded-lg border border-[#121316]/8 p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#121316]/8">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          ring === 'Adopt'
                            ? 'bg-emerald-600'
                            : ring === 'Trial'
                            ? 'bg-[#00629B]'
                            : 'bg-amber-600'
                        }`}
                      />
                      <h3 className="text-sm font-bold tracking-wide uppercase text-[#121316]">
                        {ring}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#121316]/50">
                      {itemsInRing.length} technologies
                    </span>
                  </div>

                  <p className="text-xs text-[#121316]/65 mb-4">
                    {ring === 'Adopt' && 'Proven in production systems; default choice for student initiatives.'}
                    {ring === 'Trial' && 'Actively tested in workshops and research prototypes.'}
                    {ring === 'Assess' && 'Explored in reading groups for prospective adoption.'}
                  </p>

                  <div className="space-y-2.5">
                    {itemsInRing.map((tech) => (
                      <div
                        key={tech.id}
                        onClick={() => handleTechClick(tech)}
                        className={`p-3 rounded-md border transition-all cursor-pointer ${
                          selectedTech?.id === tech.id
                            ? 'bg-white border-[#00629B] shadow-2xs ring-1 ring-[#00629B]/20'
                            : 'bg-white border-[#121316]/6 hover:border-[#00629B]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#121316]">
                            {tech.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#00629B]">
                            {tech.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#121316]/70 leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    ))}

                    {itemsInRing.length === 0 && (
                      <div className="py-6 text-center text-xs text-[#121316]/40 italic">
                        No technologies in this category for {ring}.
                      </div>
                    )}
                  </div>
                </div>

                {ring === 'Adopt' && (
                  <div className="mt-4 pt-3 border-t border-[#121316]/6 text-[11px] text-[#121316]/50">
                    Click any item to view related builds and events.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
