import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Opportunity, UserProfile, ApplicationRecord, AdminSource, ViewRoute, OpportunityStatus } from '../types';
import { INITIAL_OPPORTUNITIES, INITIAL_SOURCES, DEFAULT_USER_PROFILE } from '../data/seedOpportunities';
import { calculateMatchScore, getDeadlineInfo } from '../services/matchEngine';
import { parseRawOpportunityWithGemini, ExtractedOpportunityData } from '../services/geminiService';

interface AppContextType {
  // Navigation
  currentRoute: string;
  navigateTo: (route: string) => void;

  // User Profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (newProfile: UserProfile) => void;
  resetProfile: () => void;

  // Opportunities & Hackathons
  opportunities: Opportunity[];
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  applications: ApplicationRecord[];
  recordApplication: (opportunityId: string, notes?: string) => void;
  updateApplicationStatus: (opportunityId: string, status: ApplicationRecord['status'], notes?: string) => void;

  // Admin & Operations
  sources: AdminSource[];
  addOpportunity: (opp: Partial<Opportunity>) => Opportunity;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  verifyOpportunity: (id: string) => void;
  ingestWithAI: (rawText: string) => Promise<Opportunity>;

  // Global UI & Command Palette
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  selectedOpportunityForApply: Opportunity | null;
  setSelectedOpportunityForApply: (opp: Opportunity | null) => void;
  
