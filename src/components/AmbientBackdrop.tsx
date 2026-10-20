import React from 'react';

export const AmbientBackdrop: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* Subtle soft orange glow in top corner */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#FF7300]/5 rounded-full blur-3xl" />
      {/* Subtle soft lavender glow in bottom corner */}
      <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] bg-[#B78EF3]/5 rounded-full blur-3xl" />
    </div>
  );
};
