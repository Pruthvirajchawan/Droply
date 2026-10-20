import { Opportunity, AdminSource } from '../types';

const now = Date.now();
const daysFromNow = (d: number) => new Date(now + d * 24 * 3600 * 1000).toISOString();
const hoursAgo = (h: number) => new Date(now - h * 3600 * 1000).toISOString();
const minutesAgo = (m: number) => new Date(now - m * 60 * 1000).toISOString();

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-hpe-swe-blr",
    title: "Software Engineering Intern",
    company: "HPE",
    companyType: "Enterprise Cloud & Infrastructure",
    companyLogo: "💻",
    type: "internship",
    shortDescription: "Join Hewlett Packard Enterprise in Bangalore to build scalable cloud software, enterprise systems, and distributed backend services.",
    description: "Hewlett Packard Enterprise (HPE) is looking for a Software Engineering Intern in Bangalore. You will collaborate with senior engineering teams on enterprise cloud solutions, design and maintain backend services, troubleshoot complex system issues, and contribute to production software development in a hybrid engineering environment.",
    keyHighlights: [
      "₹40,000 / month stipend",
      "Hands-on mentorship with HPE Global IT & Cloud engineering teams in Bangalore",
      "Opportunity for Pre-Placement Offer (PPO) conversion upon graduation",
      "Work on enterprise-scale hybrid cloud and networking systems"
    ],
    skills: ["Python", "Java", "C++", "Data Structures", "Linux", "Cloud Computing"],
    eligibility: [
      "Pursuing B.E. / B.Tech / M.Tech in Computer Science, Information Technology, or related engineering discipline",
      "Strong fundamentals in Data Structures, Algorithms, and Object-Oriented Programming",
      "Available for internship in Bangalore"
    ],
    location: "Bangalore",
    workMode: "hybrid",
    stipend: "₹40,000 / month",
    stipendNumeric: 40000,
    stipendPeriod: "month",
    duration: "6 months",
    deadline: daysFromNow(14),
    applicationUrl: "https://careers.hpe.com/us/en/india-early-careers",
    sourceUrl: "https://careers.hpe.com/India",
    source: "HPE Official Careers Portal",
    status: "active",
    postedAt: hoursAgo(6),
    discoveredAt: minutesAgo(30),
    lastVerifiedAt: minutesAgo(10),
    verified: true,
    applicantCount: 145,
    featured: true
  },
  {
    id: "opp-honeywell-swe-blr",
    title: "SWE Intern",
    company: "Honeywell Technologies",
    companyType: "Industrial Tech & Software",
    companyLogo: "⚙️",
    type: "internship",
    shortDescription: "Develop mission-critical software solutions, automation platforms, and connected systems with Honeywell Technologies in Bangalore.",
    description: "Honeywell Technologies is hiring a Software Engineering (SWE) Intern in Bangalore (Intern Bachelors Software Eng - Req #159820). Interns gain hands-on experience designing, coding, and testing real-world software applications, participating in code reviews, and collaborating with cross-functional engineering teams.",
    keyHighlights: [
      "Direct placement with Honeywell Technology Solutions in Bangalore",
      "Build production software across connected enterprise and automation systems",
      "Structured mentorship, code reviews, and agile engineering sprints",
      "Strong pipeline for full-time software engineering roles"
    ],
    skills: ["Java", "Python", "C#", "React", "Software Engineering", "Git", "SQL"],
    eligibility: [
      "Pursuing Bachelor's degree (B.E. / B.Tech) in Computer Science, Software Engineering, or related field",
      "Solid programming skills and familiarity with software development lifecycle",
      "Based in or willing to work in Bangalore"
    ],
    location: "Bangalore",
    workMode: "onsite",
    stipend: "₹35,000 – ₹45,000 / month",
    stipendNumeric: 40000,
    stipendPeriod: "month",
    duration: "6 months",
    deadline: daysFromNow(10),
    applicationUrl: "https://careers.honeywell.com/en/sites/Honeywell/job/159820",
    sourceUrl: "https://careers.honeywell.com/en/sites/Honeywell/jobs?location=India&locationId=300000000469485&locationLevel=country&mode=location",
    source: "Honeywell Careers Portal",
    status: "active",
    postedAt: hoursAgo(12),
    discoveredAt: minutesAgo(45),
    lastVerifiedAt: minutesAgo(15),
    verified: true,
    applicantCount: 190,
    featured: true
  },
  {
    id: "opp-cloudsek-sec-blr",
    title: "Security Consultant Intern",
    company: "CloudSEK",
    companyType: "AI Cyber Threat Intelligence",
    companyLogo: "🛡️",
    type: "internship",
    shortDescription: "Conduct vulnerability assessments, threat intelligence research, and security audits for enterprise clients at CloudSEK in Bangalore.",
    description: "CloudSEK is hiring a Security Consultant Intern in Bangalore via Greenhouse. As part of the security consulting and research team, you will analyze digital threats, perform web/mobile application penetration testing, validate security exposures discovered by CloudSEK's AI platform, and assist enterprise customers in remediating critical vulnerabilities.",
    keyHighlights: [
      "Work directly with CloudSEK's cyber intelligence and red-team researchers in Bangalore",
      "Hands-on exposure to VAPT, OSINT, and AI-driven digital risk protection",
      "Earn While You Learn internship program with full-time conversion path",
      "Official application hosted on CloudSEK's Greenhouse portal"
    ],
    skills: ["Web Security", "Penetration Testing", "OWASP", "Network Security", "Python", "Linux"],
    eligibility: [
      "Undergraduate or postgraduate student with strong interest in Cybersecurity and VAPT",
      "Familiarity with OWASP Top 10, Burp Suite, network protocols, and vulnerability assessment",
      "Available to work from CloudSEK's Bangalore office"
    ],
    location: "Bangalore",
    workMode: "onsite",
    stipend: "₹30,000 – ₹40,000 / month",
    stipendNumeric: 35000,
    stipendPeriod: "month",
    duration: "6 months",
    deadline: daysFromNow(12),
    applicationUrl: "https://job-boards.greenhouse.io/cloudsek/jobs/6115382004",
    sourceUrl: "https://job-boards.greenhouse.io/cloudsek",
    source: "Greenhouse Board",
    status: "active",
    postedAt: hoursAgo(8),
    discoveredAt: minutesAgo(20),
    lastVerifiedAt: minutesAgo(5),
    verified: true,
    applicantCount: 112,
    featured: true
  }
];

