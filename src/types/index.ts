export type WorkMode = 'remote' | 'hybrid' | 'onsite';
export type OpportunityType = 'internship' | 'hackathon';
export type OpportunityStatus = 'new' | 'active' | 'closing_soon' | 'closed' | 'verification_needed';
export type ApplicationStatus = 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyType?: string; // e.g. "AI Lab", "FinTech Unicorn", "Open Source Collective", "Enterprise"
  type: OpportunityType;
  shortDescription: string;
  description: string;
  keyHighlights: string[];
  skills: string[];
  eligibility: string[];
  location: string;
  workMode: WorkMode;
  stipend: string;
  stipendNumeric?: number; // per month in USD or INR for filtering
  stipendPeriod?: 'month' | 'total' | 'hourly';
  duration: string;
  deadline: string; // ISO string
  applicationUrl: string;
  sourceUrl?: string;
  source: string; // e.g. "Direct Career Portal", "Y Combinator", "Devpost", "GitHub Early Careers"
  status: OpportunityStatus;
  postedAt: string; // ISO string
  discoveredAt: string; // ISO string
  lastVerifiedAt: string; // ISO string
  verified: boolean;
  applicantCount?: number;
  matchScore?: number; // 0 - 100
  matchReasons?: string[];
  featured?: boolean;

  // Hackathon specific fields
  prizePool?: string;
  prizePoolNumeric?: number;
  hackathonTheme?: string;
  teamSize?: string;
  prizesList?: { place: string; amount: string; description: string }[];
  timelineSteps?: { date: string; title: string; desc: string }[];
  rules?: string[];
  faq?: { q: string; a: string }[];
}

export interface UserEducation {
  major: string;
  graduationYear: string;
  college?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  education: UserEducation;
  lookingFor: 'internship' | 'hackathons' | 'both';
  targetRoles: string[];
  workModes: WorkMode[];
  preferredLocations: string[];
  skills: string[];
  bio?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  alertSettings: {
    closingSoonHours: number;
    minMatchScore: number;
    emailAlerts: boolean;
    browserAlerts: boolean;
  };
  onboarded: boolean;
  createdAt: string;
}

export interface ApplicationRecord {
  opportunityId: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes?: string;
  interviewDate?: string;
}

export interface AdminSource {
  id: string;
  name: string;
  category: string;
  url: string;
  lastScraped: string;
  status: 'active' | 'rate_limited' | 'error';
  discoveredCount: number;
  verifiedRate: string;
}

export interface SystemMetrics {
  activeCount: number;
  newToday: number;
  closingToday: number;
  closedToday: number;
  verificationPending: number;
  applicationsClicked: number;
  topCategories: { name: string; count: number }[];
}

export type ViewRoute = 
  | '/'
  | '/onboarding'
  | '/discover'
  | '/internships'
  | '/hackathons'
  | '/closing-soon'
  | '/saved'
  | `/opportunity/${string}`
  | `/hackathon/${string}`
  | '/profile'
  | '/settings'
  | '/admin'
  | '/admin/opportunities'
  | '/admin/sources'
  | '/admin/users'
  | '/admin/analytics';
