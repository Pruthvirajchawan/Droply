import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Briefcase, Trophy, ArrowRight, Zap } from 'lucide-react';
import { getDeadlineInfo } from '../services/matchEngine';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, opportunities, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filtered = opportunities.filter(opp => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      opp.title.toLowerCase().includes(q) ||
      opp.company.toLowerCase().includes(q) ||
      opp.skills.some(s => s.toLowerCase().includes(q)) ||
      opp.location.toLowerCase().includes(q) ||
      (opp.hackathonTheme && opp.hackathonTheme.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      const item = filtered[selectedIndex];
      setIsCommandPaletteOpen(false);
      navigateTo(item.type === 'hackathon' ? `/hackathon/${item.id}` : `/opportunity/${item.id}`);
    }
  };

  const quickFilters = [
    { label: 'AI & ML', q: 'AI' },
    { label: 'Remote', q: 'Remote' },
    { label: 'Hackathons', q: 'Hackathon' },
    { label: 'Python', q: 'Python' },
    { label: 'React', q: 'React' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-white border border-[#E4E8F7] rounded-[32px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="flex items-center px-6 py-4 border-b border-[#EEF2FC] gap-3">
          <Search className="w-5 h-5 text-[#4E55E0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search internships, skills, companies..."
            className="w-full bg-transparent text-[#111322] text-sm outline-none placeholder:text-neutral-400 font-medium"
          />
          {query && (
            <button 
              type="button" 
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-[#111322]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#F5F7FD] border border-[#E2E6F5] rounded text-neutral-500">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-3 bg-[#F8F9FE] border-b border-[#EEF2FC] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-500 font-obviously font-bold whitespace-nowrap">Suggested:</span>
          {quickFilters.map(chip => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setQuery(chip.q)}
              className="px-3.5 py-1 rounded-full bg-white hover:bg-[#EEF2FC] text-neutral-700 border border-[#E2E6F5] text-xs font-obviously font-bold whitespace-nowrap shadow-2xs"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#F0F2FA]">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const deadlineInfo = getDeadlineInfo(item.deadline);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    navigateTo(item.type === 'hackathon' ? `/hackathon/${item.id}` : `/opportunity/${item.id}`);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-4 px-6 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#F4F6FE]' : 'hover:bg-[#F8F9FE]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#F5F7FD] border border-[#E2E6F5] flex items-center justify-center shrink-0 text-sm font-bold">
                      {item.type === 'hackathon' ? <Trophy className="w-4 h-4 text-[#4E55E0]" /> : item.companyLogo || <Briefcase className="w-4 h-4 text-[#111322]" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-obviously font-bold text-sm truncate text-[#111322]">
                          {item.title}
                        </span>
                        {item.matchScore && (
                          <span className="text-[10px] text-[#111322] bg-[#B8EB6C] px-2 py-0.5 rounded-full font-obviously font-black">
                            {item.matchScore}%
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                        <span className="text-[#111322] font-bold">{item.company}</span>
                        <span>·</span>
                        <span>{item.stipend}</span>
                        <span>·</span>
                        <span className="capitalize">{item.workMode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs font-obviously font-bold text-[#FF783E]">
                      {deadlineInfo.label}
                    </span>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#4E55E0] translate-x-0.5' : 'text-neutral-400'} transition-transform`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-neutral-500">
              <p className="font-obviously font-black text-base text-[#111322]">No results found</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching for &quot;Python&quot;, &quot;Remote&quot;, or &quot;Hackathon&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
