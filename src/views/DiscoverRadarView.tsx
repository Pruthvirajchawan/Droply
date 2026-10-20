import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { HackathonCard } from '../components/HackathonCard';
import { Radio, Zap, Clock, Sparkles, Trophy, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { DropMascot } from '../components/DropMascot';

export const DiscoverRadarView: React.FC = () => {
  const { opportunities, profile, radarStats, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'FOR_YOU' | 'ALL' | 'HIGH_MATCH'>('UPCOMING');
  const [selectedMode, setSelectedMode] = useState<string>('all');

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      if (activeTab === 'UPCOMING' && opp.status !== 'closing_soon') return false;
      if (activeTab === 'HIGH_MATCH' && (opp.matchScore || 0) < 80) return false;
      if (activeTab === 'FOR_YOU' && (opp.matchScore || 0) < 70 && opp.status !== 'new') return false;

      if (selectedMode !== 'all' && opp.workMode !== selectedMode) return false;

      return true;
    }).sort((a, b) => {
      if (activeTab === 'UPCOMING') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return (b.matchScore || 0) - (a.matchScore || 0);
    });
  }, [opportunities, activeTab, selectedMode]);

  return (
    <div className="min-h-screen pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-6 relative z-10">
      
      {/* Top Banner Card: Vibrant Lime Container mirroring reference style */}
      <div className="mb-8 p-5 sm:p-6 bg-[#B8FF00] rounded-3xl text-[#0A0B0D] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_10px_30px_rgba(184,255,0,0.15)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0A0B0D] text-[#B8FF00] flex items-center justify-center text-xl shrink-0 font-bold">
            ⚡
          </div>
          <div>
            <h2 className="font-headline font-extrabold text-lg sm:text-xl text-[#0A0B0D] leading-tight">
              Personalize your feed
            </h2>
            <p className="text-xs sm:text-sm text-[#0A0B0D]/80 font-medium mt-0.5">
              Target skills: {profile.skills.slice(0, 3).join(', ')} · Tailored to your graduation timeline.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('/onboarding')}
          className="px-6 py-3 bg-[#0A0B0D] text-white font-headline font-bold text-xs rounded-full hover:bg-[#1E222B] transition-transform active:scale-95 shrink-0 self-start sm:self-auto"
        >
          PERSONALIZE
        </button>
      </div>

      {/* Main Section Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Discover
          </h1>

          {/* Work mode chips */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121419] border border-[#222733] rounded-xl text-xs font-headline">
            {['all', 'remote', 'hybrid'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSelectedMode(mode)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  selectedMode === mode
                    ? 'bg-[#B8FF00] text-[#0A0B0D] font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Tabs with Lime Underline directly from reference */}
        <div className="flex items-center gap-8 border-b border-[#222733] pb-3 text-sm font-headline font-bold">
          {[
            { id: 'UPCOMING', label: 'Closing Soon', badge: radarStats.closingSoon },
            { id: 'FOR_YOU', label: 'For You', badge: radarStats.highMatchCount },
            { id: 'ALL', label: 'All Drops', badge: opportunities.length },
            { id: 'HIGH_MATCH', label: '90%+ Match' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative py-1 flex items-center gap-2 transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-[#B8FF00] text-[#0A0B0D]' : 'bg-white/10 text-neutral-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-3 left-0 right-0 h-[3px] bg-[#B8FF00] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of clean opportunities */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            opp.type === 'hackathon' ? (
              <HackathonCard key={opp.id} hackathon={opp} />
            ) : (
              <OpportunityCard key={opp.id} opportunity={opp} featured={opp.status === 'closing_soon'} />
            )
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#121419] border border-[#222733] rounded-3xl p-8">
          <DropMascot size={120} mood="searching" className="mx-auto mb-2" />
          <h3 className="font-headline font-extrabold text-xl text-white">Your radar is quiet</h3>
          <p className="text-xs text-neutral-400 mt-1">Try switching to &quot;All Drops&quot; or changing work modes.</p>
          <button
            type="button"
            onClick={() => setActiveTab('ALL')}
            className="mt-4 px-6 py-2.5 bg-[#B8FF00] text-[#0A0B0D] font-headline font-bold text-xs rounded-full hover:bg-[#a8eb00]"
          >
            Show All Opportunities
          </button>
        </div>
      )}
    </div>
  );
};
