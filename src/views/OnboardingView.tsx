import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile, WorkMode } from '../types';
import { X, Check, ArrowRight, Briefcase, Zap, Trophy, Sparkles } from 'lucide-react';
import { CoolMascot } from '../components/CoolMascot';

export const OnboardingView: React.FC = () => {
  const { profile, completeOnboarding, navigateTo } = useApp();

  const [name, setName] = useState(profile.name || 'Pruthviraj');
  const [major, setMajor] = useState(profile.education?.major || 'Computer Science & AI');
  const [gradYear, setGradYear] = useState(profile.education?.graduationYear || '2027');
  const [selectedIconTheme, setSelectedIconTheme] = useState('yellow');
  const [targetRoles, setTargetRoles] = useState<string[]>(profile.targetRoles || ['Software Engineering', 'AI / ML']);
  const [skills, setSkills] = useState<string[]>(profile.skills || ['Python', 'TypeScript', 'React', 'PyTorch']);
  const [workModes, setWorkModes] = useState<WorkMode[]>(profile.workModes || ['remote', 'hybrid']);

  const availableSkills = [
    'Python', 'TypeScript', 'React', 'Next.js', 'PyTorch', 
    'C++', 'Rust', 'Go', 'PostgreSQL', 'Docker', 'Machine Learning', 
    'Figma', 'Solana', 'Tailwind CSS', 'WebSockets', 'Swift'
  ];

  const availableRoles = [
    'Software Engineering',
    'AI / ML Frontier',
    'Fullstack Web',
    'Systems & Cloud',
    'Design Engineering',
    'Data & Quant'
  ];

  const colorTiles = [
    { id: 'yellow', bg: 'bg-[#F7CD63]', icon: Briefcase },
    { id: 'pink', bg: 'bg-[#FC8FC6]', icon: Trophy },
    { id: 'blue', bg: 'bg-[#C5E0FE]', icon: Zap },
    { id: 'lime', bg: 'bg-[#B8EB6C]', icon: Sparkles },
  ];

  const toggleSkill = (sk: string) => {
    setSkills(prev => prev.includes(sk) ? prev.filter(s => s !== sk) : [...prev, sk]);
  };

  const toggleRole = (r: string) => {
    setTargetRoles(prev => prev.includes(r) ? prev.filter(role => role !== r) : [...prev, r]);
  };

  const handleFinish = () => {
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || 'Alex',
      education: {
        major,
        graduationYear: gradYear,
        college: profile.education?.college || 'University'
      },
      targetRoles: targetRoles.length > 0 ? targetRoles : ['Software Engineering'],
      workModes,
      skills: skills.length > 0 ? skills : ['Python', 'TypeScript'],
      onboarded: true
    };
    completeOnboarding(updated);
  };

  return (
    <div className="min-h-screen py-10 max-w-xl mx-auto px-4 sm:px-6">
      
      {/* Modal Container matching Reference Bottom-Right Phone */}
      <div className="bg-white border border-[#E4E8F7] rounded-[36px] p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Header with X and Title */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F2FA]">
          <button
            type="button"
            onClick={() => navigateTo('/internships')}
            className="w-8 h-8 rounded-full bg-[#F5F7FD] flex items-center justify-center text-[#111322] hover:bg-[#E8EDFC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <h1 className="font-obviously font-black text-xl sm:text-2xl text-[#111322] tracking-tight">
            Set your preferences
          </h1>

          <div className="w-8" />
        </div>

        {/* Mascot Greeting */}
        <div className="flex items-center gap-4 p-4 bg-[#F5F7FD] rounded-2xl border border-[#E4E8F7]">
          <CoolMascot size={70} withGrass={false} />
          <div>
            <span className="font-obviously font-bold text-sm text-[#111322] block">
              Personalized Matching
            </span>
            <p className="text-xs text-neutral-500 font-medium">
              We score every drop against your favorite tools and graduation year.
            </p>
          </div>
        </div>

        {/* Form Fields matching reference mockup styling */}
        <div className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diana Prince"
              className="w-full px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] focus:border-[#4E55E0] rounded-2xl text-sm font-medium text-[#111322] outline-none shadow-xs"
            />
          </div>

          {/* Academic Background / Major */}
          <div>
            <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1.5">
              Major / Background
            </label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. Computer Science & AI"
              className="w-full px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] focus:border-[#4E55E0] rounded-2xl text-sm font-medium text-[#111322] outline-none shadow-xs"
            />
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1.5">
              Graduation Year
            </label>
            <select
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] focus:border-[#4E55E0] rounded-2xl text-sm font-medium text-[#111322] outline-none shadow-xs"
            >
              <option value="2025">Class of 2025</option>
              <option value="2026">Class of 2026</option>
              <option value="2027">Class of 2027</option>
              <option value="2028">Class of 2028</option>
            </select>
          </div>

          {/* Theme Color Tiles directly from Reference */}
          <div>
            <label className="block text-xs font-obviously font-bold text-neutral-700 mb-2">
              Favorite Theme Accent
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colorTiles.map((tile) => {
                const isSelected = selectedIconTheme === tile.id;
                const Icon = tile.icon;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => setSelectedIconTheme(tile.id)}
                    className={`h-16 rounded-2xl ${tile.bg} flex items-center justify-center text-[#111322] transition-transform active:scale-95 ${
                      isSelected ? 'ring-3 ring-[#4E55E0] scale-105 shadow-sm' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <label className="block text-xs font-obviously font-bold text-neutral-700 mb-2">
              Tech Stack &amp; Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map((sk) => {
                const isSelected = skills.includes(sk);
                return (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => toggleSkill(sk)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-obviously font-bold transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#111322] text-white shadow-xs'
                        : 'bg-[#F5F7FD] border border-[#E4E8F7] text-neutral-700 hover:border-[#111322]'
                    }`}
                  >
                    <span>{sk}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#B8EB6C]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Roles */}
          <div>
            <label className="block text-xs font-obviously font-bold text-neutral-700 mb-2">
              Target Domains
            </label>
            <div className="space-y-1.5">
              {availableRoles.map((role) => {
                const isSelected = targetRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`w-full p-3 rounded-2xl border text-xs font-obviously font-bold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#F5F7FD] border-[#4E55E0] text-[#4E55E0]'
                        : 'bg-white border-[#E4E8F7] text-neutral-700 hover:border-[#111322]'
                    }`}
                  >
                    <span>{role}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#4E55E0]" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Big Royal Blue CTA button like Reference */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleFinish}
            className="w-full py-4 bg-[#4E55E0] text-white font-obviously font-black text-base rounded-full hover:bg-[#3f46cc] transition-transform active:scale-95 shadow-md shadow-[#4E55E0]/25 flex items-center justify-center gap-2"
          >
            <span>Save &amp; View Opportunities</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
