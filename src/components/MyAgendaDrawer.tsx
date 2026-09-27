import React from 'react';
import { X, Calendar, Cpu, Download, Copy, Trash2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EventItem, ProjectItem } from '../types';

interface MyAgendaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedEventIds: string[];
  savedProjectIds: string[];
  allEvents: EventItem[];
  allProjects: ProjectItem[];
  trajectory: string[];
  onToggleSaveEvent: (id: string) => void;
  onToggleSaveProject: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const MyAgendaDrawer: React.FC<MyAgendaDrawerProps> = ({
  isOpen,
  onClose,
  savedEventIds,
  savedProjectIds,
  allEvents,
  allProjects,
  trajectory,
  onToggleSaveEvent,
  onToggleSaveProject,
  onShowToast
}) => {
  if (!isOpen) return null;

  const bookmarkedEvents = allEvents.filter((e) => savedEventIds.includes(e.id));
  const bookmarkedProjects = allProjects.filter((p) => savedProjectIds.includes(p.id));

  const handleExportICS = () => {
    if (bookmarkedEvents.length === 0) {
      onShowToast('Bookmark events first to export calendar (.ics).');
      return;
    }

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//IEEE CS MBITS//NONSGML v1.0//EN\n";
    bookmarkedEvents.forEach((ev) => {
      icsContent += `BEGIN:VEVENT\nSUMMARY:${ev.title}\nDESCRIPTION:${ev.description}\\nSpeaker: ${ev.speaker.name}\nLOCATION:${ev.venue}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'IEEE_CS_MBITS_Agenda.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Exported calendar events (.ics) successfully!');
  };

  const handleCopyTrajectory = () => {
    const text = `IEEE CS MBITS — My Exploration Trajectory:\n\n${
      trajectory.length > 0 ? trajectory.join(' → ') : 'No steps recorded yet.'
    }\n\nBookmarked Workshops:\n${bookmarkedEvents.map((e) => `- ${e.title} (${e.date})`).join('\n')}\n\nExplore at: https://mbits-ieee-cs.edu.in`;
    navigator.clipboard.writeText(text);
    onShowToast('Trajectory and agenda copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#121316]/50 backdrop-blur-2xs animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#121316]/10">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#121316]/8 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#121316]">My Chapter Agenda</h3>
            <p className="text-xs text-[#121316]/60">Your saved sessions & exploration path</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#121316]/60 hover:text-[#121316] rounded-md hover:bg-[#121316]/5"
            aria-label="Close agenda drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto grow space-y-6">
          {/* Saved Events */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#00629B] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Saved Events ({bookmarkedEvents.length})</span>
              </h4>
            </div>

            {bookmarkedEvents.length === 0 ? (
              <p className="text-xs text-[#121316]/40 italic py-2">
                No events saved yet. Click the bookmark icon on any event card to save to your personal schedule.
              </p>
            ) : (
              <div className="space-y-2">
                {bookmarkedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-[#FBFBFA] rounded-md border border-[#121316]/8 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-[#121316]">{ev.title}</p>
                      <p className="text-[11px] text-[#121316]/60">{ev.date} · {ev.venue}</p>
                    </div>
                    <button
                      onClick={() => onToggleSaveEvent(ev.id)}
                      className="p-1 text-[#121316]/40 hover:text-red-600 transition-colors"
                      title="Remove from agenda"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Projects */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#00629B] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Bookmarked Projects ({bookmarkedProjects.length})</span>
              </h4>
            </div>

            {bookmarkedProjects.length === 0 ? (
              <p className="text-xs text-[#121316]/40 italic py-2">
                No projects saved yet. Bookmark case studies in the Build Lab to reference anytime.
              </p>
            ) : (
              <div className="space-y-2">
                {bookmarkedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-[#FBFBFA] rounded-md border border-[#121316]/8 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-[#121316]">{p.name}</p>
                      <p className="text-[11px] text-[#121316]/60">{p.tagline}</p>
                    </div>
                    <button
                      onClick={() => onToggleSaveProject(p.id)}
                      className="p-1 text-[#121316]/40 hover:text-red-600 transition-colors"
                      title="Remove from bookmarks"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Session Trajectory */}
          {trajectory.length > 0 && (
            <div className="pt-4 border-t border-[#121316]/8">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316]/60 mb-2">
                Current Trajectory ({trajectory.length} steps)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {trajectory.slice(-5).map((step, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#121316]/4 border border-[#121316]/8 text-[#121316]/75"
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        <div className="p-4 border-t border-[#121316]/8 bg-[#FBFBFA] space-y-2">
          <button
            onClick={handleExportICS}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] rounded-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Calendar Schedule (.ics)</span>
          </button>
          <button
            onClick={handleCopyTrajectory}
            className="w-full py-2 px-3 text-xs font-semibold text-[#121316] bg-white border border-[#121316]/12 hover:bg-[#FBFBFA] rounded-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5 text-[#00629B]" />
            <span>Copy Trajectory Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
};