export const INITIAL_SOURCES: AdminSource[] = [
  {
    id: "src-hpe",
    name: "HPE Careers Portal",
    category: "Direct Career Page",
    url: "https://careers.hpe.com/us/en/india-early-careers",
    lastScraped: "Just now",
    status: "active",
    discoveredCount: 1,
    verifiedRate: "100%"
  },
  {
    id: "src-honeywell",
    name: "Honeywell Careers",
    category: "Direct Career Page",
    url: "https://careers.honeywell.com/en/sites/Honeywell/job/159820",
    lastScraped: "Just now",
    status: "active",
    discoveredCount: 1,
    verifiedRate: "100%"
  },
  {
    id: "src-cloudsek",
    name: "CloudSEK Greenhouse",
    category: "Greenhouse ATS",
    url: "https://job-boards.greenhouse.io/cloudsek/jobs/6115382004",
    lastScraped: "Just now",
    status: "active",
    discoveredCount: 1,
    verifiedRate: "100%"
  }
];

export const DEFAULT_USER_PROFILE = {
  id: "user-default-1",
  name: "Pruthviraj Chawan",
  email: "pruthvirajchawan65@gmail.com",
  education: {
    major: "Computer Science & Engineering",
    graduationYear: "2027",
    college: "Bangalore"
  },
  lookingFor: "internship" as const,
  targetRoles: ["Software Engineering", "Cybersecurity"],
  workModes: ["hybrid", "onsite", "remote"] as ("remote" | "hybrid" | "onsite")[],
  preferredLocations: ["Bangalore", "Bengaluru, KA"],
  skills: ["Python", "Java", "C++", "React", "Data Structures", "Web Security", "Linux"],
  alertSettings: {
    closingSoonHours: 24,
    minMatchScore: 75,
    emailAlerts: true,
    browserAlerts: true
  },
  onboarded: true,
  createdAt: new Date().toISOString()
};
