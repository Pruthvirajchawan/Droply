import React from 'react';
import { WorkMode } from '../types';

export interface FilterState {
  role: string;
  workMode: string;
  sortBy: 'recommended' | 'newest' | 'closing_soon' | 'highest_match';
  search: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  availableRoles?: string[];
  showRoleFilter?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  availableRoles = ["All Roles", "AI / ML", "Software Engineering", "Fullstack", "Systems / Cloud", "Design", "Security"],
  showRoleFilter = true
}) => {
  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Highest Match', value: 'highest_match' },
    { label: 'Closing Soon', value: 'closing_soon' },
    { label: 'Just Dropped', value: 'newest' },
  ];

  const workModes = [
    { label: 'All Modes', value: 'all' },
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Onsite', value: 'onsite' },
  ];

  return (
    <div className="space-y-3 mb-6">
      {/* Top Filter Row: Segmented controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Work mode tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#101216] border border-[#202530] rounded-lg text-xs overflow-x-auto">
          {workModes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => onFilterChange({ workMode: mode.value })}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                filters.workMode === mode.value
                  ? 'bg-[#1D222D] text-[#D9FB37] font-bold border border-[#D9FB37]/30 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Sort by dropdown / segmented */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-neutral-400 text-[11px] uppercase">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="px-3 py-1.5 bg-[#101216] border border-[#202530] rounded-lg text-white text-xs outline-none focus:border-[#D9FB37]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#101216] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Role filter chips */}
      {showRoleFilter && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {availableRoles.map((r) => {
            const isSelected = (filters.role === 'all' && r === 'All Roles') || filters.role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => onFilterChange({ role: r === 'All Roles' ? 'all' : r })}
                className={`px-3 py-1.5 rounded-full font-headline font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#D9FB37] text-[#090A0C]'
                    : 'bg-[#14171E] border border-[#242A36] text-neutral-400 hover:text-white hover:border-neutral-500'
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
