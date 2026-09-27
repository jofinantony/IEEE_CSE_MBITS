import React, { useState } from 'react';
import { Users, Calendar, Cpu, Sparkles, Lightbulb, Compass, ArrowRight } from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  sublabel: string;
  targetId: string;
  icon: React.ElementType;
  x: number;
  y: number;
  connections: string[];
}

interface ConnectionNetworkGraphProps {
  onSelectNode: (targetId: string) => void;
}

export const ConnectionNetworkGraph: React.FC<ConnectionNetworkGraphProps> = ({ onSelectNode }) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const nodes: NetworkNode[] = [
    {
      id: 'events',
      label: 'EVENTS',
      sublabel: 'Upcoming opportunities & workshops',
      targetId: 'events',
      icon: Calendar,
      x: 220,
      y: 110,
      connections: ['projects', 'skills', 'people']
    },
    {
      id: 'projects',
      label: 'PROJECTS',
      sublabel: 'Student builds & research case studies',
      targetId: 'build-lab',
      icon: Cpu,
      x: 580,
      y: 110,
      connections: ['events', 'skills', 'ideas']
    },
    {
      id: 'people',
      label: 'PEOPLE',
      sublabel: 'Meet the mentors & student leads',
      targetId: 'people',
      icon: Users,
      x: 120,
      y: 280,
      connections: ['events', 'opportunities', 'skills']
    },
    {
      id: 'skills',
      label: 'SKILLS',
      sublabel: 'Learn something next on Tech Radar',
      targetId: 'tech-radar',
      icon: Compass,
      x: 400,
      y: 230,
      connections: ['events', 'projects', 'people', 'ideas', 'opportunities']
    },
    {
      id: 'ideas',
      label: 'IDEAS',
      sublabel: 'Explore research & technical curriculum',
      targetId: 'resources',
      icon: Lightbulb,
      x: 680,
      y: 280,
      connections: ['projects', 'skills', 'opportunities']
    },
    {
      id: 'opportunities',
      label: 'OPPORTUNITIES',
      sublabel: 'Competitions, awards & fellowships',
      targetId: 'achievements',
      icon: Sparkles,
      x: 400,
      y: 360,
      connections: ['people', 'skills', 'ideas', 'events']
    }
  ];

  // Helper to test if a line should be highlighted
  const isLineActive = (fromId: string, toId: string) => {
    if (!activeNodeId) return false;
    if (activeNodeId === fromId || activeNodeId === toId) return true;
    const activeNode = nodes.find((n) => n.id === activeNodeId);
    return activeNode ? activeNode.connections.includes(fromId) && activeNode.connections.includes(toId) : false;
  };

  const activeNode = nodes.find((n) => n.id === activeNodeId);

  return (
    <section id="network" className="py-20 border-b border-[#121316]/8 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
            01. Interactive Ecosystem Map
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-4">
            The Connection Network
          </h2>
          <p className="text-base text-[#121316]/70 leading-relaxed">
            Hover over any computational node to observe relationships in our community, or click directly to jump into that dimension.
          </p>
        </div>

        {/* Desktop Interactive SVG Canvas */}
        <div className="relative w-full bg-white rounded-lg border border-[#121316]/8 shadow-2xs p-4 sm:p-8 overflow-hidden">
          {/* Subtle grid backdrop */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#121316 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative w-full aspect-2/1 sm:aspect-16/7 max-h-[460px]">
            <svg
              className="w-full h-full select-none"
              viewBox="0 0 800 420"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection lines */}
              {nodes.map((node) =>
                node.connections.map((targetId) => {
                  const targetNode = nodes.find((n) => n.id === targetId);
                  if (!targetNode || targetNode.id < node.id) return null; // Avoid duplicate lines
                  const active = isLineActive(node.id, targetNode.id);

                  return (
                    <g key={`${node.id}-${targetNode.id}`}>
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke={active ? '#00629B' : '#121316'}
                        strokeWidth={active ? '2' : '1'}
                        strokeOpacity={active ? '0.75' : '0.12'}
                        strokeDasharray={active ? 'none' : '4 4'}
                        className="transition-all duration-300"
                      />
                      {active && (
                        <circle
                          r="3"
                          fill="#0284C7"
                          className="animate-ping"
                          cx={(node.x + targetNode.x) / 2}
                          cy={(node.y + targetNode.y) / 2}
                        />
                      )}
                    </g>
                  );
                })
              )}

              {/* Node circles and icons */}
              {nodes.map((node) => {
                const isHovered = activeNodeId === node.id;
                const isConnected = activeNode?.connections.includes(node.id);

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer group"
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onMouseLeave={() => setActiveNodeId(null)}
                    onClick={() => onSelectNode(node.targetId)}
                    transform={`translate(${node.x}, ${node.y})`}
                  >
                    {/* Pulsing ring on hover */}
                    {isHovered && (
                      <circle
                        r="34"
                        fill="none"
                        stroke="#00629B"
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Node Disc */}
                    <circle
                      r={isHovered ? '26' : isConnected ? '23' : '20'}
                      fill={isHovered ? '#00629B' : isConnected ? '#E6F0F6' : '#FFFFFF'}
                      stroke={isHovered ? '#004e7c' : isConnected ? '#00629B' : '#121316'}
                      strokeWidth={isHovered || isConnected ? '2' : '1.2'}
                      strokeOpacity={isHovered ? '1' : isConnected ? '0.8' : '0.2'}
                      className="transition-all duration-200"
                    />

                    {/* Node Text Label */}
                    <text
                      y={36}
                      textAnchor="middle"
                      className={`text-[11px] font-bold tracking-wider transition-colors select-none ${
                        isHovered ? 'fill-[#00629B]' : 'fill-[#121316]'
                      }`}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Contextual Active Node Information Reveal */}
          <div className="mt-4 pt-4 border-t border-[#121316]/6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00629B] animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-[#121316] uppercase tracking-wider">
                  {activeNode ? activeNode.label : 'Select or Hover a Node'}
                </p>
                <p className="text-xs text-[#121316]/65">
                  {activeNode ? activeNode.sublabel : 'Experience how people, technologies, and opportunities intersect.'}
                </p>
              </div>
            </div>

            {activeNode && (
              <button
                onClick={() => onSelectNode(activeNode.targetId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#00629B] hover:text-[#004e7c] bg-[#00629B]/8 hover:bg-[#00629B]/12 rounded-md transition-colors"
              >
                <span>Navigate to {activeNode.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Friendly Grid Fallback */}
        <div className="sm:hidden grid grid-cols-2 gap-2.5 mt-4">
          {nodes.map((node) => (
            <button
              key={node.id}
              onClick={() => onSelectNode(node.targetId)}
              className="p-3 text-left bg-white border border-[#121316]/8 rounded-md active:bg-[#00629B]/5"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00629B]" />
                <span className="text-xs font-bold text-[#121316]">{node.label}</span>
              </div>
              <p className="text-[11px] text-[#121316]/65 line-clamp-1">{node.sublabel}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
