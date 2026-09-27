import React from 'react';
import { BookOpen, ExternalLink, ArrowRight, Code, FileText, Database } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourcesSectionProps {
  resources: ResourceItem[];
  onRecordConnection?: (label: string) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources, onRecordConnection }) => {
  return (
    <section id="resources" className="py-20 border-b border-[#121316]/8 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#00629B] font-semibold mb-2">
            09. Open Technical Repository
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] mb-3">
            Learning Resources & Kits
          </h2>
          <p className="text-base text-[#121316]/70 leading-relaxed">
            Curated roadmaps, code-first starter repositories, and guidelines on publishing in IEEE conferences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {resources.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-lg bg-white border border-[#121316]/8 hover:border-[#00629B]/40 hover:shadow-2xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#00629B] font-mono mb-2">
                  <span className="font-semibold">{item.type}</span>
                  <span className="text-[#121316]/40">{item.category}</span>
                </div>

                <h3 className="text-base font-bold text-[#121316] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#121316]/70 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#121316]/6 flex items-center justify-between">
                <span className="text-[11px] text-[#121316]/50">
                  By {item.author}
                </span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onRecordConnection?.(`Resource: ${item.title}`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#00629B] hover:text-[#004e7c]"
                >
                  <span>Access</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
