import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { getDeadlineInfo } from '../services/matchEngine';

interface OpportunityDetailViewProps {
  id: string;
}

export const OpportunityDetailView: React.FC<OpportunityDetailViewProps> = ({ id }) => {
  const { opportunities, isSaved, toggleSave, recordApplication, navigateTo, showToast } = useApp();

  const opp = opportunities.find(o => o.id === id);
  const saved = opp ? isSaved(opp.id) : false;

  if (!opp) {
    return (
      <div className="min-h-screen py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-obviously font-black text-xl text-[#111322]">Internship Not Found</h2>
        <button
          type="button"
          onClick={() => navigateTo('/internships')}
          className="mt-4 px-6 py-2.5 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc] transition-colors cursor-pointer"
        >
          Return to Internships
        </button>
      </div>
    );
  }

  const deadlineInfo = getDeadlineInfo(opp.deadline);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${opp.title} at ${opp.company} | Droply`,
        text: `Found this internship on Droply: ${opp.title} at ${opp.company}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(opp.applicationUrl);
      showToast("Official application link copied.");
    }
  };

  return (
    <div className="min-h-screen pb-32 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigateTo('/internships')}
        className="inline-flex items-center gap-2 text-xs font-obviously font-bold text-neutral-600 hover:text-[#111322] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to internships</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Main Header Card */}
          <div className="p-6 sm:p-7 bg-white border border-[#E4E8F7] rounded-[28px] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="text-[11px] font-obviously font-bold text-[#4E55E0] uppercase tracking-wider">
                {opp.companyType || 'Technology'} · {opp.source}
              </span>

              {opp.matchScore && (
                <span className="px-3 py-1 rounded-full bg-[#B8EB6C] text-[#111322] font-obviously font-black text-xs">
                  {opp.matchScore}% Match
                </span>
              )}
            </div>

            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F7FD] border border-[#E4E8F7] flex items-center justify-center text-xl shrink-0 font-bold shadow-2xs">
                {opp.companyLogo || '⚡'}
              </div>
              <div>
                <h1 className="font-obviously font-black text-2xl sm:text-3xl text-[#111322] leading-tight tracking-tight">
                  {opp.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mt-1 font-medium">
                  <span className="font-bold text-[#111322]">{opp.company}</span>
                  <span>·</span>
                  <span className="capitalize">{opp.workMode}</span>
                  <span>·</span>
                  <span>{opp.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-[#EEF2FC]">
              <div className="p-3 bg-[#F8F9FE] rounded-xl border border-[#E4E8F7]">
                <span className="text-neutral-500 block mb-0.5 uppercase text-[9px] font-obviously font-bold">Stipend:</span>
                <span className="font-obviously font-black text-[#111322] text-sm">{opp.stipend}</span>
              </div>
              <div className="p-3 bg-[#F8F9FE] rounded-xl border border-[#E4E8F7]">
                <span className="text-neutral-500 block mb-0.5 uppercase text-[9px] font-obviously font-bold">Location:</span>
                <span className="font-obviously font-black text-[#111322] text-sm">{opp.location}</span>
              </div>
              <div className="p-3 bg-[#F8F9FE] rounded-xl border border-[#E4E8F7] col-span-2 sm:col-span-1">
                <span className="text-neutral-500 block mb-0.5 uppercase text-[9px] font-obviously font-bold">Duration:</span>
                <span className="font-obviously font-black text-[#111322] text-sm">{opp.duration}</span>
              </div>
            </div>
          </div>

          {/* WHY THIS MATCHES YOU */}
          {opp.matchReasons && opp.matchReasons.length > 0 && (
            <div className="p-5 bg-[#C5E0FE]/30 border border-[#C5E0FE]/60 rounded-[24px]">
              <div className="flex items-center gap-2 mb-2.5 text-[#4E55E0]">
                <Sparkles className="w-4 h-4" />
                <h2 className="font-obviously font-black text-sm text-[#111322]">Why This Matches Your Stack</h2>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-800 font-medium">
                {opp.matchReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4E55E0] shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ABOUT THE ROLE */}
          <div className="p-6 bg-white border border-[#E4E8F7] rounded-[28px] space-y-2.5 shadow-xs">
            <h2 className="font-obviously font-black text-base text-[#111322]">About the role</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
              {opp.description}
            </p>
          </div>

          {/* WHAT YOU'LL DO */}
          {opp.keyHighlights && opp.keyHighlights.length > 0 && (
            <div className="p-6 bg-white border border-[#E4E8F7] rounded-[28px] space-y-2.5 shadow-xs">
              <h2 className="font-obviously font-black text-base text-[#111322]">Key Highlights</h2>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 font-medium">
                {opp.keyHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7CD63] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* REQUIRED SKILLS */}
          <div className="p-5 bg-white border border-[#E4E8F7] rounded-[28px] space-y-2.5 shadow-xs">
            <h2 className="font-obviously font-black text-sm text-[#111322]">Technical Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {opp.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#F5F7FD] border border-[#E2E6F5] rounded-full text-xs font-obviously font-bold text-[#111322]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Apply Box (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="p-6 bg-white border-2 border-[#4E55E0] rounded-[28px] shadow-md shadow-[#4E55E0]/10 space-y-4">
            <div>
              <span className="text-[10px] uppercase text-[#4E55E0] font-obviously font-bold tracking-wider block mb-0.5">
                OFFICIAL APPLICATION PORTAL
              </span>
              <span className="font-obviously font-black text-sm text-[#111322] block">
                {opp.source}
              </span>
              <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
                Deadline: {deadlineInfo.formatted} ({deadlineInfo.label})
              </span>
            </div>

            <a
              href={opp.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordApplication(opp.id, `Applied directly on ${opp.source}`)}
              className="w-full py-3.5 bg-[#4E55E0] text-white font-obviously font-black text-xs uppercase tracking-wider rounded-full hover:bg-[#3f46cc] transition-transform active:scale-95 shadow-md shadow-[#4E55E0]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply on Career Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => toggleSave(opp.id)}
                className={`py-2.5 px-3 rounded-full border text-xs font-obviously font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  saved
                    ? 'bg-[#B8EB6C] border-[#B8EB6C] text-[#111322]'
                    : 'bg-[#F5F7FD] border-[#E2E6F5] text-neutral-700 hover:text-[#111322]'
                }`}
              >
                {saved ? <BookmarkCheck className="w-3.5 h-3.5 text-[#4E55E0]" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="py-2.5 px-3 bg-[#F5F7FD] border border-[#E2E6F5] rounded-full text-neutral-700 hover:text-[#111322] text-xs font-obviously font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
