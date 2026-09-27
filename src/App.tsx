import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ConnectionNetworkGraph } from './components/ConnectionNetworkGraph';
import { IntentSelector } from './components/IntentSelector';
import { TechCompass } from './components/TechCompass';
import { EventTimeline } from './components/EventTimeline';
import { BuildLab } from './components/BuildLab';
import { TechRadar } from './components/TechRadar';
import { ExecomSection } from './components/ExecomSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { DiscoveryTrail } from './components/DiscoveryTrail';
import { AskCsMbits } from './components/AskCsMbits';
import { CommandSearch } from './components/CommandSearch';
import { AdminCMSModal } from './components/AdminCMSModal';
import { JoinModal } from './components/JoinModal';
import { MyAgendaDrawer } from './components/MyAgendaDrawer';
import { ShortcutsModal } from './components/ShortcutsModal';
import { SessionResumeBanner } from './components/SessionResumeBanner';
import { Toast, ToastMessage } from './components/Toast';
import { FinalSection } from './components/FinalSection';
import { CustomCursor } from './components/CustomCursor';
import { sound } from './utils/sound';

import {
  INITIAL_EVENTS,
  INITIAL_PROJECTS,
  INITIAL_EXECOM,
  INITIAL_ACHIEVEMENTS,
  INITIAL_RESOURCES,
  INITIAL_TECHNOLOGIES,
  INITIAL_ANNOUNCEMENTS
} from './data/content';
import { IntentMode, EventItem, ProjectItem } from './types';

