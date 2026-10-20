import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Trophy, 
  Users, 
  Calendar 
} from 'lucide-react';
import { getDeadlineInfo } from '../services/matchEngine';

interface HackathonDetailViewProps {
  id: string;
}

export const HackathonDetailView: React.FC<HackathonDetailViewProps> = ({ id }) => {
  const { opportunities, isSaved, toggleSave, setSelectedOpportunityForApply, navigateTo, showToast } = useApp();

  const hackathon = opportunities.find(o => o.id === id);
  const saved = hackathon ? isSaved(hackathon.id) : false;

  if (!hackathon) {
    return (
      <div className="min-h-screen py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-obviously font-black text-xl text-[#111322]">Hackathon Not Found</h2>
        <button
          type="button"
          onClick={() => navigateTo('/hackathons')}
          className="mt-4 px-6 py-2.5 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc] transition-colors cursor-pointer"
        >
          Return to Hackathons
        </button>
      </div>
    );
  }

  const deadlineInfo = getDeadlineInfo(hackathon.deadline);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${hackathon.title} | Droply`,
        text: `Register for ${hackathon.title}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard.");
    }
  };

  return (
    <div className="min-h-screen pb-32 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigateTo('/hackathons')}
        className="inline-flex items-center gap-2 text-xs font-obviously font-bold text-neutral-600 hover:text-[#111322] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to hackathons</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Section (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Header Card */}
          <div className="p-6 sm:p-7 bg-white border border-[#E4E8F7] rounded-[28px] shadow-xs">
            <span className="text-[11px] font-obviously font-bold text-[#4E55E0] block mb-2 uppercase tracking-wider">
              {hackathon.duration} Sprint · {hackathon.teamSize || '1–4 Builders'}
            </span>

            <div className="mb-3">
              <span className="text-[10px] text-neutral-500 font-obviously font-bold uppercase block">TOTAL PRIZE POOL</span>
              <div className="font-obviously font-black text-2xl sm:text-3xl text-[#111322] tracking-tight">
                {hackathon.prizePool || hackathon.stipend}
              </div>
            </div>

            <h1 className="font-obviously font-black text-2xl sm:text-3xl text-[#111322] leading-tight mb-2 tracking-tight">
              {hackathon.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <span className="font-bold text-[#111322]">{hackathon.company}</span>
              <span>·</span>
              <span className="capitalize">{hackathon.workMode === 'remote' ? 'Online Worldwide' : hackathon.location}</span>
            </div>
          </div>

          {/* OVERVIEW */}
          <div className="p-6 bg-white border border-[#E4E8F7] rounded-[28px] space-y-2.5 shadow-xs">
            <h2 className="font-obviously font-black text-base text-[#111322]">Mission &amp; Tracks</h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
              {hackathon.description}
            </p>
          </div>

          {/* PRIZES */}
          {hackathon.prizesList && hackathon.prizesList.length > 0 && (
            <div className="p-6 bg-white border border-[#E4E8F7] rounded-[28px] space-y-3 shadow-xs">
              <h2 className="font-obviously font-black text-base text-[#111322]">Prizes &amp; Bounties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hackathon.prizesList.map((p, idx) => (
                  <div key={idx} className="p-4 bg-[#F8F9FE] border border-[#E4E8F7] rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-obviously font-bold text-xs text-[#111322]">{p.place}</span>
                      <span className="font-obviously font-black text-[#4E55E0] text-xs">{p.amount}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-medium">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Panel (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="p-6 bg-white border-2 border-[#4E55E0] rounded-[28px] shadow-md shadow-[#4E55E0]/10 space-y-4">
            <div>
              <span className="text-[10px] uppercase text-[#4E55E0] font-obviously font-bold tracking-wider block mb-0.5">
                REGISTRATION CLOSING
              </span>
              <span className="font-obviously font-black text-sm text-[#111322]">
                {deadlineInfo.formatted} ({deadlineInfo.label})
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOpportunityForApply(hackathon)}
              className="w-full py-3.5 bg-[#4E55E0] text-white font-obviously font-black text-xs uppercase tracking-wider rounded-full hover:bg-[#3f46cc] transition-transform active:scale-95 shadow-md shadow-[#4E55E0]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register for Hackathon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => toggleSave(hackathon.id)}
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
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
