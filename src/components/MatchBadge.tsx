import React, { useState } from 'react';

interface MatchBadgeProps {
  score: number;
  reasons?: string[];
  size?: 'sm' | 'md' | 'lg';
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({ score, reasons = [], size = 'md' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const isHighMatch = score >= 80;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={(e) => {
          e.stopPropagation();
          setShowTooltip(prev => !prev);
        }}
        className={`inline-flex items-center gap-1.5 font-mono font-bold transition-transform active:scale-95 ${
          size === 'lg'
            ? 'px-3 py-1 text-sm bg-[#D9FB37] text-[#090A0C] rounded'
            : size === 'md'
            ? 'px-2 py-0.5 text-xs bg-[#D9FB37]/15 border border-[#D9FB37]/40 text-[#D9FB37] rounded'
            : 'px-1.5 py-0.5 text-[10px] bg-[#D9FB37]/10 text-[#D9FB37] rounded'
        } ${isHighMatch ? 'ring-1 ring-[#D9FB37]/30' : ''}`}
        title="Click to view match explanation"
      >
        <span className="tabular-nums">{score}%</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-85">MATCH</span>
      </button>

      {/* Popover explaining why */}
      {showTooltip && reasons.length > 0 && (
        <div 
          className="absolute right-0 top-full mt-2 z-50 w-64 p-3 bg-[#171A21] border border-[#2B313E] rounded-lg shadow-2xl text-left pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
            <span className="font-headline text-xs font-bold text-[#D9FB37]">Why this matches you</span>
            <span className="font-mono text-[10px] text-neutral-400">{score}% Score</span>
          </div>
          <ul className="space-y-1.5 text-[11px] text-neutral-300">
            {reasons.map((r, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#D9FB37] font-bold">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
