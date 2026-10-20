import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { Bookmark } from 'lucide-react';

export const SavedView: React.FC = () => {
  const { opportunities, savedIds, applications, updateApplicationStatus, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'saved' | 'applied'>('saved');

  const savedOpportunities = useMemo(() => {
    return opportunities.filter(o => savedIds.includes(o.id));
  }, [opportunities, savedIds]);

  return (
    <div className="min-h-screen pb-28 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div>
          <span className="text-xs font-obviously font-bold text-[#4E55E0] uppercase tracking-wider block mb-1">
            PERSONAL TRACKER
          </span>
          <h1 className="font-obviously font-black text-4xl sm:text-5xl text-[#111322] tracking-tight">
            Saved &amp; Applied
          </h1>
          <p className="text-sm text-neutral-600 font-medium mt-1">
            Bookmarked internships and your application progress.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2.5 rounded-full text-xs font-obviously font-bold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#111322] text-white shadow-xs'
                : 'bg-white border border-[#E2E6F5] text-neutral-700 hover:border-[#111322]'
            }`}
          >
            Saved Internships ({savedOpportunities.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('applied')}
            className={`px-5 py-2.5 rounded-full text-xs font-obviously font-bold transition-all cursor-pointer ${
              activeTab === 'applied'
                ? 'bg-[#4E55E0] text-white shadow-xs'
                : 'bg-white border border-[#E2E6F5] text-neutral-700 hover:border-[#111322]'
            }`}
          >
            Applied ({applications.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'saved' ? (
        savedOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedOpportunities.map((opp, idx) => {
              const colors: ('yellow' | 'lime' | 'pink' | 'sky' | 'white')[] = ['yellow', 'lime', 'pink', 'sky', 'white'];
              return (
                <OpportunityCard key={opp.id} opportunity={opp} colorScheme={colors[idx % colors.length]} />
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-[#E4E8F7] rounded-[32px] p-8 shadow-xs">
            <Bookmark className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="font-obviously font-black text-xl text-[#111322]">No saved internships</h3>
            <p className="text-xs text-neutral-500 mt-1">Bookmark any internship to keep track of it here.</p>
            <button
              type="button"
              onClick={() => navigateTo('/internships')}
              className="mt-4 px-6 py-2.5 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc] cursor-pointer"
            >
              Explore Internships
            </button>
          </div>
        )
      ) : (
        /* Applied Status Pipeline */
        <div className="space-y-4">
          {applications.length > 0 ? (
            applications.map((app) => {
              const opp = opportunities.find(o => o.id === app.opportunityId);
              return (
                <div
                  key={app.opportunityId}
                  className="p-6 bg-white border border-[#E4E8F7] rounded-[28px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#B8EB6C] text-[#111322] font-obviously font-black uppercase">
                        {app.status}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        Applied on {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-obviously font-bold text-lg text-[#111322]">
                      {opp ? opp.title : 'Internship'}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      {opp ? opp.company : ''} · {opp ? opp.location : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={app.status}
                      onChange={(e) => updateApplicationStatus(app.opportunityId, e.target.value as any)}
                      className="px-4 py-2 bg-[#F5F7FD] border border-[#E4E8F7] rounded-full text-xs text-[#111322] outline-none font-obviously font-bold"
                    >
                      <option value="saved">Saved</option>
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Archived</option>
                    </select>

                    {opp && (
                      <button
                        type="button"
                        onClick={() => navigateTo(`/opportunity/${opp.id}`)}
                        className="px-4 py-2 bg-[#111322] text-white font-obviously font-bold text-xs rounded-full hover:bg-black cursor-pointer"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center bg-white border border-[#E4E8F7] rounded-[32px] p-8 shadow-xs">
              <h3 className="font-obviously font-black text-xl text-[#111322]">No applications tracked yet</h3>
              <p className="text-xs text-neutral-500 mt-1">When you apply to an internship, you can track its stage here.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
