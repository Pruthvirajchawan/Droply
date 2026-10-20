import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { HackathonCard } from '../components/HackathonCard';
import { getDeadlineInfo } from '../services/matchEngine';
import { Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ClosingSoonView: React.FC = () => {
  const { opportunities } = useApp();

  const urgentOpportunities = useMemo(() => {
    return opportunities
      .filter(o => o.status === 'closing_soon' || getDeadlineInfo(o.deadline).hoursLeft <= 48)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [opportunities]);

  const under12Hours = useMemo(() => {
    return urgentOpportunities.filter(o => getDeadlineInfo(o.deadline).hoursLeft <= 12 && getDeadlineInfo(o.deadline).hoursLeft > 0);
  }, [urgentOpportunities]);

  const under24Hours = useMemo(() => {
    return urgentOpportunities.filter(o => getDeadlineInfo(o.deadline).hoursLeft > 12 && getDeadlineInfo(o.deadline).hoursLeft <= 24);
  }, [urgentOpportunities]);

  const under48Hours = useMemo(() => {
    return urgentOpportunities.filter(o => getDeadlineInfo(o.deadline).hoursLeft > 24);
  }, [urgentOpportunities]);

  return (
    <div className="min-h-screen pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-8">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[#202530]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#D9FB37] mb-2">
          <Clock className="w-4 h-4 animate-pulse" />
          <span className="font-bold tracking-wider uppercase">DEADLINE INTELLIGENCE</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
          BEFORE THEY DISAPPEAR.
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 mt-1 font-sans">
          Opportunities with limited time remaining. Submit applications before links expire.
        </p>
      </div>

      {/* Critical Countdown Shelf (<12h) */}
      {under12Hours.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-4 px-3 py-1.5 bg-red-950/40 border border-red-500/40 rounded-lg text-xs font-mono text-red-300 inline-flex">
            <span className="w-2 h-2 rounded-full bg-red-500 pulse-urgent" />
            <span className="font-bold">CRITICAL: CLOSING IN UNDER 12 HOURS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {under12Hours.map((opp) => (
              opp.type === 'hackathon' ? (
                <HackathonCard key={opp.id} hackathon={opp} />
              ) : (
                <OpportunityCard key={opp.id} opportunity={opp} featured />
              )
            ))}
          </div>
        </section>
      )}

      {/* Under 24 Hours */}
      {under24Hours.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-4 text-xs font-mono text-[#D9FB37]">
            <span className="w-2 h-2 rounded-full bg-[#D9FB37] pulse-urgent" />
            <span className="font-bold uppercase">CLOSING IN 12–24 HOURS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {under24Hours.map((opp) => (
              opp.type === 'hackathon' ? (
                <HackathonCard key={opp.id} hackathon={opp} />
              ) : (
                <OpportunityCard key={opp.id} opportunity={opp} />
              )
            ))}
          </div>
        </section>
      )}

      {/* Under 48 Hours */}
      {under48Hours.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-4 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-500" />
            <span className="font-bold uppercase">CLOSING IN 24–48 HOURS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {under48Hours.map((opp) => (
              opp.type === 'hackathon' ? (
                <HackathonCard key={opp.id} hackathon={opp} />
              ) : (
                <OpportunityCard key={opp.id} opportunity={opp} />
              )
            ))}
          </div>
        </section>
      )}

      {urgentOpportunities.length === 0 && (
        <div className="py-20 text-center bg-[#101216] border border-[#202530] rounded-2xl p-8">
          <ShieldCheck className="w-10 h-10 text-[#D9FB37] mx-auto mb-3" />
          <h3 className="font-headline font-bold text-lg text-white">No immediate deadline emergencies</h3>
          <p className="text-xs text-neutral-400 mt-1">All current opportunities have comfortable submission windows.</p>
        </div>
      )}
    </div>
  );
};