export default function App() {
  // State for content with local storage or verified defaults
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem('mbits_events');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('mbits_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Bookmarked agenda items
  const [savedEventIds, setSavedEventIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mbits_saved_events');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mbits_saved_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Intent selector & active filter states
  const [currentIntent, setCurrentIntent] = useState<IntentMode>('all');
  const [activeTechFilter, setActiveTechFilter] = useState<string>('all');

  // Discovery trail state (managed in memory & sessionStorage)
  const [discoveryTrail, setDiscoveryTrail] = useState<string[]>([]);

  // Session Resume Prompt State
  const [resumeCandidate, setResumeCandidate] = useState<string[] | null>(null);

  // Check for existing session on initial load
  useEffect(() => {
    try {
      const storedSession = sessionStorage.getItem('mbits_session_trail');
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResumeCandidate(parsed);
        }
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  // Persist discovery trail to sessionStorage whenever it changes
  useEffect(() => {
    if (discoveryTrail.length > 0) {
      try {
        sessionStorage.setItem('mbits_session_trail', JSON.stringify(discoveryTrail));
      } catch {
        // Ignore
      }
    }
  }, [discoveryTrail]);

  const handleResumeSession = () => {
    if (resumeCandidate) {
      setDiscoveryTrail(resumeCandidate);
      sound.playSuccess();
      showToast(`Resumed discovery session with ${resumeCandidate.length} connections.`, 'success');
      setResumeCandidate(null);
      scrollToAnchor('network');
    }
  };

  const handleDiscardSession = () => {
    try {
      sessionStorage.removeItem('mbits_session_trail');
    } catch {
      // Ignore
    }
    setResumeCandidate(null);
    setDiscoveryTrail([]);
    showToast('Started a fresh discovery session.', 'info');
  };

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mbits_events', JSON.stringify(events));
    } catch {
      // Ignore
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('mbits_projects', JSON.stringify(projects));
    } catch {
      // Ignore
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('mbits_saved_events', JSON.stringify(savedEventIds));
    } catch {
      // Ignore
    }
  }, [savedEventIds]);

  useEffect(() => {
    try {
      localStorage.setItem('mbits_saved_projects', JSON.stringify(savedProjectIds));
    } catch {
      // Ignore
    }
  }, [savedProjectIds]);

  const toggleSaveEvent = (id: string) => {
    setSavedEventIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSaveProject = (id: string) => {
    setSavedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '?') {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        const active = sound.toggleSound();
        showToast(active ? 'Pulse audio enabled' : 'Pulse audio muted', 'info');
      } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAgendaOpen((prev) => !prev);
      } else if (e.key === '1') {
        scrollToAnchor('network');
      } else if (e.key === '2') {
        scrollToAnchor('events');
      } else if (e.key === '3') {
        scrollToAnchor('build-lab');
      } else if (e.key === '4') {
        scrollToAnchor('tech-radar');
      } else if (e.key === '5') {
        scrollToAnchor('people');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const recordConnection = (label: string) => {
    setDiscoveryTrail((prev) => {
      if (prev.includes(label)) return prev;
      return [...prev, label];
    });
  };

  const handleResetDefaults = () => {
    setEvents(INITIAL_EVENTS);
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.removeItem('mbits_events');
      localStorage.removeItem('mbits_projects');
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#121316] relative flex flex-col font-sans selection:bg-[#00629B]/15 selection:text-[#00629B]">
      {/* Precision subtle cursor (touch-safe) */}
      <CustomCursor />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Session Resume Prompt Banner */}
      {resumeCandidate && (
        <SessionResumeBanner
          previousTrail={resumeCandidate}
          onResume={handleResumeSession}
          onDiscard={handleDiscardSession}
          onDismiss={() => setResumeCandidate(null)}
        />
      )}

      {/* Top Bar Navigation */}
      <Navigation
        onOpenSearch={() => setSearchOpen(true)}
        onOpenJoin={() => setJoinOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenAgenda={() => setAgendaOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        savedCount={savedEventIds.length + savedProjectIds.length}
      />

      <main className="grow">
        {/* Hero Section */}
        <Hero
          onEnterNetwork={() => scrollToAnchor('network')}
          onExploreCompass={() => scrollToAnchor('tech-compass')}
        />

        {/* 01. The Connection Network (Interactive SVG Graph) */}
        <ConnectionNetworkGraph
          onSelectNode={(targetId) => scrollToAnchor(targetId)}
        />

        {/* 02. What Are You Here To Do? Intent Selector */}
        <IntentSelector
          currentIntent={currentIntent}
          onSelectIntent={(intent) => {
            setCurrentIntent(intent);
            recordConnection(`Intent: ${intent.toUpperCase()}`);
            if (intent === 'learn') scrollToAnchor('events');
            if (intent === 'build') scrollToAnchor('build-lab');
            if (intent === 'compete') scrollToAnchor('events');
            if (intent === 'connect') scrollToAnchor('people');
          }}
        />

        {/* 03. Tech Compass (Dynamic Pathway Synthesis) */}
        <TechCompass
          onNavigateItem={(anchorId) => scrollToAnchor(anchorId)}
          onRecordConnection={recordConnection}
        />

        {/* 04. Event Timeline (Past → Present → Upcoming with Google Cal & .ics) */}
        <EventTimeline
          events={events}
          selectedCategory={currentIntent === 'compete' ? 'Community' : activeTechFilter}
          savedEventIds={savedEventIds}
          onSelectTechnology={(tech) => {
            setActiveTechFilter(tech);
            scrollToAnchor('build-lab');
          }}
          onToggleSaveEvent={toggleSaveEvent}
          onRecordConnection={recordConnection}
          onShowToast={showToast}
        />

        {/* 05. Build Lab (Technical Case Studies with In-Page Sandboxes & Bookmarks) */}
        <BuildLab
          projects={projects}
          activeTechnologyFilter={activeTechFilter}
          savedProjectIds={savedProjectIds}
          onSelectTechnology={(tech) => {
            setActiveTechFilter(tech);
            recordConnection(`Tech Filter: ${tech}`);
          }}
          onToggleSaveProject={toggleSaveProject}
          onRecordConnection={recordConnection}
          onShowToast={showToast}
        />

        {/* 06. Tech Radar (Stack Architecture & Horizons) */}
        <TechRadar
          technologies={INITIAL_TECHNOLOGIES}
          onSelectTechnologyFilter={(techName) => {
            setActiveTechFilter(techName);
            scrollToAnchor('build-lab');
          }}
          onRecordConnection={recordConnection}
        />

        {/* 07. Leadership & People Behind the Community */}
        <ExecomSection
          members={INITIAL_EXECOM}
          onRecordConnection={recordConnection}
          onSelectProject={() => scrollToAnchor('build-lab')}
        />

        {/* 08. Verified Achievements & Regional Laurels */}
        <AchievementsSection
          achievements={INITIAL_ACHIEVEMENTS}
        />

        {/* 09. Open Technical Repository & Starter Kits */}
        <ResourcesSection
          resources={INITIAL_RESOURCES}
          onRecordConnection={recordConnection}
        />

        {/* 10. Ask IEEE CS MBITS (Grounded AI Discovery Layer) */}
        <AskCsMbits
          events={events}
          projects={projects}
          resources={INITIAL_RESOURCES}
          onNavigateSection={(sectionId) => scrollToAnchor(sectionId)}
          onRecordConnection={recordConnection}
        />

        {/* 11. Discovery Trail (Session Trajectory Engine) */}
        <DiscoveryTrail
          trail={discoveryTrail}
          onResetTrail={() => {
            setDiscoveryTrail([]);
            try {
              sessionStorage.removeItem('mbits_session_trail');
            } catch {
              // Ignore
            }
          }}
          onExploreEvents={() => scrollToAnchor('events')}
          onExploreProjects={() => scrollToAnchor('build-lab')}
          onOpenJoin={() => setJoinOpen(true)}
        />
      </main>

      {/* Convergence Final Section & Quiet Footer */}
      <FinalSection
        onExploreEvents={() => scrollToAnchor('events')}
        onExploreProjects={() => scrollToAnchor('build-lab')}
        onOpenJoin={() => setJoinOpen(true)}
      />

      {/* Command Search Modal (⌘K) */}
      <CommandSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        events={events}
        projects={projects}
        people={INITIAL_EXECOM}
        resources={INITIAL_RESOURCES}
        achievements={INITIAL_ACHIEVEMENTS}
        onSelectResult={(targetAnchor, itemTitle) => {
          scrollToAnchor(targetAnchor);
          if (itemTitle) recordConnection(`Searched: ${itemTitle}`);
        }}
      />

      {/* Chapter Admin Studio Modal */}
      <AdminCMSModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        events={events}
        projects={projects}
        announcements={INITIAL_ANNOUNCEMENTS}
        onUpdateEvents={setEvents}
        onUpdateProjects={setProjects}
        onResetDefaults={handleResetDefaults}
        onShowToast={showToast}
      />

      {/* Join Chapter Onboarding Modal */}
      <JoinModal
        isOpen={joinOpen}
        onClose={() => setJoinOpen(false)}
        onRecordConnection={recordConnection}
      />

      {/* Personal Agenda & Calendar Export Drawer */}
      <MyAgendaDrawer
        isOpen={agendaOpen}
        onClose={() => setAgendaOpen(false)}
        savedEventIds={savedEventIds}
        savedProjectIds={savedProjectIds}
        allEvents={events}
        allProjects={projects}
        trajectory={discoveryTrail}
        onToggleSaveEvent={toggleSaveEvent}
        onToggleSaveProject={toggleSaveProject}
        onShowToast={showToast}
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
}
