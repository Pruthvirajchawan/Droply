import React from 'react';
import { Opportunity } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { getDeadlineInfo } from '../services/matchEngine';

interface HackathonCardProps {
  hackathon: Opportunity;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon }) => {
  const { navigateTo, isSaved, toggleSave, setSelectedOpportunityForApply } = useApp();
  const saved = isSaved(hackathon.id);
  const deadlineInfo = getDeadlineInfo(hackathon.deadline);

  return (
    <div
      onClick={() => navigateTo(`/hackathon/${hackathon.id}`)}
      className="group relative flex flex-col justify-between p-7 bg-white border border-[#E4E8F7] rounded-[30px] transition-all duration-200 cursor-pointer shadow-sm hover:border-[#4E55E0] hover:shadow-md hover:-translate-y-1"
    >
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#B8EB6C] text-[#111322] flex items-center justify-center text-xl shrink-0 font-bold shadow-xs">
              🏆
            </div>
            <div>
              <span className="font-obviously font-bold text-sm text-[#111322] block leading-tight">
                {hackathon.company}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                {hackathon.workMode === 'remote' ? 'Online Worldwide' : hackathon.location}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(hackathon.id);
            }}
            className="w-9 h-9 rounded-full bg-[#F4F6FD] hover:bg-[#E9EDFA] flex items-center justify-center text-[#111322] transition-colors cursor-pointer"
            title={saved ? 'Saved' : 'Save'}
          >
            {saved ? <BookmarkCheck className="w-4 h-4 text-[#4E55E0]" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Big Bento Prize Pool Box */}
        <div className="p-5 bg-[#F5F7FD] rounded-2xl border border-[#E6EBF8] mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-obviously font-bold text-[#4E55E0] uppercase tracking-wider block">
              TOTAL PRIZE POOL
            </span>
            <div className="font-obviously font-black text-2xl sm:text-3xl text-[#111322] tracking-tight">
              {hackathon.prizePool || hackathon.stipend}
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-full bg-[#B8EB6C] text-[#111322] text-xs font-obviously font-extrabold">
            {hackathon.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-obviously font-black text-xl sm:text-2xl text-[#111322] group-hover:text-[#4E55E0] transition-colors leading-snug mb-2 tracking-tight">
          {hackathon.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-500 font-medium line-clamp-2 leading-relaxed mb-4">
          {hackathon.shortDescription}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-3 flex items-center justify-between gap-3 border-t border-[#EEF2FC]">
        <span className="text-xs font-obviously font-bold text-[#FF783E]">
          Closes in {deadlineInfo.label}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOpportunityForApply(hackathon);
          }}
          className="px-5 py-2.5 bg-[#4E55E0] text-white font-obviously font-black text-xs rounded-full hover:bg-[#3f46cc] transition-transform active:scale-95 flex items-center gap-1.5 shadow-md shadow-[#4E55E0]/20 shrink-0 cursor-pointer"
        >
          <span>Register</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
