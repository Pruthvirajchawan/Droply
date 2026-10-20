import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, X } from 'lucide-react';
import { CoolMascot } from '../components/CoolMascot';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [major, setMajor] = useState(profile.education.major);
  const [gradYear, setGradYear] = useState(profile.education.graduationYear);
  const [newSkillInput, setNewSkillInput] = useState('');

  const availableRoles = [
    'Software Engineering',
    'Cybersecurity',
    'Cloud & Infrastructure',
    'Fullstack Development'
  ];

  const handleSaveBasic = () => {
    updateProfile({
      name,
      email,
      education: {
        ...profile.education,
        major,
        graduationYear: gradYear
      }
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!profile.skills.includes(newSkillInput.trim())) {
      updateProfile({
        skills: [...profile.skills, newSkillInput.trim()]
      });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    updateProfile({
      skills: profile.skills.filter(s => s !== skill)
    });
  };

  const toggleRole = (role: string) => {
    const exists = profile.targetRoles.includes(role);
    const updated = exists 
      ? profile.targetRoles.filter(r => r !== role)
      : [...profile.targetRoles, role];
    updateProfile({ targetRoles: updated });
  };

  return (
    <div className="min-h-screen pb-28 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#E4E8F7]">
        <span className="text-xs font-obviously font-bold text-[#4E55E0] uppercase tracking-wider block mb-1">
          CANDIDATE PROFILE
        </span>
        <h1 className="font-obviously font-black text-4xl sm:text-5xl text-[#111322] tracking-tight">
          Your Profile
        </h1>
        <p className="text-sm text-neutral-600 font-medium mt-1">
          Manage your skills and role preferences to calculate your internship match score.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Card with Mascot */}
        <div className="p-7 bg-[#4E55E0] text-white rounded-[32px] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-obviously font-bold text-[#B8EB6C] uppercase tracking-wider">
              ACTIVE CANDIDATE
            </span>
            <h2 className="font-obviously font-black text-2xl sm:text-3xl tracking-tight">
              {profile.name}
            </h2>
            <p className="text-sm text-white/80 font-medium">
              {profile.education.major} · Class of {profile.education.graduationYear}
            </p>
          </div>

          <CoolMascot size={120} withGrass={false} />
        </div>

        {/* Basic Info */}
        <div className="p-8 bg-white border border-[#E4E8F7] rounded-[32px] space-y-4 shadow-xs">
          <h2 className="font-obviously font-black text-lg text-[#111322]">Basic Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSaveBasic}
                className="w-full px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] rounded-2xl text-xs font-medium text-[#111322] outline-none focus:border-[#4E55E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleSaveBasic}
                className="w-full px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] rounded-2xl text-xs font-medium text-[#111322] outline-none focus:border-[#4E55E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1">Academic Major</label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                onBlur={handleSaveBasic}
                className="w-full px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] rounded-2xl text-xs font-medium text-[#111322] outline-none focus:border-[#4E55E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-obviously font-bold text-neutral-700 mb-1">Graduation Year</label>
              <input
                type="text"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                onBlur={handleSaveBasic}
                className="w-full px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] rounded-2xl text-xs font-medium text-[#111322] outline-none focus:border-[#4E55E0]"
              />
            </div>
          </div>
        </div>

        {/* Target Domains */}
        <div className="p-8 bg-white border border-[#E4E8F7] rounded-[32px] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-obviously font-black text-lg text-[#111322]">Target Roles</h2>
            <span className="text-xs font-obviously font-bold text-neutral-500">{profile.targetRoles.length} selected</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableRoles.map((role) => {
              const isSelected = profile.targetRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-4 py-2 rounded-full text-xs font-obviously font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#111322] text-white shadow-xs'
                      : 'bg-[#F5F7FD] border border-[#E4E8F7] text-neutral-700 hover:border-[#111322]'
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Stack */}
        <div className="p-8 bg-white border border-[#E4E8F7] rounded-[32px] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-obviously font-black text-lg text-[#111322]">Skills Stack</h2>
            <span className="text-xs font-obviously font-bold text-[#4E55E0]">Powers Match %</span>
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="Add skill (e.g. Python, Java, Web Security, Linux)..."
              className="flex-1 px-4 py-3 bg-[#F8F9FE] border border-[#E4E8F7] rounded-full text-xs text-[#111322] placeholder:text-neutral-400 outline-none focus:border-[#4E55E0]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc] transition-colors flex items-center gap-1 shadow-md shadow-[#4E55E0]/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F5F7FD] border border-[#E4E8F7] rounded-full text-xs font-obviously font-bold text-[#111322]"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
