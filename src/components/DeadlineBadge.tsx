import React from 'react';
import { getDeadlineInfo } from '../services/matchEngine';

interface DeadlineBadgeProps {
  deadline: string;
  status?: string;
  className?: string;
  compact?: boolean;
}

export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ deadline, status, className = '', compact = false }) => {
  const info = getDeadlineInfo(deadline);

  if (status === 'closed' || info.hoursLeft <= 0) {
    return (
      <div className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-neutral-400 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
        <span>CLOSED</span>
      </div>
    );
  }

  if (info.isCritical) {
    return (
      <div className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#D9FB37] ${className}`}>
        <span className="w-2 h-2 rounded-full bg-[#D9FB37] pulse-urgent shadow-[0_0_8px_#D9FB37]" />
        <span>CLOSES IN {info.hoursLeft}H</span>
      </div>
    );
  }

  if (info.isUrgent) {
    return (
      <div className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[#D9FB37]/90 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D9FB37]" />
        <span>{info.hoursLeft}H LEFT</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
      <span>{compact ? info.label : `CLOSES IN ${info.label.toUpperCase()}`}</span>
    </div>
  );
};
