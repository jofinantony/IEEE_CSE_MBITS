import React, { useState } from 'react';
import { X, Check, ArrowRight, ExternalLink, ShieldCheck, Mail } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordConnection?: (label: string) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, onRecordConnection }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    departmentYear: 'B.Tech CSE - 2nd Year',
    interests: 'Systems & Distributed Computing',
    hasIeeeId: 'No'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onRecordConnection?.('Submitted Chapter Membership Application');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-lg border border-[#121316]/12 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#121316]/60 hover:text-[#121316] rounded-md hover:bg-[#121316]/5 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase font-mono tracking-wider text-[#00629B] font-semibold">
            Onboarding 2026
          </span>
          <h3 className="text-2xl font-bold text-[#121316] tracking-tight mt-1 mb-2">
            Join IEEE Computer Society MBITS
          </h3>
          <p className="text-xs sm:text-sm text-[#121316]/70 leading-relaxed">
            Become an active member of Mar Baselios Institute of Technology and Science's premier student computing society.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-900 text-sm space-y-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-700" />
              <p className="font-bold">Application Received!</p>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Thank you, {formData.name}. Our Secretary Eldho P. Joy and the membership onboarding team will contact you via {formData.email} with your Discord community invite and lab orientation schedule.
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
            >
              Back to Network
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#121316]/75 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alen Paul"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121316]/75 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@mbits.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#121316]/75 mb-1">
                  Department & Year
                </label>
                <select
                  value={formData.departmentYear}
                  onChange={(e) => setFormData({ ...formData, departmentYear: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] outline-hidden"
                >
                  <option value="B.Tech CSE - 1st Year">B.Tech CSE - 1st Year</option>
                  <option value="B.Tech CSE - 2nd Year">B.Tech CSE - 2nd Year</option>
                  <option value="B.Tech CSE - 3rd Year">B.Tech CSE - 3rd Year</option>
                  <option value="B.Tech CSE - 4th Year">B.Tech CSE - 4th Year</option>
                  <option value="B.Tech Other Dept">B.Tech (ECE/EEE/AI/Other)</option>
                  <option value="Graduate / Faculty">Graduate Researcher / Faculty</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121316]/75 mb-1">
                  Primary Technical Interest
                </label>
                <select
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] outline-hidden"
                >
                  <option value="AI & Deep Learning">AI & Deep Learning</option>
                  <option value="Systems & Distributed Computing">Systems & Distributed Computing</option>
                  <option value="Cybersecurity & Security Audits">Cybersecurity & Reverse Engineering</option>
                  <option value="Web & Full-Stack Systems">Web & Full-Stack Systems</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="IoT & Edge Hardware">IoT & Edge Hardware</option>
                </select>
              </div>
            </div>

            {/* Membership Perks */}
            <div className="p-3 bg-[#FBFBFA] rounded-md border border-[#121316]/6 space-y-1.5 text-xs text-[#121316]/70">
              <p className="font-semibold text-[#121316]">Member Privileges:</p>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#00629B]" />
                <span>Priority reservation in Build Lab workstations & cluster access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#00629B]" />
                <span>Complimentary registration to flagship symposium Pulse 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#00629B]" />
                <span>Direct mentorship for SIH and IEEE Xplore publication</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] rounded-md transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Submit Membership Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="mt-5 pt-4 border-t border-[#121316]/8 flex items-center justify-between text-xs text-[#121316]/60">
          <span>Official IEEE Student Membership</span>
          <a
            href="https://www.ieee.org/membership/join/index.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#00629B] hover:underline"
          >
            <span>IEEE.org Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
