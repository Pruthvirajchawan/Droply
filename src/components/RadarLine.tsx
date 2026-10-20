import React from 'react';

interface RadarLineProps {
  className?: string;
  variant?: 'line' | 'circle' | 'sweep';
}

export const RadarLine: React.FC<RadarLineProps> = ({ className = '', variant = 'line' }) => {
  if (variant === 'circle') {
    return (
      <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
        {/* Concentric rings */}
        <div className="absolute w-72 h-72 rounded-full border border-[#D9FB37]/10 animate-ping opacity-25" style={{ animationDuration: '4s' }} />
        <div className="absolute w-56 h-56 rounded-full border border-[#D9FB37]/15" />
        <div className="absolute w-36 h-36 rounded-full border border-[#D9FB37]/25" />
        <div className="absolute w-20 h-20 rounded-full border border-[#D9FB37]/40" />
        {/* Center dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#D9FB37] shadow-[0_0_12px_#D9FB37]" />
        {/* Rotating sweep line */}
        <div className="absolute w-72 h-72 rounded-full overflow-hidden">
          <div className="w-full h-full radar-beam" />
        </div>
      </div>
    );
  }

  if (variant === 'sweep') {
    return (
      <div className={`relative w-full h-[2px] overflow-hidden bg-white/5 ${className}`}>
        <div 
          className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-[#D9FB37] to-transparent animate-pulse"
          style={{
            animation: 'radar-sweep 3s ease-in-out infinite alternate',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <svg className="w-full h-8 stroke-current text-[#D9FB37]/30" fill="none" viewBox="0 0 1200 32" preserveAspectRatio="none">
        <path
          d="M0 16 Q 300 0, 600 16 T 1200 16"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle cx="600" cy="16" r="4" fill="#D9FB37" className="animate-pulse" />
      </svg>
    </div>
  );
};
