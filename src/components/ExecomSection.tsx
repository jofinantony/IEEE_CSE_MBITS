import React, { useState } from 'react';
import { Mail, Linkedin, Github, ChevronRight, X, Shield, Award } from 'lucide-react';
import { ExecomMember } from '../types';

interface ExecomSectionProps {
  members: ExecomMember[];
  onRecordConnection?: (label: string) => void;
  onSelectProject?: (projName: string) => void;
}

export const ExecomSection: React.FC<ExecomSectionProps> = ({
  members,
  onRecordConnection,
  onSelectProject
}) => {
  const [selectedMember, setSelectedMember] = useState<ExecomMember | null>(null);

  const advisory = members.filter((m) => m.tier === 'Advisory');
  const executive = members.filter((m) => m.tier === 'Executive');
  const domainLeads = members.filter((m) => m.tier === 'Domain Lead');

  const handleOpenMember = (m: ExecomMember) => {
    setSelectedMember(m);
    onRecordConnection?.(`ExeCom: ${m.name} (${m.role})`);
  };

  return (
    <section id="people" className="py-20 border-b border-[#121316]/8 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
            07. Leadership & Mentorship
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-3">
            The People Behind the Community
          </h2>
          <p className="text-base text-[#121316]/70 leading-relaxed">
            Faculty counselors, student executives, and technical domain leads steering IEEE Computer Society MBITS.
          </p>
        </div>

        {/* 1. Advisory Faculty */}
        <div className="mb-12">
          <h3 className="text-xs uppercase font-bold tracking-wider text-[#121316]/60 mb-4 pb-2 border-b border-[#121316]/8">
            Advisory Council & Faculty Mentors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advisory.map((person) => (
              <div
                key={person.id}
                onClick={() => handleOpenMember(person)}
                className="bg-white p-5 rounded-lg border border-[#121316]/8 hover:border-[#00629B]/40 hover:shadow-2xs transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00629B]/10 border border-[#00629B]/20 flex items-center justify-center text-sm font-bold text-[#00629B]">
                    {person.avatarFallback}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#121316] hover:text-[#00629B] transition-colors">
                      {person.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#00629B]">{person.role}</p>
                    <p className="text-[11px] text-[#121316]/60">{person.department}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#121316]/30" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Executive Committee */}
        <div className="mb-12">
          <h3 className="text-xs uppercase font-bold tracking-wider text-[#121316]/60 mb-4 pb-2 border-b border-[#121316]/8">
            Executive Committee (2025–2026)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {executive.map((person) => (
              <div
                key={person.id}
                onClick={() => handleOpenMember(person)}
                className="bg-white p-5 rounded-lg border border-[#121316]/8 hover:border-[#00629B]/40 hover:shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#121316]/5 border border-[#121316]/10 flex items-center justify-center text-xs font-bold text-[#121316]">
                      {person.avatarFallback}
                    </div>
                    {person.year && (
                      <span className="text-[10px] font-mono text-[#121316]/50">
                        {person.year}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#121316] mb-0.5">
                    {person.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#00629B] mb-2">{person.role}</p>
                  <p className="text-[11px] text-[#121316]/65 line-clamp-2 leading-relaxed">
                    {person.bio}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#121316]/6 flex items-center justify-between text-xs text-[#00629B]">
                  <span className="text-[11px] font-medium">View Portfolio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Domain Leads */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-wider text-[#121316]/60 mb-4 pb-2 border-b border-[#121316]/8">
            Technical Domain & Operations Leads
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domainLeads.map((person) => (
              <div
                key={person.id}
                onClick={() => handleOpenMember(person)}
                className="bg-white p-5 rounded-lg border border-[#121316]/8 hover:border-[#00629B]/40 hover:shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center text-xs font-bold text-[#0284C7]">
                      {person.avatarFallback}
                    </div>
                    {person.year && (
                      <span className="text-[10px] font-mono text-[#121316]/50">
                        {person.year}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#121316] mb-0.5">
                    {person.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#00629B] mb-2">{person.role}</p>
                  <p className="text-[11px] text-[#121316]/65 line-clamp-2 leading-relaxed">
                    {person.bio}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#121316]/6 flex items-center justify-between text-xs text-[#00629B]">
                  <span className="text-[11px] font-medium">Domain Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Member Profile Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/50 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-lg border border-[#121316]/12 shadow-xl max-w-lg w-full p-6 sm:p-7 relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-1.5 text-[#121316]/60 hover:text-[#121316] rounded-md hover:bg-[#121316]/5 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#00629B]/10 border border-[#00629B]/20 flex items-center justify-center text-base font-bold text-[#00629B] shrink-0">
                  {selectedMember.avatarFallback}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#121316]">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#00629B]">
                    {selectedMember.role}
                  </p>
                  <p className="text-[11px] text-[#121316]/60">
                    {selectedMember.department} {selectedMember.year ? `· ${selectedMember.year}` : ''}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#121316]/80 mb-6">
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#121316] mb-1">
                    Bio & Focus
                  </h4>
                  <p className="leading-relaxed">{selectedMember.bio}</p>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#121316] mb-1.5">
                    Core Responsibilities
                  </h4>
                  <ul className="space-y-1 pl-1">
                    {selectedMember.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#00629B] mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedMember.projectsLed && selectedMember.projectsLed.length > 0 && (
                  <div>
                    <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#121316] mb-1.5">
                      Build Lab Initiatives
                    </h4>
                    <div className="flex gap-2">
                      {selectedMember.projectsLed.map((p) => (
                        <span
                          key={p}
                          onClick={() => {
                            setSelectedMember(null);
                            onSelectProject?.(p);
                          }}
                          className="px-2 py-1 rounded bg-[#00629B]/8 text-[#00629B] font-mono text-[11px] cursor-pointer hover:underline"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Contact & Social Links */}
              <div className="pt-4 border-t border-[#121316]/8 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#121316]/70 hover:text-[#00629B]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedMember.email}</span>
                </a>

                <div className="flex items-center gap-3">
                  {selectedMember.github && (
                    <a
                      href={selectedMember.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#121316]/60 hover:text-[#121316]"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#121316]/60 hover:text-[#00629B]"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
