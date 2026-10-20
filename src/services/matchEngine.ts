import { Opportunity, UserProfile } from '../types';

/**
 * Calculates a match score (0-100) based on user profile preferences,
 * target roles, skills overlap, graduation year eligibility, and work mode.
 */
export function calculateMatchScore(opp: Opportunity, profile: UserProfile): { score: number; reasons: string[] } {
  let score = 40; // baseline for relevant discovered tech roles
  const reasons: string[] = [];

  // 1. Skills overlap (up to +35 points)
  if (profile.skills && profile.skills.length > 0 && opp.skills && opp.skills.length > 0) {
    const userSkillsLower = profile.skills.map(s => s.toLowerCase());
    const matchedSkills = opp.skills.filter(s => 
      userSkillsLower.some(us => us.includes(s.toLowerCase()) || s.toLowerCase().includes(us))
    );

    if (matchedSkills.length > 0) {
      const matchRatio = Math.min(1, matchedSkills.length / Math.min(opp.skills.length, 3));
      const skillBonus = Math.round(matchRatio * 35);
      score += skillBonus;
      reasons.push(`Matches your ${matchedSkills.slice(0, 3).join(', ')} skills (+${skillBonus}%)`);
    }
  }

  // 2. Target Roles overlap (up to +20 points)
  if (profile.targetRoles && profile.targetRoles.length > 0) {
    const oppText = `${opp.title} ${opp.shortDescription} ${opp.hackathonTheme || ''}`.toLowerCase();
    const matchedRole = profile.targetRoles.find(role => {
      const r = role.toLowerCase();
      if (r.includes('ai') || r.includes('ml')) return oppText.includes('ai') || oppText.includes('ml') || oppText.includes('learning');
      if (r.includes('software') || r.includes('engineer')) return oppText.includes('software') || oppText.includes('engineer') || oppText.includes('developer');
      if (r.includes('design') || r.includes('ui/ux')) return oppText.includes('design') || oppText.includes('frontend') || oppText.includes('ui');
      if (r.includes('data')) return oppText.includes('data') || oppText.includes('analytics');
      if (r.includes('security')) return oppText.includes('security') || oppText.includes('red team');
      return oppText.includes(r);
    });

    if (matchedRole) {
      score += 20;
      reasons.push(`Direct alignment with your target role: ${matchedRole}`);
    }
  }

  // 3. Work mode preference (+10 points)
  if (profile.workModes && profile.workModes.includes(opp.workMode)) {
    score += 10;
    reasons.push(`Preferred work style: ${opp.workMode.toUpperCase()} mode supported`);
  }

  // 4. Type preference (internship vs hackathon)
  if (profile.lookingFor === 'both' || 
     (profile.lookingFor === 'internship' && opp.type === 'internship') || 
     (profile.lookingFor === 'hackathons' && opp.type === 'hackathon')) {
    score += 5;
  }

  // Cap at 98% (realistic high match)
  const finalScore = Math.min(98, Math.max(45, score));

  if (reasons.length === 0) {
    reasons.push("General tech discovery matching your early career profile");
  }

  return { score: finalScore, reasons };
}

/**
 * Format deadline countdown string
 */
export function getDeadlineInfo(deadlineIso: string): {
  label: string;
  hoursLeft: number;
  isUrgent: boolean; // < 24h
  isCritical: boolean; // < 12h
  formatted: string;
} {
  const target = new Date(deadlineIso).getTime();
  const now = new Date('2026-10-04T04:32:00Z').getTime(); // Synchronized baseline
  const diffMs = target - now;
  const hoursLeft = Math.max(0, Math.round(diffMs / (3600 * 1000)));
  const daysLeft = Math.floor(hoursLeft / 24);
  const remainingHours = hoursLeft % 24;

  let label = '';
  if (hoursLeft <= 0) {
    label = 'Closed';
  } else if (hoursLeft < 1) {
    label = '< 1 hour left';
  } else if (hoursLeft <= 24) {
    label = `${hoursLeft}h left`;
  } else if (daysLeft === 1) {
    label = `1d ${remainingHours}h left`;
  } else {
    label = `${daysLeft} days left`;
  }

  return {
    label,
    hoursLeft,
    isUrgent: hoursLeft > 0 && hoursLeft <= 24,
    isCritical: hoursLeft > 0 && hoursLeft <= 12,
    formatted: new Date(deadlineIso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  };
}