  // Toasts
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Derived Stats
  radarStats: {
    totalNew: number;
    closingSoon: number;
    highMatchCount: number;
    totalActive: number;
  };
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  PROFILE: 'droply_profile_blr_v5',
  OPPORTUNITIES: 'droply_opportunities_blr_v5',
  SAVED: 'droply_saved_blr_v5',
  APPLICATIONS: 'droply_apps_blr_v5',
  SOURCES: 'droply_sources_blr_v5',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing state
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname === '/' ? '/' : window.location.pathname;
    }
    return '/';
  });

  // Profile state
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_USER_PROFILE;
  });

  // Opportunities state
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
      if (saved) {
        const parsed: Opportunity[] = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_OPPORTUNITIES;
  });

  // Saved IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ["opp-hpe-swe-blr"];
  });

  // Applications
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Sources
  const [sources, setSources] = useState<AdminSource[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOURCES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SOURCES;
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedOpportunityForApply, setSelectedOpportunityForApply] = useState<Opportunity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opportunities));
    } catch {}
  }, [opportunities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch {}
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOURCES, JSON.stringify(sources));
    } catch {}
  }, [sources]);

  // Recalculate dynamic match scores whenever profile or opportunities change
  const opportunitiesWithMatches = useMemo(() => {
    return opportunities.map(opp => {
      const { score, reasons } = calculateMatchScore(opp, profile);
      const deadlineInfo = getDeadlineInfo(opp.deadline);
      
      let status: OpportunityStatus = opp.status;
      if (deadlineInfo.hoursLeft <= 0) {
        status = 'closed';
      } else if (deadlineInfo.hoursLeft <= 24 && status !== 'closed') {
        status = 'closing_soon';
      }

      return {
        ...opp,
        status,
        matchScore: score,
        matchReasons: reasons
      };
    });
  }, [opportunities, profile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    showToast("Radar preferences updated.");
  };

  const completeOnboarding = (newProfile: UserProfile) => {
    setProfile({ ...newProfile, onboarded: true });
    navigateTo('/internships');
    showToast("Preferences saved. Viewing tailored matches.");
  };

  const resetProfile = () => {
    setProfile(DEFAULT_USER_PROFILE);
    setOpportunities(INITIAL_OPPORTUNITIES);
    setSavedIds(["opp-hpe-swe-blr"]);
    showToast("Profile and internships reset to default.");
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Removed from saved.");
        return prev.filter(item => item !== id);
      } else {
        showToast("Saved to your radar list.");
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const recordApplication = (opportunityId: string, notes?: string) => {
    setApplications(prev => {
      const filtered = prev.filter(a => a.opportunityId !== opportunityId);
      return [
        {
          opportunityId,
          status: 'applied',
          appliedAt: new Date().toISOString(),
          notes: notes || "Application submitted via external portal."
        },
        ...filtered
      ];
    });
    showToast("Application marked as submitted!");
  };

  const updateApplicationStatus = (opportunityId: string, status: ApplicationRecord['status'], notes?: string) => {
    setApplications(prev => {
      const exists = prev.find(a => a.opportunityId === opportunityId);
      if (exists) {
        return prev.map(a => a.opportunityId === opportunityId ? { ...a, status, notes: notes !== undefined ? notes : a.notes } : a);
      } else {
        return [
          {
            opportunityId,
            status,
            appliedAt: new Date().toISOString(),
            notes: notes || ""
          },
          ...prev
        ];
      }
    });
    showToast(`Application status updated to ${status}.`);
  };

  const addOpportunity = (opp: Partial<Opportunity>): Opportunity => {
    const newId = opp.id || `opp-custom-${Date.now()}`;
    const nowIso = new Date().toISOString();
    const deadlineIso = opp.deadline || new Date(Date.now() + 48 * 3600 * 1000).toISOString();

    const fullOpp: Opportunity = {
      id: newId,
      title: opp.title || "Software Engineering Intern",
      company: opp.company || "Frontier Tech Co",
      companyType: opp.companyType || "Technology",
      companyLogo: opp.companyLogo || "⚡",
      type: opp.type || "internship",
      shortDescription: opp.shortDescription || "Exciting early career role building next-generation technology.",
      description: opp.description || "Join our fast-growing engineering team.",
      keyHighlights: opp.keyHighlights || ["High impact ownership", "Competitive compensation"],
      skills: opp.skills || ["TypeScript", "Python"],
      eligibility: opp.eligibility || ["Active student or early career developer"],
      location: opp.location || "Remote",
      workMode: opp.workMode || "remote",
      stipend: opp.stipend || "$8,000 / month",
      duration: opp.duration || "12 weeks",
      deadline: deadlineIso,
      applicationUrl: opp.applicationUrl || "https://example.com/apply",
      sourceUrl: opp.sourceUrl || "https://example.com",
      source: opp.source || "Manual Ingestion",
      status: "new",
      postedAt: nowIso,
      discoveredAt: nowIso,
      lastVerifiedAt: nowIso,
      verified: true,
      applicantCount: 1,
      ...opp
    };

    setOpportunities(prev => [fullOpp, ...prev]);
    showToast(`Published "${fullOpp.title}" to live radar.`);
    return fullOpp;
  };

  const updateOpportunity = (id: string, updates: Partial<Opportunity>) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, ...updates, lastVerifiedAt: new Date().toISOString() } : o));
    showToast("Opportunity updated.");
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
    showToast("Opportunity removed.");
  };

  const verifyOpportunity = (id: string) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, verified: true, lastVerifiedAt: new Date().toISOString() } : o));
    showToast("Opportunity verified.");
  };

  const ingestWithAI = async (rawText: string): Promise<Opportunity> => {
    const extracted: ExtractedOpportunityData = await parseRawOpportunityWithGemini(rawText);
    const deadlineIso = new Date(Date.now() + (extracted.deadlineHoursFromNow || 48) * 3600 * 1000).toISOString();
    
    const newOpp: Opportunity = {
      id: `ai-drop-${Date.now()}`,
      title: extracted.title,
      company: extracted.company,
      companyType: extracted.type === 'hackathon' ? 'Hackathon Organizer' : 'Technology Lab',
      companyLogo: extracted.type === 'hackathon' ? '🏆' : '✨',
      type: extracted.type,
      shortDescription: extracted.shortDescription,
      description: extracted.description,
      keyHighlights: extracted.keyHighlights,
      skills: extracted.skills,
      eligibility: extracted.eligibility,
      location: extracted.location,
      workMode: extracted.workMode,
      stipend: extracted.stipend,
      duration: extracted.duration,
      deadline: deadlineIso,
      applicationUrl: "https://droply.dev/apply",
      source: extracted.source,
      status: 'new',
      postedAt: new Date().toISOString(),
      discoveredAt: new Date().toISOString(),
      lastVerifiedAt: new Date().toISOString(),
      verified: true,
      prizePool: extracted.prizePool,
      hackathonTheme: extracted.hackathonTheme,
      teamSize: extracted.teamSize
    };

    setOpportunities(prev => [newOpp, ...prev]);
    showToast(`AI Ingested: ${newOpp.title} at ${newOpp.company}`);
    return newOpp;
  };

  // Keyboard shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setSelectedOpportunityForApply(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute Radar statistics
  const radarStats = useMemo(() => {
    let totalNew = 0;
    let closingSoon = 0;
    let highMatchCount = 0;
    let totalActive = 0;

    opportunitiesWithMatches.forEach(o => {
      if (o.status !== 'closed') totalActive++;
      if (o.status === 'new') totalNew++;
      if (o.status === 'closing_soon') closingSoon++;
      if ((o.matchScore || 0) >= 80) highMatchCount++;
    });

    return { totalNew, closingSoon, highMatchCount, totalActive };
  }, [opportunitiesWithMatches]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        profile,
        updateProfile,
        completeOnboarding,
        resetProfile,
        opportunities: opportunitiesWithMatches,
        savedIds,
        toggleSave,
        isSaved,
        applications,
        recordApplication,
        updateApplicationStatus,
        sources,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        verifyOpportunity,
        ingestWithAI,
        searchQuery,
        setSearchQuery,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        selectedOpportunityForApply,
        setSelectedOpportunityForApply,
        toastMessage,
        showToast,
        radarStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
