import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { Search } from 'lucide-react';

export const InternshipsView: React.FC = () => {
  const { opportunities } = useApp();

  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const internships = useMemo(() => {
    return opportunities.filter(o => o.type === 'internship');
  }, [opportunities]);

  const roles = [
    { name: 'All', count: internships.length },
    {
      name: 'Software Engineering',
      count: internships.filter(i =>
        (i.title + ' ' + i.skills.join(' ')).toLowerCase().includes('software') ||
        (i.title + ' ' + i.skills.join(' ')).toLowerCase().includes('swe')
      ).length
    },
    {
      name: 'Cybersecurity',
      count: internships.filter(i =>
        (i.title + ' ' + i.skills.join(' ')).toLowerCase().includes('security')
      ).length
    }
  ];

  const filtered = useMemo(() => {
    return internships.filter(opp => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          opp.title.toLowerCase().includes(q) ||
          opp.company.toLowerCase().includes(q) ||
          opp.skills.some(s => s.toLowerCase().includes(q)) ||
          opp.location.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedRole !== 'All') {
        const text = `${opp.title} ${opp.skills.join(' ')} ${opp.shortDescription}`.toLowerCase();
        const r = selectedRole.toLowerCase();
        if (r.includes('software') && !text.includes('software') && !text.includes('swe')) return false;
        if (r.includes('security') && !text.includes('security')) return false;
      }

      return true;
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, [internships, search, selectedRole]);

  return (
    <div className="min-h-screen pb-28 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      
      {/* Header */}
      <div className="mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-obviously font-bold text-[#4E55E0] uppercase tracking-wider block mb-1">
              BANGALORE OPPORTUNITIES
            </span>
            <h1 className="font-obviously font-black text-4xl sm:text-5xl text-[#111322] tracking-tight">
              Internships
            </h1>
            <p className="text-sm text-neutral-600 font-medium mt-1">
              Verified internships with direct links to official company career portals.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search HPE, Honeywell, CloudSEK..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E6F5] rounded-full text-xs text-[#111322] placeholder:text-neutral-400 outline-none focus:border-[#4E55E0] shadow-xs"
            />
          </div>
        </div>

        {/* Filter Bar with Category Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {roles.map((r) => {
              const isSelected = selectedRole === r.name;
              return (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setSelectedRole(r.name)}
                  className={`px-4 py-2.5 rounded-full font-obviously font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111322] text-white shadow-sm'
                      : 'bg-white border border-[#E2E6F5] text-neutral-700 hover:border-[#111322]'
                  }`}
                >
                  <span>{r.name}</span>
                  {r.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#F2F4FC] text-neutral-500'
                    }`}>
                      {r.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((opp, idx) => {
            const colors: ('yellow' | 'lime' | 'pink' | 'sky' | 'white')[] = ['yellow', 'lime', 'pink', 'sky', 'white'];
            return (
              <OpportunityCard 
                key={opp.id} 
                opportunity={opp} 
                colorScheme={colors[idx % colors.length]}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-[#E4E8F7] rounded-[32px] p-8 shadow-xs">
          <h3 className="font-obviously font-black text-xl text-[#111322]">No matching internships</h3>
          <p className="text-xs text-neutral-500 mt-1">Try clearing your search query or switching the role filter.</p>
        </div>
      )}

    </div>
  );
};
