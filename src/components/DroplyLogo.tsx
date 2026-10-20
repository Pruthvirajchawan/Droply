import React from 'react';

interface DroplyLogoProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'mark';
  iconColor?: string;
  textColor?: string;
  showSparkle?: boolean;
}

export const DroplyLogo: React.FC<DroplyLogoProps> = ({
  size = 36,
  className = '',
  variant = 'full',
  iconColor = 'currentColor',
  textColor = 'text-[#111322]',
  showSparkle = true
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* The Geometric Custom Droply "D" Mark from user's brand */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-105 duration-200"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Top-Left U-Cup lobe */}
          <path
            d="M0 0H46V22C46 34.7 35.7 45 23 45C10.3 45 0 34.7 0 22V0Z"
            fill={iconColor === 'currentColor' ? 'currentColor' : iconColor}
          />
          
          {/* Bottom-Left Arch/Dome lobe */}
          <path
            d="M0 100V78C0 65.3 10.3 55 23 55C35.7 55 46 65.3 46 78V100H0Z"
            fill={iconColor === 'currentColor' ? 'currentColor' : iconColor}
          />

          {/* Right Heavy D-Arch with concave star cutouts */}
          <path
            d="M56 0H64C94.9279 0 120 22.3858 120 50C120 77.6142 94.9279 100 64 100H56V80C56 68.9543 64.9543 60 76 60C64.9543 60 56 51.0457 56 40V0Z"
            fill={iconColor === 'currentColor' ? 'currentColor' : iconColor}
          />
        </svg>

        {/* Optional glowing micro-sparkle in center */}
        {showSparkle && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8EB6C] animate-ping" />
          </div>
        )}
      </div>

      {/* Brand Wordmark */}
      {variant === 'full' && (
        <div className="flex items-center gap-1.5">
          <span className={`font-obviously font-black text-2xl tracking-tight leading-none ${textColor}`}>
            Droply
          </span>
          <span className="w-2 h-2 rounded-full bg-[#4E55E0]" />
        </div>
      )}
    </div>
  );
};
