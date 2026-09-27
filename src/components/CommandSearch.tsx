import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, Cpu, User, BookOpen, Trophy, ArrowRight, CornerDownLeft } from 'lucide-react';
import { EventItem, ProjectItem, ExecomMember, ResourceItem, AchievementItem } from '../types';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
  projects: ProjectItem[];
  people: ExecomMember[];
  resources: ResourceItem[];
  achievements: AchievementItem[];
  onSelectResult: (targetAnchor: string, itemTitle?: string) => void;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({
  isOpen,
  onClose,
  events,
  projects,
  people,
  resources,
  achievements,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search Results Compilation
  const matchedEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.technologies.some((t) => t.toLowerCase().includes(q))
      )
    : events.slice(0, 2);

  const matchedProjects = q
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      )
    : projects.slice(0, 2);

  const matchedPeople = q
    ? people.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.bio.toLowerCase().includes(q)
      )
    : people.slice(0, 2);

  const matchedResources = q
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedEvents.length +
    matchedProjects.length +
    matchedPeople.length +
    matchedResources.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#121316]/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-lg border border-[#121316]/12 shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#121316]/8 gap-3">
          <Search className="w-5 h-5 text-[#00629B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search IEEE CS MBITS: AI, workshops, projects, people, Python..."
            className="w-full text-sm font-medium text-[#121316] placeholder-[#121316]/40 bg-transparent outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#121316]/40 hover:text-[#121316]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-[#121316]/50 bg-[#121316]/5 px-2 py-0.5 rounded border border-[#121316]/10">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-xs text-[#121316]/50">
              No matching records found for "{query}". Try "AI", "Go", "Workshop", or "Systems".
            </div>
          ) : (
            <>
              {/* Events */}
              {matchedEvents.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#121316]/50 mb-1.5 px-2">
                    Events & Labs
                  </p>
                  <div className="space-y-1">
                    {matchedEvents.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => {
                          onSelectResult('events', ev.title);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-md hover:bg-[#FBFBFA] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[#00629B]" />
                          <div>
                            <p className="text-xs font-semibold text-[#121316] group-hover:text-[#00629B]">
                              {ev.title}
                            </p>
                            <p className="text-[11px] text-[#121316]/60">
                              {ev.date} · {ev.venue}
                            </p>
                          </div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#121316]/30 group-hover:text-[#00629B]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#121316]/50 mb-1.5 px-2">
                    Build Lab Projects
                  </p>
                  <div className="space-y-1">
                    {matchedProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectResult('build-lab', p.name);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-md hover:bg-[#FBFBFA] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Cpu className="w-4 h-4 text-[#00629B]" />
                          <div>
                            <p className="text-xs font-semibold text-[#121316] group-hover:text-[#00629B]">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-[#121316]/60">
                              {p.tagline}
                            </p>
                          </div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#121316]/30 group-hover:text-[#00629B]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* People */}
              {matchedPeople.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#121316]/50 mb-1.5 px-2">
                    ExeCom & Mentors
                  </p>
                  <div className="space-y-1">
                    {matchedPeople.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          onSelectResult('people', m.name);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-md hover:bg-[#FBFBFA] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <User className="w-4 h-4 text-[#00629B]" />
                          <div>
                            <p className="text-xs font-semibold text-[#121316] group-hover:text-[#00629B]">
                              {m.name}
                            </p>
                            <p className="text-[11px] text-[#121316]/60">
                              {m.role} ({m.department})
                            </p>
                          </div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#121316]/30 group-hover:text-[#00629B]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {matchedResources.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#121316]/50 mb-1.5 px-2">
                    Curriculum & Starters
                  </p>
                  <div className="space-y-1">
                    {matchedResources.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          onSelectResult('resources', r.title);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-md hover:bg-[#FBFBFA] flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-[#00629B]" />
                          <div>
                            <p className="text-xs font-semibold text-[#121316] group-hover:text-[#00629B]">
                              {r.title}
                            </p>
                            <p className="text-[11px] text-[#121316]/60">
                              {r.type} · By {r.author}
                            </p>
                          </div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#121316]/30 group-hover:text-[#00629B]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer controls hint */}
        <div className="px-4 py-2.5 bg-[#FBFBFA] border-t border-[#121316]/8 flex items-center justify-between text-[11px] text-[#121316]/50">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono">IEEE CS MBITS Command Engine</span>
        </div>
      </div>
    </div>
  );
};
