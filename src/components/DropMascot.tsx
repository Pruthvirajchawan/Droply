import React from 'react';

interface DropMascotProps {
  className?: string;
  mood?: 'happy' | 'dancing' | 'searching' | 'celebrating';
  size?: number;
}

export const DropMascot: React.FC<DropMascotProps> = ({ className = '', mood = 'dancing', size = 160 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
        style={{ animationDuration: '3s' }}
      >
        {/* Glow backdrop */}
        <circle cx="100" cy="100" r="70" fill="#B8FF00" fillOpacity="0.15" className="blur-xl" />

        {/* Squiggly background radar spark */}
        <path
          d="M170 30L175 45L190 50L175 55L170 70L165 55L150 50L165 45L170 30Z"
          fill="#B8FF00"
        />

        {/* Headphones Arch */}
        <path
          d="M50 85 C50 40, 150 40, 150 85"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Earcups */}
        <rect x="38" y="75" width="16" height="30" rx="8" fill="#121316" stroke="#FFFFFF" strokeWidth="4" />
        <rect x="146" y="75" width="16" height="30" rx="8" fill="#121316" stroke="#FFFFFF" strokeWidth="4" />

        {/* Main Body (Playful Rounded Drop / Radar Character) */}
        <path
          d="M100 55 C135 55, 145 80, 145 110 C145 140, 125 155, 100 155 C75 155, 55 140, 55 110 C55 80, 65 55, 100 55 Z"
          fill="#B8FF00"
          stroke="#0A0B0D"
          strokeWidth="6"
        />

        {/* Expressive Face */}
        {mood === 'dancing' && (
          <>
            {/* Happy closed curve eyes */}
            <path d="M80 95 Q87 88 94 95" stroke="#0A0B0D" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M106 95 Q113 88 120 95" stroke="#0A0B0D" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Joyful open mouth */}
            <path d="M92 110 Q100 124 108 110 Z" fill="#0A0B0D" />
            {/* Rosy cheeks */}
            <circle cx="75" cy="105" r="4" fill="#0A0B0D" fillOpacity="0.2" />
            <circle cx="125" cy="105" r="4" fill="#0A0B0D" fillOpacity="0.2" />
          </>
        )}

        {mood === 'searching' && (
          <>
            {/* Big curious eyes */}
            <circle cx="85" cy="95" r="8" fill="#0A0B0D" />
            <circle cx="87" cy="92" r="3" fill="#FFFFFF" />
            <circle cx="115" cy="95" r="8" fill="#0A0B0D" />
            <circle cx="117" cy="92" r="3" fill="#FFFFFF" />
            <path d="M95 115 Q100 120 105 115" stroke="#0A0B0D" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {/* Dancing / Peace sign Left Hand */}
        <path
          d="M60 115 L35 90 L28 95 L40 105 L25 100 L25 108 L55 125"
          fill="#B8FF00"
          stroke="#0A0B0D"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Right Hand raised in rhythm */}
        <path
          d="M140 115 L165 80 L160 70 L170 72 L175 88 L145 128"
          fill="#B8FF00"
          stroke="#0A0B0D"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Legs & Chunky Sneakers */}
        {/* Left Leg */}
        <path d="M85 152 L80 175" stroke="#0A0B0D" strokeWidth="6" strokeLinecap="round" />
        <path d="M65 175 C65 168, 90 168, 95 175 L95 182 L65 182 Z" fill="#FFFFFF" stroke="#0A0B0D" strokeWidth="4" />

        {/* Right Leg in step */}
        <path d="M115 152 L125 172" stroke="#0A0B0D" strokeWidth="6" strokeLinecap="round" />
        <path d="M115 172 C115 165, 140 165, 145 172 L145 180 L115 180 Z" fill="#FFFFFF" stroke="#0A0B0D" strokeWidth="4" />
      </svg>
    </div>
  );
};
