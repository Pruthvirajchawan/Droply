import { GoogleGenAI } from '@google/genai';
import { Opportunity } from '../types';

export interface ExtractedOpportunityData {
  title: string;
  company: string;
  type: 'internship' | 'hackathon';
  shortDescription: string;
  description: string;
  keyHighlights: string[];
  skills: string[];
  eligibility: string[];
  location: string;
  workMode: 'remote' | 'hybrid' | 'onsite';
  stipend: string;
  duration: string;
  deadlineHoursFromNow: number;
  prizePool?: string;
  hackathonTheme?: string;
  teamSize?: string;
  source: string;
  duplicateCandidate?: boolean;
}

export async function parseRawOpportunityWithGemini(
  rawText: string,
  apiKey?: string
): Promise<ExtractedOpportunityData> {
  // If API key is available in environment or runtime
  const effectiveKey = apiKey || (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || '';

  if (effectiveKey && effectiveKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey: effectiveKey });
      const prompt = `
You are the AI Opportunity Ingestion Engine for Droply (internship & hackathon radar).
Analyze the following raw opportunity text or job description and extract high-signal structured data as JSON:

Raw Text:
${rawText}

Output valid JSON ONLY matching this exact TypeScript structure:
{
  "title": "string (e.g. AI Research Intern)",
  "company": "string (e.g. Perplexity AI)",
  "type": "internship" | "hackathon",
  "shortDescription": "string (1 concise impactful sentence max 120 chars)",
  "description": "string (clean 2-3 paragraph overview)",
  "keyHighlights": ["string", "string", "string"],
  "skills": ["string", "string", "string"],
  "eligibility": ["string", "string"],
  "location": "string",
  "workMode": "remote" | "hybrid" | "onsite",
  "stipend": "string (e.g. $8,000 / month or $50,000 Prize Pool)",
  "duration": "string (e.g. 12 weeks or 48 Hours)",
  "deadlineHoursFromNow": number (estimated hours until close, e.g. 24 or 72),
  "prizePool": "string (if hackathon, else omit)",
  "hackathonTheme": "string (if hackathon, else omit)",
  "teamSize": "string (e.g. 1–4 Builders)",
  "source": "string (e.g. Direct Portal, YC Startup Feed)"
}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          ...parsed,
          skills: Array.isArray(parsed.skills) ? parsed.skills : ["General Engineering"],
          keyHighlights: Array.isArray(parsed.keyHighlights) ? parsed.keyHighlights : ["High-impact project ownership"],
          eligibility: Array.isArray(parsed.eligibility) ? parsed.eligibility : ["Enrolled in relevant degree or self-taught"],
          workMode: ['remote', 'hybrid', 'onsite'].includes(parsed.workMode) ? parsed.workMode : 'remote',
          type: parsed.type === 'hackathon' ? 'hackathon' : 'internship',
          deadlineHoursFromNow: Number(parsed.deadlineHoursFromNow) || 48,
          source: parsed.source || 'AI Ingestion Engine'
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, switching to intelligent heuristic parser', err);
    }
  }

  // Robust Heuristic Fallback Parser
  return parseHeuristically(rawText);
}

function parseHeuristically(text: string): ExtractedOpportunityData {
  const lower = text.toLowerCase();
  const isHackathon = lower.includes('hackathon') || lower.includes('prize pool') || lower.includes('submission deadline') || lower.includes('devpost');
  
  // Extract Title
  let title = "Software Engineering Intern";
  if (isHackathon) {
    title = text.match(/(?:hackathon|sprint|challenge):\s*([^\n\r]+)/i)?.[1]?.trim() || "Global AI Builder Hackathon 2026";
  } else {
    const titleMatch = text.match(/(?:title|role|position):\s*([^\n\r]+)/i) || 
                       text.match(/(?:internship|intern)\s*in\s*([^\n\r]+)/i) ||
                       text.match(/([A-Za-z\s]+(?:Intern|Fellow|Engineer|Researcher))/i);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].replace(/^[^\w]+|[^\w]+$/g, '').slice(0, 60);
    }
  }

  // Extract Company
  let company = "Tech Frontier Labs";
  const compMatch = text.match(/(?:company|organizer|at|host):\s*([^\n\r]+)/i) ||
                    text.match(/at\s+([A-Z][A-Za-z0-9\s]+?)(?:\s+is|\s+in|\s+seeking|\.|\,)/);
  if (compMatch && compMatch[1]) {
    company = compMatch[1].trim().slice(0, 40);
  }

  // Skills
  const commonSkills = ["Python", "TypeScript", "React", "Next.js", "C++", "Rust", "Go", "PyTorch", "PostgreSQL", "Docker", "Node.js", "Tailwind CSS", "Solana", "Machine Learning", "Figma"];
  const detectedSkills = commonSkills.filter(s => lower.includes(s.toLowerCase()));
  const skills = detectedSkills.length > 0 ? detectedSkills : ["Python", "TypeScript", "Problem Solving"];

  // Work Mode
  let workMode: 'remote' | 'hybrid' | 'onsite' = 'remote';
  if (lower.includes('hybrid')) workMode = 'hybrid';
  else if (lower.includes('onsite') || lower.includes('in-person')) workMode = 'onsite';

  // Stipend / Prize
  let stipend = isHackathon ? "$50,000 Prize Pool" : "$7,500 / month";
  const stipendMatch = text.match(/(\$[\d,]+(?:\s*\/\s*(?:month|hr|year))?|\$[\d,]+\s*(?:prize|pool)?|€[\d,]+|₹[\d,]+)/i);
  if (stipendMatch) {
    stipend = stipendMatch[1];
  }

  // Deadline hours
  let deadlineHours = 24;
  if (lower.includes('urgent') || lower.includes('closing today') || lower.includes('12h') || lower.includes('18h')) {
    deadlineHours = 12;
  } else if (lower.includes('2 days') || lower.includes('48h')) {
    deadlineHours = 48;
  } else if (lower.includes('week') || lower.includes('7 days')) {
    deadlineHours = 168;
  }

  return {
    title,
    company,
    type: isHackathon ? 'hackathon' : 'internship',
    shortDescription: isHackathon 
      ? "Build high-impact prototypes, explore frontier toolchains, and compete for global track prizes." 
      : "High-signal early career opportunity shipping production code with world-class engineering mentors.",
    description: text.slice(0, 600) || "Join the engineering team to build scalable systems, collaborate with cross-functional peers, and tackle ambitious technical roadblocks.",
    keyHighlights: [
      "Ship high-visibility features into production",
      "Direct technical mentorship from senior staff",
      "Flexible collaborative environment"
    ],
    skills,
    eligibility: [
      "Enrolled in CS/STEM degree program or demonstrable project portfolio",
      "Proficient in core programming languages and system fundamentals"
    ],
    location: workMode === 'remote' ? 'Remote (Worldwide)' : 'San Francisco, CA',
    workMode,
    stipend,
    duration: isHackathon ? "48 Hours" : "12 Weeks",
    deadlineHoursFromNow: deadlineHours,
    prizePool: isHackathon ? stipend : undefined,
    hackathonTheme: isHackathon ? "AI & Distributed Systems" : undefined,
    teamSize: isHackathon ? "1–4 Builders" : undefined,
    source: "Droply AI Ingestion Engine"
  };
}
