import React from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { CoolMascot } from '../components/CoolMascot';
import { ArrowRight } from 'lucide-react';

export const LandingView: React.FC = () => {
  const { navigateTo, opportunities, profile } = useApp();

  const internships = opportunities.filter(o => o.type === 'internship');
  const firstName = profile.name ? profile.name.split(' ')[0] : 'Pruthviraj';

  return (
    <div className="min-h-screen pb-28 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      
      {/* Clean Typographic Welcome Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8ECF8]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-obviously font-black text-3xl sm:text-4xl text-[#111322] tracking-tight leading-none">
              Welcome, {firstName}
            </h1>
            <span className="text-2xl select-none">👋</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-2">
            Verified tech internships in Bangalore with direct official career portal links.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8EB6C]/25 border border-[#B8EB6C]/50 text-xs font-obviously font-bold text-[#111322]">
            <span className="w-2 h-2 rounded-full bg-[#82C923] animate-pulse" />
            <span>{internships.length} Verified Roles in Bangalore</span>
          </div>
        </div>
      </div>

      {/* Hero Section: Royal Blue Card */}
      <section className="mb-14">
        <div className="bg-[#4E55E0] text-white rounded-[36px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(78,85,224,0.22)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Subtle star sparkles in background */}
          <div className="absolute top-6 left-8 text-white/40 text-xl font-bold select-none">✦</div>
          <div className="absolute bottom-10 right-8 text-white/40 text-2xl font-bold select-none">✦</div>

          {/* Left Text Column */}
          <div className="flex-1 text-center lg:text-left space-y-4 max-w-xl z-10">
            <h2 className="font-obviously font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-white">
              Build your future <br />
              with us
            </h2>

            <p className="text-white/85 text-sm sm:text-base font-medium max-w-md">
              Direct-apply tech internships at HPE, Honeywell Technologies, and CloudSEK in Bangalore—matched to your stack.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                type="button"
                onClick={() => navigateTo('/internships')}
                className="py-4 px-8 bg-white text-[#111322] font-obviously font-black text-base rounded-full hover:bg-neutral-100 transition-all shadow-md cursor-pointer"
              >
                Explore Internships
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/saved')}
                className="text-xs font-obviously font-bold text-white/85 hover:text-white underline underline-offset-4 transition-colors py-2 cursor-pointer"
              >
                View saved roles
              </button>
            </div>
          </div>

          {/* Right Mascot Column */}
          <div className="shrink-0 flex items-center justify-center z-10">
            <CoolMascot size={210} />
          </div>
        </div>
      </section>

      {/* Active Bangalore Internships */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-obviously font-bold text-[#4E55E0] uppercase tracking-wider block mb-1">
              VERIFIED CAREER PORTAL DROPS
            </span>
            <h2 className="font-obviously font-black text-3xl sm:text-4xl text-[#111322] tracking-tight">
              Featured Internships
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/internships')}
            className="font-obviously font-bold text-sm text-[#4E55E0] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Colorful Bento Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((opp, idx) => {
            const colors: ('yellow' | 'lime' | 'pink' | 'sky')[] = ['yellow', 'lime', 'pink', 'sky'];
            return (
              <OpportunityCard 
                key={opp.id} 
                opportunity={opp} 
                colorScheme={colors[idx % colors.length]} 
              />
            );
          })}
        </div>
      </section>

    </div>
  );
};
