import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { QuickApplyModal } from './components/QuickApplyModal';
import { Toast } from './components/Toast';
import { SmoothButtonEffects } from './components/SmoothButtonEffects';
import { DroplyLogo } from './components/DroplyLogo';

import { LandingView } from './views/LandingView';
import { OnboardingView } from './views/OnboardingView';
import { InternshipsView } from './views/InternshipsView';
import { SavedView } from './views/SavedView';
import { ProfileView } from './views/ProfileView';
import { OpportunityDetailView } from './views/OpportunityDetailView';

const AppRouter: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();

  const renderRoute = () => {
    if (currentRoute === '/') {
      return <LandingView />;
    }
    if (currentRoute === '/onboarding') {
      return <OnboardingView />;
    }
    if (currentRoute === '/internships') {
      return <InternshipsView />;
    }
    if (currentRoute === '/saved') {
      return <SavedView />;
    }
    if (currentRoute === '/profile') {
      return <ProfileView />;
    }
    if (currentRoute.startsWith('/opportunity/')) {
      const id = currentRoute.replace('/opportunity/', '');
      return <OpportunityDetailView id={id} />;
    }

    return <LandingView />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FD] text-[#111322] selection:bg-[#B8EB6C] selection:text-[#111322] relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 relative z-10">
        {renderRoute()}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-[#E4E8F7] bg-white py-10 px-4 sm:px-6 mb-20 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <DroplyLogo size={28} variant="full" textColor="text-[#111322]" />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600 font-obviously font-bold">
            <button type="button" onClick={() => navigateTo('/')} className="hover:text-[#4E55E0] transition-colors cursor-pointer">
              Home
            </button>
            <button type="button" onClick={() => navigateTo('/internships')} className="hover:text-[#4E55E0] transition-colors cursor-pointer">
              Internships
            </button>
            <button type="button" onClick={() => navigateTo('/saved')} className="hover:text-[#4E55E0] transition-colors cursor-pointer">
              Saved
            </button>
            <button type="button" onClick={() => navigateTo('/profile')} className="hover:text-[#4E55E0] transition-colors cursor-pointer">
              Profile
            </button>
          </div>

          <div className="text-xs text-neutral-500 font-medium">
            © {new Date().getFullYear()} Droply · Verified Bangalore Internships.
          </div>
        </div>
      </footer>

      <MobileNav />
      <QuickApplyModal />
      <Toast />
      <SmoothButtonEffects />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
