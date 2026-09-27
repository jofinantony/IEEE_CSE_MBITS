import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight, ShieldCheck, Volume2, VolumeX, Bookmark, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavigationProps {
  onOpenSearch: () => void;
  onOpenJoin: () => void;
  onOpenAdmin: () => void;
  onOpenAgenda: () => void;
  onOpenShortcuts: () => void;
  savedCount: number;
  isAdminLoggedIn?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenSearch,
  onOpenJoin,
  onOpenAdmin,
  onOpenAgenda,
  onOpenShortcuts,
  savedCount,
  isAdminLoggedIn
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = sound.toggleSound();
    setSoundEnabled(active);
  };

  const navLinks = [
    { label: 'Explore', href: '#network' },
    { label: 'Events', href: '#events' },
    { label: 'Build', href: '#build-lab' },
    { label: 'Radar', href: '#tech-radar' },
    { label: 'People', href: '#people' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Resources', href: '#resources' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#FBFBFA]/90 backdrop-blur-md border-[#121316]/10 py-3 shadow-xs'
          : 'bg-[#FBFBFA] border-[#121316]/6 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-[#121316] hover:text-[#00629B] transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#00629B] inline-block animate-pulse" />
          <span>IEEE CS MBITS</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#121316]/70">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#121316] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#00629B] decoration-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions & productivity tools */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Audio Feedback Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-md border text-xs transition-colors ${
              soundEnabled
                ? 'bg-[#00629B]/10 border-[#00629B]/30 text-[#00629B]'
                : 'bg-transparent border-[#121316]/10 text-[#121316]/50 hover:text-[#121316]'
            }`}
            title={soundEnabled ? 'Mute Interaction Audio' : 'Enable Digital Pulse Audio'}
            aria-label="Toggle audio feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Agenda / Saved Drawer Trigger */}
          <button
            onClick={onOpenAgenda}
            className="relative p-1.5 rounded-md border border-[#121316]/10 text-[#121316]/70 hover:text-[#00629B] transition-colors"
            title="My Agenda & Saved Items"
            aria-label="Open agenda drawer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00629B] text-white text-[9px] font-mono flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#121316]/75 bg-[#121316]/4 hover:bg-[#121316]/8 border border-[#121316]/10 rounded-md transition-colors whitespace-nowrap"
            aria-label="Open search dialog"
          >
            <Search className="w-3.5 h-3.5 text-[#00629B]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono text-[#121316]/50 bg-white/70 px-1 py-0.2 rounded border border-[#121316]/10">
              ⌘K
            </kbd>
          </button>

          {/* Admin shortcut */}
          <button
            onClick={onOpenAdmin}
            className="hidden md:flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-[#121316]/70 hover:text-[#00629B] transition-colors"
            title="Chapter Admin Studio"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAdminLoggedIn ? 'Admin Panel' : 'Staff'}</span>
          </button>

          {/* Keyboard shortcuts */}
          <button
            onClick={onOpenShortcuts}
            className="hidden md:flex p-1.5 text-[#121316]/40 hover:text-[#121316]"
            title="Keyboard Shortcuts (?)"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* Primary Join Action */}
          <button
            onClick={onOpenJoin}
            className="primary-magnetic-btn flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] active:bg-[#003d61] rounded-md shadow-xs transition-all whitespace-nowrap"
          >
            <span>Join</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#121316]/75 hover:text-[#121316] rounded-md focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#121316]/10 bg-[#FBFBFA] px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#121316]/80 hover:text-[#00629B] hover:bg-[#121316]/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#121316]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgenda();
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[#121316]/80 bg-[#121316]/5 rounded-md"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#00629B]" />
                My Chapter Agenda
              </span>
              <span className="text-xs font-mono font-bold text-[#00629B]">{savedCount}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-[#121316]/80 bg-[#121316]/5 rounded-md"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#00629B]" />
                Command Search
              </span>
              <kbd className="text-xs font-mono text-[#121316]/50">⌘K</kbd>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-[#121316]/80 hover:bg-[#121316]/5 rounded-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#00629B]" />
              Chapter Admin Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
