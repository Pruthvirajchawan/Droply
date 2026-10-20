import React from 'react';

interface CoolMascotProps {
  size?: number;
  className?: string;
  withGrass?: boolean;
}

export const CoolMascot: React.FC<CoolMascotProps> = ({ 
  size = 220, 
  className = '', 
  withGrass = true 
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
      >
        {/* Grass Mound */}
        {withGrass && (
          <ellipse cx="120" cy="205" rx="80" ry="22" fill="#B8EB6C" />
        )}

        {/* Shadow under shoes */}
        <ellipse cx="90" cy="202" rx="22" ry="7" fill="#111322" opacity="0.2" />
        <ellipse cx="145" cy="195" rx="24" ry="7" fill="#111322" opacity="0.2" />

        {/* Sparkle Stars around */}
        <path d="M48 90 L52 98 L60 102 L52 106 L48 114 L44 106 L36 102 L44 98 Z" fill="#FFFFFF" />
        <path d="M190 70 L193 76 L199 79 L193 82 L190 88 L187 82 L181 79 L187 76 Z" fill="#FFFFFF" />
        <path d="M195 155 L198 160 L203 162 L198 165 L195 170 L193 165 L187 162 L193 160 Z" fill="#FFFFFF" />

        {/* Character Body (Orange sphere with bold black outline) */}
        <circle cx="118" cy="115" r="54" fill="#FF783E" stroke="#111322" strokeWidth="5" />
        
        {/* Smile / Mouth */}
        <path
          d="M102 135 Q 118 148 134 135"
          stroke="#111322"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cool Sunglasses */}
        <g transform="translate(75, 84)">
          {/* Left Lens */}
          <rect x="0" y="0" width="42" height="28" rx="8" fill="#111322" stroke="#111322" strokeWidth="4" />
          <path d="M6 6 L36 6 L30 14 L6 14 Z" fill="#FFFFFF" opacity="0.25" rx="3" />
          
          {/* Bridge */}
          <rect x="38" y="8" width="16" height="7" rx="3.5" fill="#111322" />
          
          {/* Right Lens */}
          <rect x="50" y="0" width="42" height="28" rx="8" fill="#111322" stroke="#111322" strokeWidth="4" />
          <path d="M56 6 L86 6 L80 14 L56 14 Z" fill="#FFFFFF" opacity="0.25" rx="3" />
        </g>

        {/* Left Arm & Glove (Pointing / Thumbs Up) */}
        <path
          d="M70 125 Q 52 140 68 152"
          stroke="#111322"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Glove */}
        <g transform="translate(42, 132)">
          <circle cx="20" cy="18" r="14" fill="#FFFFFF" stroke="#111322" strokeWidth="4" />
          {/* Thumb */}
          <rect x="4" y="6" width="14" height="9" rx="4.5" fill="#FFFFFF" stroke="#111322" strokeWidth="3" transform="rotate(-30 4 6)" />
          {/* Cuff */}
          <rect x="18" y="24" width="12" height="6" rx="3" fill="#111322" />
        </g>

        {/* Right Arm & Glove holding Smartphone */}
        <path
          d="M164 110 Q 185 100 178 85"
          stroke="#111322"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Smartphone */}
        <g transform="translate(162, 54) rotate(15)">
          <rect x="0" y="0" width="26" height="46" rx="6" fill="#111322" stroke="#111322" strokeWidth="3" />
          <rect x="2" y="3" width="22" height="40" rx="4" fill="#FFFFFF" />
          <circle cx="13" cy="23" r="5" fill="#B8EB6C" />
          <rect x="7" y="32" width="12" height="2" rx="1" fill="#4E55E0" />
        </g>
        {/* Right Glove holding phone */}
        <g transform="translate(166, 82)">
          <circle cx="12" cy="12" r="12" fill="#FFFFFF" stroke="#111322" strokeWidth="4" />
        </g>

        {/* Legs with black strokes */}
        {/* Left Leg */}
        <path d="M102 165 L94 188" stroke="#111322" strokeWidth="6" strokeLinecap="round" />
        {/* Right Leg */}
        <path d="M136 163 L144 182" stroke="#111322" strokeWidth="6" strokeLinecap="round" />

        {/* Chunky White Sneakers */}
        {/* Left Sneaker */}
        <g transform="translate(68, 178)">
          <path
            d="M8 12 Q 22 2 34 8 L 38 18 Q 24 24 8 20 Z"
            fill="#FFFFFF"
            stroke="#111322"
            strokeWidth="4"
          />
          {/* Sneaker sole */}
          <path d="M8 18 Q 24 24 38 18" stroke="#111322" strokeWidth="4" strokeLinecap="round" />
          {/* Lace details */}
          <line x1="20" y1="8" x2="24" y2="12" stroke="#111322" strokeWidth="2.5" />
        </g>

        {/* Right Sneaker */}
        <g transform="translate(128, 170)">
          <path
            d="M8 12 Q 22 2 34 8 L 38 18 Q 24 24 8 20 Z"
            fill="#FFFFFF"
            stroke="#111322"
            strokeWidth="4"
          />
          {/* Sneaker sole */}
          <path d="M8 18 Q 24 24 38 18" stroke="#111322" strokeWidth="4" strokeLinecap="round" />
          {/* Lace details */}
          <line x1="20" y1="8" x2="24" y2="12" stroke="#111322" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
};
