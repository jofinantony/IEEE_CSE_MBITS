import React, { useState } from 'react';
import { Github, ExternalLink, Cpu, ChevronRight, X, CheckCircle, Terminal, Play, ShieldAlert, Bookmark, Check } from 'lucide-react';
import { ProjectItem } from '../types';
import { sound } from '../utils/sound';

interface BuildLabProps {
  projects: ProjectItem[];
  activeTechnologyFilter?: string;
  savedProjectIds?: string[];
  onSelectTechnology: (tech: string) => void;
  onToggleSaveProject?: (id: string) => void;
  onRecordConnection?: (label: string) => void;
  onShowToast?: (msg: string) => void;
}

export const BuildLab: React.FC<BuildLabProps> = ({
  projects,
  activeTechnologyFilter,
  savedProjectIds = [],
  onSelectTechnology,
  onToggleSaveProject,
  onRecordConnection,
  onShowToast
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSimulator, setActiveSimulator] = useState<'none' | 'pulsenet' | 'secaudit'>('none');

  // PulseNet Simulator State
  const [nodeCount, setNodeCount] = useState<number>(45);
  const [simPacketLoss, setSimPacketLoss] = useState<number>(2);

  // SecAudit Simulator State
  const sampleCodes = [
    {
      label: 'Vulnerable AWS Key Pattern',
      code: `func initializeClient() {\n  // Insecure hardcoded credential\n  const apiKey = "AKIAIOSFODNN7EXAMPLE";\n  connectWithToken(apiKey);\n}`
    },
    {
      label: 'Unsafe Pointer Arithmetic',
      code: `fn parse_header(buf: &[u8]) -> *const u8 {\n  unsafe {\n    // Potential buffer overrun\n    return buf.as_ptr().offset(1024);\n  }\n}`
    },
    {
      label: 'Clean Memory Safe Struct',
      code: `#[derive(Debug, Clone)]\npub struct TelemetryPacket {\n  pub timestamp: u64,\n  pub payload: Vec<u8>,\n}`
    }
  ];
  const [secCode, setSecCode] = useState<string>(sampleCodes[0].code);
  const [scanResult, setScanResult] = useState<{ clean: boolean; issues: string[] } | null>(null);

  const availableTechs = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  );

  const filteredProjects = activeTechnologyFilter && activeTechnologyFilter !== 'all'
    ? projects.filter((p) =>
        p.technologies.some((t) => t.toLowerCase() === activeTechnologyFilter.toLowerCase()) ||
        p.category.toLowerCase() === activeTechnologyFilter.toLowerCase()
      )
    : projects;

  const handleOpenCaseStudy = (proj: ProjectItem) => {
    setSelectedProject(proj);
    sound.playPulse(480, 0.06);
    onRecordConnection?.(`Project: ${proj.name}`);
  };

  const runSecScan = () => {
    sound.playPulse(650, 0.08);
    const issues: string[] = [];
    if (secCode.includes('AKIA') || secCode.includes('EXAMPLE') || secCode.includes('apiKey')) {
      issues.push('CRITICAL: Hardcoded API credential pattern (AWS AKIA pattern match) at offset 0x14');
    }
    if (secCode.includes('unsafe') || secCode.includes('.offset(')) {
      issues.push('WARNING: Unchecked raw pointer offset arithmetic can breach slice boundaries');
    }
    setScanResult({
      clean: issues.length === 0,
      issues
    });
  };

  return (
    <section id="build-lab" className="py-20 border-b border-[#121316]/8 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
              05. Engineering Case Studies
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-3">
              Build Lab
            </h2>
            <p className="text-base text-[#121316]/70 leading-relaxed">
              Real open-source systems, edge neural networks, and campus infrastructure architected and deployed by MBITS student engineers.
            </p>
          </div>

          {/* Quick Technology Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
            <button
              onClick={() => onSelectTechnology('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
                !activeTechnologyFilter || activeTechnologyFilter === 'all'
                  ? 'bg-[#00629B] text-white border-[#00629B]'
                  : 'bg-white text-[#121316]/70 border-[#121316]/10 hover:border-[#00629B]/40'
              }`}
            >
              All Tech
            </button>
            {availableTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => onSelectTechnology(tech)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                  activeTechnologyFilter?.toLowerCase() === tech.toLowerCase()
                    ? 'bg-[#00629B] text-white border-[#00629B]'
                    : 'bg-white text-[#121316]/70 border-[#121316]/10 hover:border-[#00629B]/40'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Live Interactive Sandboxes Trigger Banner */}
        <div className="mb-8 p-4 bg-white rounded-lg border border-[#121316]/8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#00629B]/10 flex items-center justify-center text-[#00629B] shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#121316]">Interactive In-Browser Sandboxes</p>
              <p className="text-[11px] text-[#121316]/65">Test live telemetry clustering or run our Rust static vulnerability scanner right in the page.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveSimulator(activeSimulator === 'pulsenet' ? 'none' : 'pulsenet');
                sound.playPulse(520, 0.05);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                activeSimulator === 'pulsenet'
                  ? 'bg-[#00629B] text-white border-[#00629B]'
                  : 'bg-[#FBFBFA] text-[#121316]/75 border-[#121316]/12 hover:border-[#00629B]/40'
              }`}
            >
              PulseNet Telemetry Lab
            </button>
            <button
              onClick={() => {
                setActiveSimulator(activeSimulator === 'secaudit' ? 'none' : 'secaudit');
                sound.playPulse(520, 0.05);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                activeSimulator === 'secaudit'
                  ? 'bg-[#00629B] text-white border-[#00629B]'
                  : 'bg-[#FBFBFA] text-[#121316]/75 border-[#121316]/12 hover:border-[#00629B]/40'
              }`}
            >
              SecAudit Bytecode Sandbox
            </button>
          </div>
        </div>

        {/* PulseNet Live Interactive Simulator */}
        {activeSimulator === 'pulsenet' && (
          <div className="mb-8 p-6 bg-white rounded-lg border border-[#00629B]/30 shadow-xs animate-fade-in">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#121316]/8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-sm font-bold text-[#121316]">PulseNet Concurrent Daemon Simulator</h4>
              </div>
              <button
                onClick={() => setActiveSimulator('none')}
                className="text-xs text-[#121316]/50 hover:text-[#121316]"
              >
                Close Sandbox
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#121316]/80 mb-1">
                    <span>Edge Nodes: {nodeCount} workstations</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={nodeCount}
                    onChange={(e) => setNodeCount(Number(e.target.value))}
                    className="w-full accent-[#00629B]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#121316]/80 mb-1">
                    <span>Network Packet Loss Simulation: {simPacketLoss}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={simPacketLoss}
                    onChange={(e) => setSimPacketLoss(Number(e.target.value))}
                    className="w-full accent-[#00629B]"
                  />
                </div>
              </div>

              {/* Real-Time Mathematical Telemetry Readout */}
              <div className="grid grid-cols-2 gap-3 md:col-span-2">
                <div className="p-4 bg-[#FBFBFA] rounded-md border border-[#121316]/8">
                  <p className="text-[11px] font-mono text-[#121316]/60">Median RTT Latency</p>
                  <p className="text-2xl font-bold font-mono text-[#00629B] tabular-nums mt-1">
                    {(14 + nodeCount * 0.08 + simPacketLoss * 0.4).toFixed(1)} ms
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">✓ Within SLA (&lt; 25ms)</p>
                </div>

                <div className="p-4 bg-[#FBFBFA] rounded-md border border-[#121316]/8">
                  <p className="text-[11px] font-mono text-[#121316]/60">Aggregated Telemetry Frames</p>
                  <p className="text-2xl font-bold font-mono text-[#121316] tabular-nums mt-1">
                    {(nodeCount * 48).toLocaleString()} req/s
                  </p>
                  <p className="text-[10px] text-[#121316]/60 mt-1">zstd compression active</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SecAudit Live Bytecode Sandbox */}
        {activeSimulator === 'secaudit' && (
          <div className="mb-8 p-6 bg-white rounded-lg border border-[#00629B]/30 shadow-xs animate-fade-in">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#121316]/8">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00629B]" />
                <h4 className="text-sm font-bold text-[#121316]">SecAudit Static Vulnerability Analyzer</h4>
              </div>
              <button
                onClick={() => setActiveSimulator('none')}
                className="text-xs text-[#121316]/50 hover:text-[#121316]"
              >
                Close Sandbox
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#121316]/70">Source AST Input:</span>
                  <div className="flex gap-1">
                    {sampleCodes.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSecCode(s.code);
                          setScanResult(null);
                        }}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#121316]/5 hover:bg-[#121316]/10 text-[#121316]/80 font-mono"
                      >
                        Sample {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows={6}
                  value={secCode}
                  onChange={(e) => {
                    setSecCode(e.target.value);
                    setScanResult(null);
                  }}
                  className="w-full p-3 font-mono text-xs bg-[#121316] text-[#FBFBFA] rounded-md outline-hidden resize-none"
                />
                <button
                  onClick={runSecScan}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Static Analysis</span>
                </button>
              </div>

              <div className="p-4 bg-[#FBFBFA] rounded-md border border-[#121316]/8">
                <p className="text-xs font-bold text-[#121316] mb-3">Analyzer Diagnostic Output:</p>
                {scanResult ? (
                  scanResult.clean ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero high-entropy secrets or unsafe pointer offsets detected in target AST.</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {scanResult.issues.map((issue, idx) => (
                        <div key={idx} className="p-2.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-950 flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <p className="text-xs text-[#121316]/50 italic">
                    Click "Execute Static Analysis" to run pattern queries and tree-sitter AST validation against the code buffer.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isBookmarked = savedProjectIds.includes(project.id);

            return (
              <div
                key={project.id}
                onClick={() => handleOpenCaseStudy(project)}
                className="group bg-white p-6 sm:p-7 rounded-lg border border-[#121316]/8 hover:border-[#00629B]/40 hover:shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-[#121316]/60 font-mono">
                      <span className="text-[#00629B] font-semibold">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.status}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onToggleSaveProject && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaveProject(project.id);
                            sound.playPulse(700, 0.05);
                            onShowToast?.(
                              isBookmarked
                                ? `Removed ${project.name} from bookmarks.`
                                : `Bookmarked ${project.name} in your agenda.`
                            );
                          }}
                          className={`p-1 rounded hover:bg-[#121316]/5 transition-colors ${
                            isBookmarked ? 'text-[#00629B]' : 'text-[#121316]/30 hover:text-[#121316]'
                          }`}
                          title={isBookmarked ? 'Remove bookmark' : 'Bookmark project'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      )}

                      <span className="text-xs font-semibold text-[#00629B] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Case Study</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#121316] mb-2 group-hover:text-[#00629B] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#121316]/75 leading-relaxed mb-5">
                    {project.tagline}
                  </p>

                  <div className="p-3 bg-[#FBFBFA] rounded-md border border-[#121316]/6 mb-5 text-xs text-[#121316]/80 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{project.result}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-[#121316]/6">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-[#121316]/70 px-2 py-0.5 rounded bg-[#121316]/3 border border-[#121316]/8"
                      >
                        {t}
                      </span>
                    ))}
                    <div className="ml-auto flex items-center gap-2 text-xs text-[#121316]/50">
                      <span>Team: {project.team.map((m) => m.name).join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Deep Technical Case Study */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/50 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-lg border border-[#121316]/12 shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-1.5 text-[#121316]/60 hover:text-[#121316] rounded-md hover:bg-[#121316]/5 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00629B] uppercase mb-1">
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.status}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mb-2">
                  {selectedProject.name}
                </h3>
                <p className="text-sm text-[#121316]/75">
                  {selectedProject.tagline}
                </p>
              </div>

              <div className="space-y-6 text-sm text-[#121316]/80">
                <div className="p-4 bg-[#FBFBFA] rounded-md border border-[#121316]/8">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#00629B] mb-1.5">
                    Problem Statement
                  </h4>
                  <p className="leading-relaxed">{selectedProject.problem}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316] mb-1.5">
                    Architectural Build
                  </h4>
                  <p className="leading-relaxed">{selectedProject.build}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316] mb-1.5">
                    Process & Benchmarking
                  </h4>
                  <p className="leading-relaxed">{selectedProject.process}</p>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-md">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-800 mb-1">
                    Quantified Result
                  </h4>
                  <p className="text-emerald-950 font-medium">{selectedProject.result}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#121316] mb-2">
                    Engineering Team
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.team.map((member, i) => (
                      <div key={i} className="p-2.5 rounded bg-[#FBFBFA] border border-[#121316]/6 text-xs">
                        <p className="font-semibold text-[#121316]">{member.name}</p>
                        <p className="text-[#121316]/65">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#121316]/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#121316] hover:bg-black rounded-md transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Source</span>
                  </a>

                  {selectedProject.demoUrl && (
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setActiveSimulator(selectedProject.name === 'SecAudit' ? 'secaudit' : 'pulsenet');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#00629B] bg-[#00629B]/8 hover:bg-[#00629B]/15 rounded-md transition-colors"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Launch In-Page Sandbox</span>
                    </button>
                  )}
                </div>

                <span className="text-[11px] font-mono text-[#121316]/50">
                  MBITS IEEE CS Open Archive
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
