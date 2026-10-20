import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, Check, Copy, Bookmark, X } from 'lucide-react';
import { getDeadlineInfo } from '../services/matchEngine';

export const QuickApplyModal: React.FC = () => {
  const { 
    selectedOpportunityForApply, 
    setSelectedOpportunityForApply, 
    recordApplication, 
    isSaved, 
    toggleSave,
    showToast 
  } = useApp();

  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!selectedOpportunityForApply) return null;

  const opp = selectedOpportunityForApply;
  const saved = isSaved(opp.id);
  const deadlineInfo = getDeadlineInfo(opp.deadline);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(opp.applicationUrl);
    setCopied(true);
    showToast("Application link copied.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackApplication = () => {
    recordApplication(opp.id, notes || `Applied via ${opp.source}`);
    setSelectedOpportunityForApply(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setSelectedOpportunityForApply(null)}
    >
      <div 
        className="relative w-full max-w-md bg-white border border-[#E4E8F7] rounded-[28px] shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedOpportunityForApply(null)}
          className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-[#111322] rounded-full bg-[#F5F7FD] hover:bg-[#E8EDFC] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#F5F7FD] border border-[#E4E8F7] flex items-center justify-center text-xl shrink-0 font-bold">
            {opp.companyLogo || '⚡'}
          </div>
          <div>
            <span className="text-[10px] text-[#4E55E0] font-obviously font-bold uppercase tracking-wider block">
              Official Career Portal
            </span>
            <h2 className="font-obviously font-black text-lg text-[#111322] leading-snug">
              {opp.title}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 mt-0.5 font-medium">
              <span className="text-[#111322] font-bold">{opp.company}</span>
              <span>·</span>
              <span>{opp.location}</span>
              <span>·</span>
              <span>{opp.stipend}</span>
            </div>
          </div>
        </div>

        {/* Info card with Direct Link */}
        <div className="p-3.5 bg-[#F8F9FE] border border-[#E4E8F7] rounded-xl mb-4 space-y-2 text-xs font-obviously font-bold">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Source:</span>
            <span className="text-[#111322]">{opp.source}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Deadline:</span>
            <span className="text-[#FF783E]">{deadlineInfo.formatted} ({deadlineInfo.label})</span>
          </div>
          <div className="pt-1.5 border-t border-[#E4E8F7]">
            <span className="text-[10px] text-neutral-400 uppercase block mb-0.5">Direct Apply URL:</span>
            <a
              href={opp.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#4E55E0] hover:underline break-all font-mono font-medium block"
            >
              {opp.applicationUrl}
            </a>
          </div>
        </div>

        {/* Notes input */}
        <div className="mb-4">
          <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1">
            Application Note (Optional):
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Applied with latest resume"
            className="w-full px-3.5 py-2.5 bg-[#F8F9FE] border border-[#E4E8F7] rounded-xl text-xs text-[#111322] placeholder:text-neutral-400 focus:outline-none focus:border-[#4E55E0]"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <a
            href={opp.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTrackApplication}
            className="w-full sm:flex-1 py-3 px-4 bg-[#4E55E0] text-white font-obviously font-black text-xs rounded-full hover:bg-[#3f46cc] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-[#4E55E0]/20 uppercase tracking-wider cursor-pointer"
          >
            <span>Open Career Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none p-3 bg-[#F5F7FD] border border-[#E2E6F5] rounded-full text-neutral-700 hover:text-[#111322] transition-colors flex items-center justify-center gap-1.5 text-xs font-obviously font-bold cursor-pointer"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4E55E0]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => toggleSave(opp.id)}
              className={`flex-1 sm:flex-none p-3 rounded-full border transition-colors flex items-center justify-center gap-1.5 text-xs font-obviously font-bold cursor-pointer ${
                saved
                  ? 'bg-[#B8EB6C] border-[#B8EB6C] text-[#111322]'
                  : 'bg-[#F5F7FD] border-[#E2E6F5] text-neutral-700 hover:text-[#111322]'
              }`}
              title={saved ? 'Saved' : 'Save'}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
