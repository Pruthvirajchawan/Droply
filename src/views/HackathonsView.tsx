import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HackathonCard } from '../components/HackathonCard';
import { Search, Trophy, Calendar } from 'lucide-react';

export const HackathonsView: React.FC = () => {
  const { opportunities } = useApp();

  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'remote' | 'onsite'>('all');

  const hackathons = useMemo(() => {
    return opportunities.filter(o => o.type === 'hackathon');
  }, [opportunities]);

  const filtered = useMemo(() => {
    return hackathons.filter(h => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match = h.title.toLowerCase().includes(q) ||
                      h.company.toLowerCase().includes(q) ||
                      (h.hackathonTheme && h.hackathonTheme.toLowerCase().includes(q));
        if (!match) return false;
      }

      if (selectedFormat !== 'all' && h.workMode !== selectedFormat) {
        return false;
      }

      return true;
    });
  }, [hackathons, search, selectedFormat]);

  return (
    <div className="min-h-screen pb-28 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      
      {/* Header */}
      <div className="mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-obviously font-bold text-[#4E55E0] uppercase tracking-wider block mb-1">
              GLOBAL SPRINTS &amp; BOUNTIES
            </span>
            <h1 className="font-obviously font-black text-4xl sm:text-5xl text-[#111322] tracking-tight">
              Hackathons
            </h1>
            <p className="text-sm text-neutral-600 font-medium mt-1">
              Build prototypes, win cash prizes, and connect with venture partners.
            </p>
          </div>

          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hackathons..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E6F5] rounded-full text-xs text-[#111322] placeholder:text-neutral-400 outline-none focus:border-[#4E55E0] shadow-xs"
            />
          </div>
        </div>

        {/* Format chips */}
        <div className="flex items-center gap-2">
          {[
            { label: 'All Sprints', val: 'all' },
            { label: 'Online Worldwide', val: 'remote' },
            { label: 'In-Person', val: 'onsite' },
          ].map((f) => (
            <button
              key={f.val}
              type="button"
              onClick={() => setSelectedFormat(f.val as any)}
              className={`px-4 py-2 rounded-full text-xs font-obviously font-bold transition-all ${
                selectedFormat === f.val
                  ? 'bg-[#4E55E0] text-white shadow-xs'
                  : 'bg-white border border-[#E2E6F5] text-neutral-700 hover:border-[#111322]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-[#E4E8F7] rounded-[32px] p-8 shadow-xs">
          <Trophy className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h3 className="font-obviously font-black text-xl text-[#111322]">No hackathons found</h3>
          <p className="text-xs text-neutral-500 mt-1">Try switching to all sprints.</p>
        </div>
      )}

    </div>
  );
};
