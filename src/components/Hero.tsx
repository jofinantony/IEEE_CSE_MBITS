import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { NetworkCore3D } from './NetworkCore3D';

interface HeroProps {
  onEnterNetwork: () => void;
  onExploreCompass: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterNetwork, onExploreCompass }) => {
  const [pulseCount, setPulseCount] = useState(0);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.15;
    const distanceY = (e.clientY - centerY) * 0.15;
    setBtnOffset({
      x: Math.max(-4, Math.min(4, distanceX)),
      y: Math.max(-4, Math.min(4, distanceY))
    });
  };

  const handleMagneticLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleCtaClick = () => {
    setPulseCount((prev) => prev + 1);
    setTimeout(() => {
      onEnterNetwork();
    }, 280);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-6 pb-16">
      {/* 3D Network Core Behind the Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-75 z-0">
        <div className="w-full max-w-4xl h-[480px] sm:h-[600px]">
          <NetworkCore3D
            pulseTrigger={pulseCount}
            onNodeClick={() => setPulseCount((prev) => prev + 1)}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        {/* Subtle Organization Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4 pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#00629B] font-semibold">
            IEEE Computer Society
          </span>
          <span className="text-[#121316]/30">/</span>
          <span className="text-xs tracking-wider text-[#121316]/70 font-medium">
            MBITS Student Branch Chapter
          </span>
        </div>

        {/* Primary Triple Cadence Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#121316] leading-[1.05] mb-6">
          <span className="block">COMPUTE.</span>
          <span className="block text-[#00629B]">CONNECT.</span>
          <span className="block">CREATE.</span>
        </h1>

        {/* Primary Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl font-normal text-[#121316]/75 max-w-2xl mx-auto mb-10 tracking-tight">
          “Every connection leads somewhere.”
        </p>

        {/* Interactive Action Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          {/* Primary Magnetic CTA */}
          <button
            onClick={handleCtaClick}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            style={{
              transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`
            }}
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 text-sm font-semibold text-white bg-[#00629B] hover:bg-[#004e7c] active:bg-[#003d61] rounded-md shadow-sm transition-all duration-200"
          >
            {/* Border light traveling effect */}
            <span className="absolute inset-0 rounded-md border border-white/20 pointer-events-none" />
            <span className="relative z-10">ENTER THE NETWORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary Intent CTA */}
          <button
            onClick={onExploreCompass}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#121316]/80 hover:text-[#00629B] bg-white/80 hover:bg-white border border-[#121316]/12 rounded-md shadow-2xs backdrop-blur-xs transition-colors"
          >
            <Compass className="w-4 h-4 text-[#00629B]" />
            <span>Open Tech Compass</span>
          </button>
        </div>

        {/* Quiet Verified Institutional Context */}
        <div className="mt-14 pt-8 border-t border-[#121316]/8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#121316]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-medium text-[#121316]/80">IEEE Kerala Section</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00629B]" />
            <span className="font-medium text-[#121316]/80">Kochi Hub Council</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span className="font-medium text-[#121316]/80">Student Branch Chapter 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};
