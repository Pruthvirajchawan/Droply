import React from 'react';
import { Opportunity } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { getDeadlineInfo } from '../services/matchEngine';

interface OpportunityCardProps {
  opportunity: Opportunity;
  colorScheme?: 'yellow' | 'lime' | 'pink' | 'sky' | 'white';
  featured?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  colorScheme 
}) => {
  const { navigateTo, isSaved, toggleSave, setSelectedOpportunityForApply } = useApp();
  const saved = isSaved(opportunity.id);
  const deadlineInfo = getDeadlineInfo(opportunity.deadline);

  // Deterministic color assignment based on opportunity id if not passed
  const getColor = (): 'yellow' | 'lime' | 'pink' | 'sky' | 'white' => {
    if (colorScheme) return colorScheme;
    const char = opportunity.id.charCodeAt(opportunity.id.length - 1);
    const options: ('yellow' | 'lime' | 'pink' | 'sky' | 'white')[] = ['yellow', 'lime', 'pink', 'sky', 'white'];
    return options[char % options.length];
  };

  const scheme = getColor();

  const colorStyles = {
    yellow: {
      card: 'bg-[#F7CD63] text-[#111322] border-transparent shadow-[0_4px_20px_rgba(247,205,99,0.22)] hover:shadow-[0_8px_30px_rgba(247,205,99,0.35)]',
      iconBox: 'bg-[#111322] text-white',
      badge: 'bg-[#111322] text-white',
      btn: 'bg-[#111322] text-white hover:bg-black',
      subText: 'text-[#111322]/85',
      tagBg: 'bg-[#111322]/10 text-[#111322]'
    },
    lime: {
      card: 'bg-[#B8EB6C] text-[#111322] border-transparent shadow-[0_4px_20px_rgba(184,235,108,0.22)] hover:shadow-[0_8px_30px_rgba(184,235,108,0.35)]',
      iconBox: 'bg-[#111322] text-white',
      badge: 'bg-[#111322] text-white',
      btn: 'bg-[#111322] text-white hover:bg-black',
      subText: 'text-[#111322]/85',
      tagBg: 'bg-[#111322]/10 text-[#111322]'
    },
    pink: {
      card: 'bg-[#FC8FC6] text-[#111322] border-transparent shadow-[0_4px_20px_rgba(252,143,198,0.22)] hover:shadow-[0_8px_30px_rgba(252,143,198,0.35)]',
      iconBox: 'bg-[#111322] text-white',
      badge: 'bg-[#111322] text-white',
      btn: 'bg-[#111322] text-white hover:bg-black',
      subText: 'text-[#111322]/85',
      tagBg: 'bg-[#111322]/10 text-[#111322]'
    },
    sky: {
      card: 'bg-[#C5E0FE] text-[#111322] border-transparent shadow-[0_4px_20px_rgba(197,224,254,0.22)] hover:shadow-[0_8px_30px_rgba(197,224,254,0.35)]',
      iconBox: 'bg-[#111322] text-white',
      badge: 'bg-[#111322] text-white',
      btn: 'bg-[#111322] text-white hover:bg-black',
      subText: 'text-[#111322]/85',
      tagBg: 'bg-[#111322]/10 text-[#111322]'
    },
    white: {
      card: 'bg-white text-[#111322] border border-[#E4E8F7] shadow-sm hover:border-[#4E55E0] hover:shadow-md',
      iconBox: 'bg-[#F4F6FD] text-[#111322] border border-[#E2E6F5]',
      badge: 'bg-[#4E55E0] text-white',
      btn: 'bg-[#4E55E0] text-white hover:bg-[#3f46cc]',
      subText: 'text-neutral-500',
      tagBg: 'bg-[#F2F4FC] text-neutral-700'
    }
  }[scheme];

  return (
    <div
      onClick={() => navigateTo(`/opportunity/${opportunity.id}`)}
      className={`group relative flex flex-col justify-between p-7 rounded-[32px] transition-all duration-300 cursor-pointer hover:-translate-y-1.5 ${colorStyles.card}`}
    >
      <div>
        {/* Top bar: Left Icon Box + Right Bookmark Circle */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 font-bold shadow-xs group-hover:scale-105 transition-transform duration-200 ${colorStyles.iconBox}`}>
              {opportunity.companyLogo || '⚡'}
            </div>
            <div>
              <span className="font-obviously font-bold text-sm block leading-tight">
                {opportunity.company}
              </span>
              <span className={`text-xs capitalize font-medium ${colorStyles.subText}`}>
                {opportunity.workMode} · {opportunity.location.split('/')[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {opportunity.matchScore && (
              <span className={`px-2.5 py-1 rounded-full text-xs font-obviously font-black tracking-tight ${colorStyles.badge}`}>
                {opportunity.matchScore}%
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(opportunity.id);
              }}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#111322] transition-colors shadow-xs active:scale-90 cursor-pointer"
              title={saved ? 'Saved' : 'Save'}
            >
              {saved ? <BookmarkCheck className="w-4 h-4 text-[#4E55E0]" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Role Title */}
        <h3 className="font-obviously font-black text-xl sm:text-2xl leading-snug mb-2 tracking-tight">
          {opportunity.title}
        </h3>

        {/* Short Summary */}
        <p className={`text-xs font-medium line-clamp-2 leading-relaxed mb-4 ${colorStyles.subText}`}>
          {opportunity.shortDescription}
        </p>

        {/* Metric Pill */}
        <div className="flex items-center gap-2 text-xs font-obviously font-bold mb-4">
          <span className="px-3.5 py-1.5 rounded-full bg-black/10 tabular-nums">
            {opportunity.stipend}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-black/10">
            {deadlineInfo.label}
          </span>
        </div>
      </div>

      {/* Action footer */}
      <div className="pt-3.5 flex items-center justify-between gap-3 border-t border-black/10">
        <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
          {opportunity.skills.slice(0, 3).map((s, idx) => (
            <span key={idx} className={`px-2.5 py-1 rounded-lg font-obviously ${colorStyles.tagBg}`}>
              {s}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOpportunityForApply(opportunity);
          }}
          className={`px-4.5 py-2.5 rounded-full font-obviously font-black text-xs transition-all duration-200 active:scale-95 flex items-center gap-1 shrink-0 shadow-sm cursor-pointer ${colorStyles.btn}`}
        >
          <span>Apply</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
