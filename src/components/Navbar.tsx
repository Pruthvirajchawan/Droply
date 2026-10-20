import React from 'react';
import { useApp } from '../context/AppContext';
import { DroplyLogo } from './DroplyLogo';
import { Bookmark, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigateTo, savedIds } = useApp();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Internships', path: '/internships' },
    { label: 'Saved', path: '/saved', count: savedIds.length },
    { label: 'Profile', path: '/profile' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F7FD]/90 backdrop-blur-md border-b border-[#E4E8F7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Clean Droply Brand Logo */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 focus:outline-none group text-left cursor-pointer"
          >
            <DroplyLogo 
              size={34} 
              variant="full" 
              textColor="text-[#111322] group-hover:text-[#4E55E0] transition-colors"
            />
          </button>
        </div>

        {/* Center: Clean Essential Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-obviously font-bold">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigateTo(item.path)}
                className={`relative py-2 transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive ? 'text-[#4E55E0] font-black scale-102' : 'text-neutral-600 hover:text-[#111322]'
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#B8EB6C] text-[#111322] font-black shadow-2xs">
                    {item.count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#4E55E0] rounded-full animate-in fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Essential Quick Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigateTo('/saved')}
            className="relative px-4 py-2.5 rounded-full bg-white border border-[#E2E6F5] flex items-center gap-2 text-xs font-obviously font-bold text-neutral-700 hover:text-[#4E55E0] hover:border-[#4E55E0] transition-all shadow-xs cursor-pointer"
            title="Saved Internships"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#4E55E0]" />
            <span className="hidden sm:inline">Saved</span>
            {savedIds.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#B8EB6C] text-[#111322] text-[10px] font-black">
                {savedIds.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/profile')}
            className="w-10 h-10 rounded-full bg-[#4E55E0] text-white flex items-center justify-center hover:bg-[#3f46cc] transition-all shadow-xs cursor-pointer"
            title="Your Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
