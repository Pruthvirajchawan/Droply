import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#111322] text-white rounded-full shadow-2xl text-xs font-obviously font-bold">
        <span className="w-2.5 h-2.5 rounded-full bg-[#B8EB6C]" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
