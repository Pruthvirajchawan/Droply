import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Briefcase, Bookmark, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentRoute, navigateTo, savedIds } = useApp();

  return (
    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[88%] max-w-xs">
      <div className="bg-white/95 backdrop-blur-lg border border-[#E2E6F5] rounded-full p-2 px-5 shadow-xl flex items-center justify-between">
        
        {/* Home */}
        <button
          type="button"
          onClick={() => navigateTo('/')}
          className={`p-2.5 rounded-full transition-colors cursor-pointer ${
            currentRoute === '/'
              ? 'text-[#4E55E0] bg-[#4E55E0]/10'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
          title="Home"
        >
          <Home className="w-5 h-5" />
        </button>

        {/* Internships */}
        <button
          type="button"
          onClick={() => navigateTo('/internships')}
          className={`p-2.5 rounded-full transition-colors cursor-pointer ${
            currentRoute === '/internships'
              ? 'text-[#4E55E0] bg-[#4E55E0]/10'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
          title="Internships"
        >
          <Briefcase className="w-5 h-5" />
        </button>

        {/* Saved */}
        <button
          type="button"
          onClick={() => navigateTo('/saved')}
          className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${
            currentRoute === '/saved'
              ? 'text-[#4E55E0] bg-[#4E55E0]/10'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
          title="Saved"
        >
          <Bookmark className="w-5 h-5" />
          {savedIds.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF783E]" />
          )}
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => navigateTo('/profile')}
          className={`p-2.5 rounded-full transition-colors cursor-pointer ${
            currentRoute === '/profile'
              ? 'text-[#4E55E0] bg-[#4E55E0]/10'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
          title="Profile"
        >
          <User className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};
