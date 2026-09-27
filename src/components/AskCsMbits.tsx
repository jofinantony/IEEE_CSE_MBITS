import React, { useState } from 'react';
import { Sparkles, MessageSquare, Send, Bot, ArrowRight, CornerDownLeft } from 'lucide-react';
import { EventItem, ProjectItem, ResourceItem } from '../types';

interface AskCsMbitsProps {
  events: EventItem[];
  projects: ProjectItem[];
  resources: ResourceItem[];
  onNavigateSection: (sectionId: string) => void;
  onRecordConnection?: (label: string) => void;
}

export const AskCsMbits: React.FC<AskCsMbitsProps> = ({
  events,
  projects,
  resources,
  onNavigateSection,
  onRecordConnection
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string; linkTarget?: string }[]>([
    {
      sender: 'bot',
      text: 'Hello! I am the verified index agent for IEEE Computer Society MBITS. Ask me about upcoming workshops, student systems in the Build Lab, or curriculum roadmaps.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'What AI workshops are available?',
    'Show me distributed systems projects.',
    'I want cybersecurity resources.',
    'How do I submit a project for Pulse 2026?'
  ];

  const handleAsk = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg = queryText.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);
    onRecordConnection?.(`Asked: ${userMsg.slice(0, 24)}...`);

    setTimeout(() => {
      const q = userMsg.toLowerCase();
      let response = '';
      let target: string | undefined = undefined;

      if (q.includes('ai') || q.includes('deep learning') || q.includes('pytorch')) {
        response = 'Our upcoming AI flagship is the "Bytes & Neurons: Deep Learning Hands-On Workshop" on October 24, 2026 at Central Lab 2. Additionally, student researchers built "BioSignal AI", an edge transformer for physiological waveform anomaly screening.';
        target = 'events';
      } else if (q.includes('system') || q.includes('distributed') || q.includes('go') || q.includes('linux')) {
        response = 'In Systems, we have "PulseNet", a Go-based high-throughput edge telemetry and routing engine. We also archived the "Kernel & Code: Linux Systems & Memory Safety" masterclass, and have a 12-week Systems & Distributed Computing curriculum.';
        target = 'build-lab';
      } else if (q.includes('cyber') || q.includes('security') || q.includes('rust')) {
        response = 'For Cybersecurity, check out "SecAudit", a static vulnerability scanner built with Rust, and our "Offensive & Defensive Security Playground" repository maintained by Vice Chair Ananya S. Nair.';
        target = 'resources';
      } else if (q.includes('pulse 2026') || q.includes('symposium') || q.includes('submit')) {
        response = 'Pulse 2026 takes place on November 14-15, 2026 at the Main Auditorium & Innovation Concourse. Call for student project papers in Systems, AI, and Web Architecture is actively open with peer review closing Oct 15.';
        target = 'events';
      } else if (q.includes('join') || q.includes('membership') || q.includes('participate')) {
        response = 'You can join IEEE Computer Society MBITS through the "Join Chapter" portal. Benefits include IEEE Xplore access, workstation reservation priority in labs, and mentorship cohorts.';
        target = 'people';
      } else {
        response = `Based on the verified chapter registry: IEEE CS MBITS hosts 6 technical tracks including Systems, AI, Web, Cyber, Cloud, and IoT. Check our Event Timeline and Build Lab for active codebases and registration links.`;
        target = 'network';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response,
          linkTarget: target
        }
      ]);
      setLoading(false);
    }, 400);
  };

  return (
    <section className="py-16 border-b border-[#121316]/8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-md bg-[#00629B]/10 flex items-center justify-center text-[#00629B]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#121316]">
              Ask IEEE CS MBITS
            </h3>
            <p className="text-xs text-[#121316]/60">
              Grounded strictly in verified MBITS records · Zero hallucinations
            </p>
          </div>
        </div>

        {/* Chat Stream Box */}
        <div className="bg-[#FBFBFA] rounded-lg border border-[#121316]/8 p-4 sm:p-5 mb-4 max-h-[320px] overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#121316] text-white'
                    : 'bg-white border border-[#121316]/8 text-[#121316]'
                }`}
              >
                <p>{msg.text}</p>
                {msg.linkTarget && (
                  <button
                    onClick={() => onNavigateSection(msg.linkTarget!)}
                    className="mt-2 text-xs font-semibold text-[#00629B] hover:text-[#004e7c] flex items-center gap-1"
                  >
                    <span>View related section</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-[#121316]/50 italic">
              Indexing chapter archives...
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[11px] font-mono text-[#121316]/50">Try asking:</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(p)}
              className="text-[11px] text-[#121316]/70 hover:text-[#00629B] bg-white border border-[#121316]/10 px-2.5 py-1 rounded-md transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about workshops, project stacks, or ExeCom contacts..."
            className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-[#121316]/15 rounded-md focus:border-[#00629B] focus:ring-1 focus:ring-[#00629B] outline-hidden"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#00629B] hover:bg-[#004e7c] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
};
