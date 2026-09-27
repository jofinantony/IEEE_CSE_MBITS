import React from 'react';
import { X, Command } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '⌘ K / Ctrl+K', description: 'Open Universal Command Search' },
    { key: 'M', description: 'Toggle Digital Pulse Audio Feedback' },
    { key: 'A', description: 'Open My Chapter Agenda & Bookmarks' },
    { key: '1', description: 'Jump to Connection Network' },
    { key: '2', description: 'Jump to Event Timeline' },
    { key: '3', description: 'Jump to Build Lab' },
    { key: '4', description: 'Jump to Tech Radar' },
    { key: '5', description: 'Jump to ExeCom & People' },
    { key: 'ESC', description: 'Close active dialog or drawer' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/50 backdrop-blur-2xs animate-fade-in">
      <div className="bg-white rounded-lg border border-[#121316]/12 shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#121316]/60 hover:text-[#121316] rounded-md hover:bg-[#121316]/5"
          aria-label="Close shortcuts dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Command className="w-4 h-4 text-[#00629B]" />
          <h3 className="text-base font-bold text-[#121316]">Keyboard Navigation</h3>
        </div>

        <div className="space-y-2 text-xs">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded bg-[#FBFBFA] border border-[#121316]/6"
            >
              <span className="text-[#121316]/75">{sc.description}</span>
              <kbd className="font-mono text-[11px] font-semibold text-[#00629B] bg-white px-2 py-0.5 rounded border border-[#121316]/10 shadow-2xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <p className="mt-4 pt-3 border-t border-[#121316]/8 text-[11px] text-[#121316]/50 text-center">
          Designed for speed, accessibility, and terminal keyboard fluency.
        </p>
      </div>
    </div>
  );
};
