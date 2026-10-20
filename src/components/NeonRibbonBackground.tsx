import React from 'react';

export const NeonRibbonBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-30">
      <svg
        className="absolute -top-24 -left-20 w-[140vw] max-w-[1400px] h-[120vh]"
        viewBox="0 0 1200 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft atmospheric blurred glow */}
        <path
          d="M-100 200 C 300 -50, 600 450, 450 700 C 300 950, 750 850, 1100 600 C 1300 450, 1150 150, 1300 50"
          stroke="#B8FF00"
          strokeWidth="60"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="blur-3xl opacity-20"
        />

        {/* Clean crisp squiggly ribbon matching reference */}
        <path
          d="M-100 200 C 300 -50, 600 450, 450 700 C 300 950, 750 850, 1100 600 C 1300 450, 1150 150, 1300 50"
          stroke="#B8FF00"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        />

        {/* Asterisks / Sparkles in corners like reference */}
        <g transform="translate(1050, 80) scale(1.2)">
          <path d="M0 -15 L0 15 M-15 0 L15 0 M-11 -11 L11 11 M-11 11 L11 -11" stroke="#B8FF00" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g transform="translate(120, 880) scale(0.9)">
          <path d="M0 -15 L0 15 M-15 0 L15 0 M-11 -11 L11 11 M-11 11 L11 -11" stroke="#B8FF00" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
