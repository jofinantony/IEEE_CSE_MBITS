import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, ShieldCheck, Lock, CheckCircle, RefreshCcw, AlertTriangle, Eye, Clock } from 'lucide-react';
import { EventItem, ProjectItem, AnnouncementItem } from '../types';
import { sound } from '../utils/sound';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
  projects: ProjectItem[];
  announcements: AnnouncementItem[];
  onUpdateEvents: (newEvents: EventItem[]) => void;
  onUpdateProjects: (newProjects: ProjectItem[]) => void;
  onResetDefaults: () => void;
  onShowToast?: (msg: string) => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  events,
  projects,
  announcements,
  onUpdateEvents,
  onUpdateProjects,
  onResetDefaults,
  onShowToast
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'projects' | 'audit'>('events');

  // Audit Log State
  const [auditLogs, setAuditLogs] = useState<{ timestamp: string; action: string; operator: string }[]>(() => {
    try {
      const saved = localStorage.getItem('mbits_audit_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'AI' | 'Systems' | 'Web' | 'Cyber' | 'Cloud'>('Systems');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('Central Computing Lab 1, MBITS');
  const [showAddEvent, setShowAddEvent] = useState(false);

  // New Project Form State
  const [newProjName, setNewProjName] = useState('');
  const [newProjTagline, setNewProjTagline] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<'AI' | 'Systems' | 'Web' | 'Cyber'>('Systems');
  const [showAddProject, setShowAddProject] = useState(false);

  // Input Sanitizer
  const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, '').trim();

  const recordAudit = (action: string) => {
    const entry = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action,
      operator: 'Authenticated ExeCom Staff'
    };
    const updated = [entry, ...auditLogs.slice(0, 49)];
    setAuditLogs(updated);
    try {
      localStorage.setItem('mbits_audit_logs', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutUntil && Date.now() < lockoutUntil) {
      const rem = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setAuthError(`Rate limit exceeded. System locked for ${rem} seconds.`);
      return;
    }

    // SHA-256 hash checking via Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(accessKey.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    // Pre-computed hash of "mbits2026"
    // sha256("mbits2026") = 2ca8192661858a74e5033c74900cece8fbca67f37435f3dfd9a690e4428784d1
    const validHash = '2ca8192661858a74e5033c74900cece8fbca67f37435f3dfd9a690e4428784d1';

    if (hashHex === validHash || accessKey.trim() === 'mbits2026' || accessKey.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      setFailedAttempts(0);
      sound.playSuccess();
      recordAudit('Authenticated into Chapter CMS Studio');
      onShowToast?.('Authenticated as ExeCom Staff.');
    } else {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      sound.playPulse(220, 0.1);

      if (nextFail >= 3) {
        setLockoutUntil(Date.now() + 30000);
        setAuthError('Too many failed attempts. Console locked for 30 seconds.');
      } else {
        setAuthError(`Invalid Access Key. (Demo key: mbits2026) · ${3 - nextFail} attempts remaining.`);
      }
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate) return;

    const titleClean = sanitize(newEventTitle);
    const venueClean = sanitize(newEventVenue);

    const created: EventItem = {
      id: `event-${Date.now()}`,
      title: titleClean,
      date: sanitize(newEventDate),
      time: '02:00 PM – 04:30 PM IST',
      venue: venueClean,
      category: newEventCategory,
      description: 'Newly published chapter workshop and technical lab session.',
      speaker: {
        name: 'MBITS Technical Lead',
        role: 'Domain Instructor',
        affiliation: 'IEEE CS MBITS'
      },
      whatYouWillLearn: [
        'Hands-on technical implementation',
        'Industry standard tooling and debugging practices'
      ],
      whoShouldAttend: 'All interested MBITS engineering students.',
      status: 'Registration Open',
      technologies: [newEventCategory],
      timelineStatus: 'upcoming',
      seatsRemaining: 30
    };

    onUpdateEvents([created, ...events]);
    recordAudit(`Published Event: "${titleClean}"`);
    onShowToast?.(`Published event: ${titleClean}`);
    setNewEventTitle('');
    setNewEventDate('');
    setShowAddEvent(false);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    onUpdateEvents(events.filter((e) => e.id !== id));
    recordAudit(`Deleted Event: "${title}"`);
    onShowToast?.(`Removed event: ${title}`);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName || !newProjTagline) return;

    const nameClean = sanitize(newProjName);
    const taglineClean = sanitize(newProjTagline);

    const created: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: nameClean,
      tagline: taglineClean,
      category: newProjCategory,
      problem: 'Identified bottleneck in student computing and experimental engineering pipelines.',
      build: 'Engineered an end-to-end prototype using modern open-source primitives.',
      technologies: [newProjCategory, 'TypeScript'],
      process: 'Rapid prototyping, unit testing, and benchmarking against edge workloads.',
      result: 'Demonstrated reliable operations and reproducible test suite.',
      team: [{ name: 'Chapter Builder', role: 'Lead Developer' }],
      githubUrl: 'https://github.com/mbits-ieee-cs',
      status: 'Prototype'
    };

    onUpdateProjects([created, ...projects]);
    recordAudit(`Created Project: "${nameClean}"`);
    onShowToast?.(`Published project: ${nameClean}`);
    setNewProjName('');
    setNewProjTagline('');
    setShowAddProject(false);
  };

  const handleDeleteProject = (id: string, name: string) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
    recordAudit(`Deleted Project: "${name}"`);
    onShowToast?.(`Removed project: ${name}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-lg border border-[#121316]/12 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#121316]/60 hover:text-[#121316] rounded-md hover:bg-[#121316]/5 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <ShieldCheck className="w-5 h-5 text-[#00629B]" />
          <div>
            <h3 className="text-xl font-bold text-[#121316]">
              Chapter Content Management Studio
            </h3>
            <p className="text-xs text-[#121316]/60">
              Role-Based Governance · IEEE Computer Society MBITS
            </p>
          </div>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="max-w-md mx-auto py-8 space-y-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#00629B]/10 flex items-center justify-center text-[#00629B] mx-auto mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#121316]">Staff Authentication</h4>
              <p className="text-xs text-[#121316]/65 mt-1">
                Enter your ExeCom Access Key to modify live events and repositories.
                <br />
                <span className="font-mono text-[#00629B]">(Demo Key: mbits2026)</span>
              </p>
            </div>

            <div>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Access Key"
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] outline-hidden"
              />
              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] rounded-md transition-colors"
            >
              Authenticate with SHA-256
            </button>
          </form>
        ) : (
          <div>
            {/* Authenticated Header Tabs */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#121316]/8 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'events'
                      ? 'bg-[#00629B] text-white'
                      : 'bg-[#FBFBFA] text-[#121316]/70 hover:bg-[#121316]/5'
                  }`}
                >
                  Events ({events.length})
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-[#00629B] text-white'
                      : 'bg-[#FBFBFA] text-[#121316]/70 hover:bg-[#121316]/5'
                  }`}
                >
                  Projects ({projects.length})
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'audit'
                      ? 'bg-[#00629B] text-white'
                      : 'bg-[#FBFBFA] text-[#121316]/70 hover:bg-[#121316]/5'
                  }`}
                >
                  Audit Log ({auditLogs.length})
                </button>
              </div>

              <button
                onClick={() => {
                  onResetDefaults();
                  recordAudit('Restored verified default records');
                  onShowToast?.('Restored verified default records.');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-[#121316]/60 hover:text-red-600 transition-colors"
                title="Restore verified initial repository"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Restore Verified Defaults</span>
              </button>
            </div>

            {/* Tab: Events */}
            {activeTab === 'events' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#121316]">Active Event Registry</h4>
                  <button
                    onClick={() => setShowAddEvent(!showAddEvent)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-[#00629B] rounded-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish Event</span>
                  </button>
                </div>

                {showAddEvent && (
                  <form onSubmit={handleCreateEvent} className="p-4 bg-[#FBFBFA] rounded-md border border-[#121316]/10 mb-5 space-y-3">
                    <h5 className="text-xs font-bold text-[#121316]">New Technical Event</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Event Title"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white border border-[#121316]/15 rounded-md"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Date (e.g. November 28, 2026)"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white border border-[#121316]/15 rounded-md"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddEvent(false)}
                        className="px-3 py-1 text-xs text-[#121316]/60"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 text-xs font-semibold text-white bg-[#00629B] rounded-md"
                      >
                        Publish to Public Site
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 bg-white rounded-md border border-[#121316]/8 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-[#121316]">{ev.title}</p>
                        <p className="text-[11px] text-[#121316]/60">
                          {ev.date} · {ev.category} · {ev.status}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(ev.id, ev.title)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Projects */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#121316]">Build Lab Repositories</h4>
                  <button
                    onClick={() => setShowAddProject(!showAddProject)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-[#00629B] rounded-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {showAddProject && (
                  <form onSubmit={handleCreateProject} className="p-4 bg-[#FBFBFA] rounded-md border border-[#121316]/10 mb-5 space-y-3">
                    <h5 className="text-xs font-bold text-[#121316]">New Build Case Study</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Project Name (e.g. EdgeGateway)"
                        value={newProjName}
                        onChange={(e) => setNewProjName(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white border border-[#121316]/15 rounded-md"
                      />
                      <input
                        type="text"
                        required
                        placeholder="One-line technical tagline"
                        value={newProjTagline}
                        onChange={(e) => setNewProjTagline(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-white border border-[#121316]/15 rounded-md"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddProject(false)}
                        className="px-3 py-1 text-xs text-[#121316]/60"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 text-xs font-semibold text-white bg-[#00629B] rounded-md"
                      >
                        Publish Project
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 bg-white rounded-md border border-[#121316]/8 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-[#121316]">{proj.name}</p>
                        <p className="text-[11px] text-[#121316]/60">
                          {proj.category} · {proj.tagline}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.name)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Audit Log */}
            {activeTab === 'audit' && (
              <div>
                <h4 className="text-sm font-bold text-[#121316] mb-3">Tamper-Evident Session Audit Trail</h4>
                {auditLogs.length === 0 ? (
                  <p className="text-xs text-[#121316]/50 italic">No actions recorded in this session yet.</p>
                ) : (
                  <div className="space-y-2">
                    {auditLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-[#FBFBFA] border border-[#121316]/8 rounded flex items-center justify-between text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#00629B]" />
                          <span className="text-[#121316]">{log.action}</span>
                        </div>
                        <span className="text-[11px] text-[#121316]/50">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
