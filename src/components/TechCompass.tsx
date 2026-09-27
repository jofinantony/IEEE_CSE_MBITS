import React, { useState } from 'react';
import { Compass, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { TechnologyCategory } from '../types';
import { INITIAL_EVENTS, INITIAL_PROJECTS, INITIAL_RESOURCES, INITIAL_ACHIEVEMENTS } from '../data/content';

type ActionIntent = 'Learn' | 'Build' | 'Compete' | 'Research' | 'Lead';

interface PathStep {
  type: 'Skill' | 'Workshop' | 'Build' | 'Competition' | 'Recognition';
  title: string;
  detail: string;
  targetAnchor?: string;
}

interface TechCompassProps {
  onNavigateItem?: (anchorId: string) => void;
  onRecordConnection?: (label: string) => void;
}

export const TechCompass: React.FC<TechCompassProps> = ({ onNavigateItem, onRecordConnection }) => {
  const [selectedInterest, setSelectedInterest] = useState<TechnologyCategory>('AI');
  const [selectedAction, setSelectedAction] = useState<ActionIntent>('Learn');

  const interests: TechnologyCategory[] = [
    'AI',
    'Systems',
    'Web',
    'Cyber',
    'Cloud',
    'IoT',
    'Data'
  ];

  const actions: ActionIntent[] = [
    'Learn',
    'Build',
    'Compete',
    'Research',
    'Lead'
  ];

  // Derive dynamic authentic pathway based on real content
  const generatePath = (): PathStep[] => {
    const steps: PathStep[] = [];

    // Step 1: Fundamental Tech
    steps.push({
      type: 'Skill',
      title: `${selectedInterest} Core Architecture`,
      detail: `Establish foundational fluency in modern ${selectedInterest.toLowerCase()} tools and mathematical principles.`
    });

    // Step 2: Real Workshop / Event
    const relevantEvent = INITIAL_EVENTS.find((e) =>
      e.technologies.some((t) => t.toLowerCase().includes(selectedInterest.toLowerCase())) ||
      e.category === selectedInterest
    ) || INITIAL_EVENTS[0];

    steps.push({
      type: 'Workshop',
      title: relevantEvent.title,
      detail: `${relevantEvent.date} · ${relevantEvent.venue}`,
      targetAnchor: 'events'
    });

    // Step 3: Real Build Project
    const relevantProject = INITIAL_PROJECTS.find((p) =>
      p.category === selectedInterest ||
      p.technologies.some((t) => t.toLowerCase().includes(selectedInterest.toLowerCase()))
    ) || INITIAL_PROJECTS[0];

    steps.push({
      type: 'Build',
      title: `${relevantProject.name} Case Study`,
      detail: relevantProject.tagline,
      targetAnchor: 'build-lab'
    });

    // Step 4: Real Opportunity based on selected action
    if (selectedAction === 'Compete') {
      steps.push({
        type: 'Competition',
        title: 'HackPulse MBITS 24h Sprint',
        detail: 'Build an end-to-end prototype with IEEE technical mentors.',
        targetAnchor: 'events'
      });
    } else if (selectedAction === 'Research') {
      steps.push({
        type: 'Recognition',
        title: 'IEEE Xplore Conference Submission',
        detail: 'Synthesize findings and benchmark results into peer-reviewed research papers.',
        targetAnchor: 'achievements'
      });
    } else if (selectedAction === 'Lead') {
      steps.push({
        type: 'Recognition',
        title: 'Domain Lead / Peer Cohort Mentor',
        detail: 'Lead study groups, guide underclassmen, and run technical bootcamps.',
        targetAnchor: 'people'
      });
    } else {
      const relevantResource = INITIAL_RESOURCES.find((r) => r.category === selectedInterest) || INITIAL_RESOURCES[0];
      steps.push({
        type: 'Skill',
        title: relevantResource.title,
        detail: `${relevantResource.type} authored by chapter team.`,
        targetAnchor: 'resources'
      });
    }

    return steps;
  };

  const path = generatePath();

  const handleStepClick = (step: PathStep) => {
    if (step.targetAnchor && onNavigateItem) {
      onRecordConnection?.(`${selectedInterest} → ${step.title}`);
      onNavigateItem(step.targetAnchor);
    }
  };

  return (
    <section id="tech-compass" className="py-20 border-b border-[#121316]/8 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
            03. Dynamic Pathway Synthesis
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-3">
            Tech Compass
          </h2>
          <p className="text-base text-[#121316]/70 leading-relaxed">
            Select your technical interest and immediate objective to generate a verified roadmap connecting real MBITS labs, projects, and milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Questions */}
          <div className="lg:col-span-5 space-y-8 bg-white p-6 sm:p-7 rounded-lg border border-[#121316]/8 shadow-2xs">
            {/* Question 1 */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#121316]/60 mb-3">
                Question 1: What interests you?
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedInterest(cat);
                      onRecordConnection?.(cat);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                      selectedInterest === cat
                        ? 'bg-[#00629B] text-white border-[#00629B] shadow-2xs'
                        : 'bg-[#FBFBFA] text-[#121316]/75 border-[#121316]/10 hover:border-[#00629B]/40 hover:text-[#121316]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#121316]/60 mb-3">
                Question 2: What do you want to do?
              </label>
              <div className="flex flex-wrap gap-2">
                {actions.map((act) => (
                  <button
                    key={act}
                    onClick={() => {
                      setSelectedAction(act);
                      onRecordConnection?.(act);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                      selectedAction === act
                        ? 'bg-[#121316] text-white border-[#121316] shadow-2xs'
                        : 'bg-[#FBFBFA] text-[#121316]/75 border-[#121316]/10 hover:border-[#121316]/30 hover:text-[#121316]'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#121316]/6 text-xs text-[#121316]/60 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00629B]" />
              <span>Synthesizing roadmap across verified chapter archives.</span>
            </div>
          </div>

          {/* Right Column: Generated Pathway */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-lg border border-[#121316]/8 shadow-2xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#121316]/8">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#00629B]" />
                <span className="text-xs font-bold text-[#121316] tracking-wide uppercase">
                  Synthesized Pathway: {selectedInterest} × {selectedAction}
                </span>
              </div>
              <span className="text-[11px] text-[#00629B] font-mono font-medium bg-[#00629B]/6 px-2 py-0.5 rounded">
                4-Stage Trajectory
              </span>
            </div>

            {/* Pathway Timeline Steps */}
            <div className="relative pl-6 sm:pl-8 space-y-6">
              {/* Vertical guideline */}
              <div className="absolute top-3 bottom-3 left-2.5 sm:left-3.5 w-0.5 bg-[#00629B]/20" />

              {path.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Step node dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#00629B] flex items-center justify-center text-[10px] font-mono font-bold text-[#00629B]">
                    {idx + 1}
                  </div>

                  <div
                    onClick={() => handleStepClick(step)}
                    className={`p-3.5 rounded-md border transition-all ${
                      step.targetAnchor
                        ? 'border-[#121316]/10 bg-[#FBFBFA] hover:bg-white hover:border-[#00629B]/50 hover:shadow-2xs cursor-pointer'
                        : 'border-[#121316]/8 bg-[#FBFBFA]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#00629B]">
                        {step.type}
                      </span>
                      {step.targetAnchor && (
                        <span className="text-[11px] text-[#00629B] font-medium flex items-center gap-1 group-hover:underline">
                          <span>Inspect</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#121316] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#121316]/70 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Path Summary CTA */}
            <div className="mt-8 pt-4 border-t border-[#121316]/8 flex items-center justify-between">
              <span className="text-xs text-[#121316]/60">
                Ready to take the first step on this path?
              </span>
              <button
                onClick={() => {
                  onNavigateItem?.('events');
                  onRecordConnection?.(`Embarked on ${selectedInterest} Path`);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] rounded-md transition-colors"
              >
                <span>Embark on Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
