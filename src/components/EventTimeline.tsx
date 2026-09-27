import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight, X, Check, ArrowRight, Bookmark, Download, ExternalLink } from 'lucide-react';
import { EventItem } from '../types';
import { sound } from '../utils/sound';

interface EventTimelineProps {
  events: EventItem[];
  selectedCategory?: string;
  savedEventIds?: string[];
  onSelectTechnology?: (tech: string) => void;
  onToggleSaveEvent?: (id: string) => void;
  onRecordConnection?: (label: string) => void;
  onShowToast?: (msg: string) => void;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({
  events,
  selectedCategory,
  savedEventIds = [],
  onSelectTechnology,
  onToggleSaveEvent,
  onRecordConnection,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '', branchYear: 'B.Tech CSE - 3rd Year', ieeeMember: 'Yes' });

  const filteredEvents = events.filter((ev) => {
    if (activeTab === 'upcoming' && ev.timelineStatus === 'past') return false;
    if (activeTab === 'past' && ev.timelineStatus !== 'past') return false;
    if (selectedCategory && selectedCategory !== 'all') {
      const matchCat = ev.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchTech = ev.technologies.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());
      if (!matchCat && !matchTech) return false;
    }
    return true;
  });

  const handleOpenDetail = (ev: EventItem) => {
    setSelectedEvent(ev);
    setRegistrationSuccess(false);
    sound.playPulse(500, 0.05);
    onRecordConnection?.(`Event: ${ev.title}`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email) return;
    setRegistrationSuccess(true);
    sound.playSuccess();
    onShowToast?.(`Confirmed reservation for ${regForm.name}!`);
    onRecordConnection?.(`Registered for ${selectedEvent?.title}`);
  };

  const handleDownloadSingleICS = (ev: EventItem) => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//IEEE CS MBITS//NONSGML v1.0//EN\nBEGIN:VEVENT\nSUMMARY:${ev.title}\nDESCRIPTION:${ev.description}\\nSpeaker: ${ev.speaker.name}\nLOCATION:${ev.venue}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${ev.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast?.('Calendar file (.ics) downloaded.');
  };

  const getGoogleCalendarUrl = (ev: EventItem) => {
    const title = encodeURIComponent(ev.title);
    const details = encodeURIComponent(`${ev.description}\n\nSpeaker: ${ev.speaker.name} (${ev.speaker.role})\nLocation: ${ev.venue}`);
    const location = encodeURIComponent(ev.venue);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="events" className="py-20 border-b border-[#121316]/8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
              04. Technical Conclaves & Labs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-3">
              Event Timeline
            </h2>
            <p className="text-base text-[#121316]/70 leading-relaxed">
              Explore hands-on workshops, coding sprints, and research symposiums organized by IEEE CS MBITS.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#121316]/4 border border-[#121316]/8 rounded-md self-start md:self-end">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-[#121316] shadow-2xs'
                  : 'text-[#121316]/70 hover:text-[#121316]'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-white text-[#121316] shadow-2xs'
                  : 'text-[#121316]/70 hover:text-[#121316]'
              }`}
            >
              Upcoming / Active
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                activeTab === 'past'
                  ? 'bg-white text-[#121316] shadow-2xs'
                  : 'text-[#121316]/70 hover:text-[#121316]'
              }`}
            >
              Archive
            </button>
          </div>
        </div>

        {/* Timeline List View */}
        <div className="relative pl-4 sm:pl-6 space-y-6">
          <div className="absolute top-4 bottom-4 left-0 sm:left-2 w-0.5 bg-[#121316]/10" />

          {filteredEvents.map((ev) => {
            const isUpcoming = ev.timelineStatus !== 'past';
            const isSaved = savedEventIds.includes(ev.id);

            return (
              <div key={ev.id} className="relative group">
                <div
                  className={`absolute -left-4 sm:-left-6 top-5 w-4 h-4 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                    isUpcoming
                      ? 'bg-white border-[#00629B] ring-4 ring-[#00629B]/10'
                      : 'bg-[#FBFBFA] border-[#121316]/30'
                  }`}
                />

                <div
                  onClick={() => handleOpenDetail(ev)}
                  className="ml-3 sm:ml-4 p-5 sm:p-6 bg-[#FBFBFA] hover:bg-white rounded-lg border border-[#121316]/8 hover:border-[#00629B]/40 hover:shadow-2xs transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-[#121316]/60 flex-wrap">
                      <span className="font-semibold text-[#00629B]">{ev.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#121316]/50" />
                        {ev.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#121316]/50" />
                        {ev.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onToggleSaveEvent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaveEvent(ev.id);
                            sound.playPulse(720, 0.05);
                            onShowToast?.(
                              isSaved
                                ? `Removed ${ev.title} from agenda.`
                                : `Saved ${ev.title} to your agenda.`
                            );
                          }}
                          className={`p-1 rounded hover:bg-[#121316]/5 transition-colors ${
                            isSaved ? 'text-[#00629B]' : 'text-[#121316]/30 hover:text-[#121316]'
                          }`}
                          title={isSaved ? 'Remove from saved agenda' : 'Save to agenda'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      )}

                      <span
                        className={`text-xs font-semibold ${
                          ev.status === 'Registration Open'
                            ? 'text-emerald-700'
                            : ev.status === 'Upcoming'
                            ? 'text-[#00629B]'
                            : 'text-[#121316]/50'
                        }`}
                      >
                        {ev.status}
                      </span>
                      {ev.seatsRemaining && (
                        <span className="text-[11px] font-mono text-[#121316]/60">
                          ({ev.seatsRemaining} seats left)
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#121316] mb-2 group-hover:text-[#00629B] transition-colors">
                    {ev.title}
                  </h3>

                  <p className="text-sm text-[#121316]/75 mb-4 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#121316]/6">
                    <div className="flex items-center gap-4 text-xs text-[#121316]/70">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#00629B]" />
                        {ev.venue}
                      </span>
                      <span className="hidden md:flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#00629B]" />
                        {ev.speaker.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {ev.technologies.map((tech) => (
                        <span
                          key={tech}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTechnology?.(tech);
                            onRecordConnection?.(`Tech: ${tech}`);
                          }}
                          className="text-[11px] font-medium text-[#121316]/70 hover:text-[#00629B] px-1.5 py-0.5 rounded bg-white border border-[#121316]/10 hover:border-[#00629B]/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      <span className="text-xs font-semibold text-[#00629B] flex items-center gap-1 ml-2 group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Event Details & Calendar Sync */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/50 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-lg border border-[#121316]/12 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 p-1.5 text-[#121316]/60 hover:text-[#121316] rounded-md hover:bg-[#121316]/5 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#00629B] uppercase tracking-wider mb-1.5">
                  <span>{selectedEvent.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedEvent.status}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#121316] tracking-tight mb-2">
                  {selectedEvent.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#121316]/70 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00629B]" />
                    {selectedEvent.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00629B]" />
                    {selectedEvent.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00629B]" />
                    {selectedEvent.venue}
                  </span>
                </div>
              </div>

              {/* Quick Calendar Sync Toolbar */}
              <div className="mb-6 flex flex-wrap items-center gap-2 p-3 bg-[#FBFBFA] rounded-md border border-[#121316]/8 text-xs">
                <span className="text-[#121316]/60 font-medium">Calendar Integration:</span>
                <a
                  href={getGoogleCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#121316]/10 rounded hover:border-[#00629B]/40 hover:text-[#00629B] transition-colors"
                >
                  <Calendar className="w-3 h-3 text-[#00629B]" />
                  <span>Google Calendar</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>

                <button
                  onClick={() => handleDownloadSingleICS(selectedEvent)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#121316]/10 rounded hover:border-[#00629B]/40 hover:text-[#00629B] transition-colors"
                >
                  <Download className="w-3 h-3 text-[#00629B]" />
                  <span>Download .ics file</span>
                </button>
              </div>

              {/* Speaker Profile */}
              <div className="p-4 bg-[#FBFBFA] rounded-md border border-[#121316]/8 mb-6">
                <p className="text-[11px] font-mono uppercase text-[#121316]/50 mb-1">Presented By</p>
                <p className="text-sm font-bold text-[#121316]">{selectedEvent.speaker.name}</p>
                <p className="text-xs text-[#121316]/70">
                  {selectedEvent.speaker.role} — {selectedEvent.speaker.affiliation}
                </p>
              </div>

              <div className="space-y-5 text-sm text-[#121316]/80 mb-6">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316] mb-2">
                    Overview & Objectives
                  </h4>
                  <p className="leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316] mb-2">
                    What You Will Learn
                  </h4>
                  <ul className="space-y-1.5 pl-1">
                    {selectedEvent.whatYouWillLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316] mb-1">
                    Who Should Attend
                  </h4>
                  <p className="text-xs sm:text-sm text-[#121316]/70">{selectedEvent.whoShouldAttend}</p>
                </div>
              </div>

              {/* Interactive Registration Section */}
              {selectedEvent.timelineStatus !== 'past' ? (
                <div className="pt-6 border-t border-[#121316]/10">
                  {registrationSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-sm flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-semibold">Workstation Reservation Confirmed!</p>
                        <p className="text-xs text-emerald-700">
                          A confirmation checklist has been routed for {regForm.name} ({regForm.email}).
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-3">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316]">
                        Reserve Workshop Workstation
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#121316]/70 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Anandha Krishnan"
                            value={regForm.name}
                            onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-[#121316]/70 mb-1">
                            College / Institutional Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="student@mbits.edu.in"
                            value={regForm.email}
                            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] outline-hidden"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] rounded-md transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Confirm Workshop Registration</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="pt-4 border-t border-[#121316]/10 text-xs text-[#121316]/60">
                  This session has concluded. Course slides and sample code are archived in the Resources section.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
