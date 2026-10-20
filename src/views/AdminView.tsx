import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity, WorkMode } from '../types';
import { 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Search,
  Check, 
  RefreshCw, 
  LayoutGrid
} from 'lucide-react';
import { getDeadlineInfo } from '../services/matchEngine';

export const AdminView: React.FC = () => {
  const { 
    opportunities, 
    sources, 
    addOpportunity, 
    deleteOpportunity, 
    verifyOpportunity, 
    ingestWithAI,
    radarStats,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'opportunities' | 'ai_ingest' | 'sources'>('opportunities');

  // AI Ingestion state
  const [rawJobText, setRawJobText] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);

  // Manual creation state
  const [isCreatingManual, setIsCreatingManual] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newType, setNewType] = useState<'internship' | 'hackathon'>('internship');
  const [newStipend, setNewStipend] = useState('₹1,00,000 / month');
  const [newLocation, setNewLocation] = useState('Bengaluru, KA / Remote');
  const [newWorkMode, setNewWorkMode] = useState<WorkMode>('remote');
  const [newDeadlineHours, setNewDeadlineHours] = useState(48);
  const [newSkills, setNewSkills] = useState('Python, TypeScript, React');

  const [adminSearch, setAdminSearch] = useState('');

  const handleRunAiIngestion = async () => {
    if (!rawJobText.trim()) return;
    setIsIngesting(true);
    try {
      await ingestWithAI(rawJobText);
      setRawJobText('');
      setActiveTab('opportunities');
    } catch (e) {
      showToast("Ingestion failed. Please check input.");
    } finally {
      setIsIngesting(false);
    }
  };

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    addOpportunity({
      title: newTitle.trim(),
      company: newCompany.trim(),
      type: newType,
      stipend: newStipend.trim(),
      location: newLocation.trim(),
      workMode: newWorkMode,
      skills: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      deadline: new Date(Date.now() + newDeadlineHours * 3600 * 1000).toISOString(),
      verified: true
    });

    setIsCreatingManual(false);
    setNewTitle('');
    setNewCompany('');
  };

  const filteredOpportunities = opportunities.filter(o => {
    if (!adminSearch) return true;
    const q = adminSearch.toLowerCase();
    return o.title.toLowerCase().includes(q) || o.company.toLowerCase().includes(q) || o.source.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen pb-28 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#E4E8F7] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-obviously font-bold text-[#4E55E0] uppercase tracking-wider block mb-1">
            CONTROL HUB
          </span>
          <h1 className="font-obviously font-black text-4xl sm:text-5xl text-[#111322] tracking-tight">
            Admin Console
          </h1>
          <p className="text-sm text-neutral-600 font-medium mt-1">
            Opportunity verifier, real-time sources &amp; AI parser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('ai_ingest')}
            className="px-5 py-2.5 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc] transition-colors flex items-center gap-1.5 shadow-md shadow-[#4E55E0]/20"
          >
            <Sparkles className="w-4 h-4 text-[#B8EB6C]" />
            <span>AI Opportunity Parser</span>
          </button>
        </div>
      </div>

      {/* Stats Bento */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-white border border-[#E4E8F7] rounded-[28px] shadow-xs">
          <span className="text-xs font-obviously font-bold text-neutral-500 block mb-1">Total Active</span>
          <span className="font-obviously font-black text-3xl text-[#111322]">{radarStats.totalActive}</span>
        </div>

        <div className="p-6 bg-[#FC8FC6]/20 border border-[#FC8FC6]/40 rounded-[28px] shadow-xs">
          <span className="text-xs font-obviously font-bold text-[#111322] block mb-1">Closing Soon</span>
          <span className="font-obviously font-black text-3xl text-[#111322]">{radarStats.closingSoon}</span>
        </div>

        <div className="p-6 bg-[#B8EB6C]/30 border border-[#B8EB6C]/50 rounded-[28px] shadow-xs">
          <span className="text-xs font-obviously font-bold text-[#111322] block mb-1">Fresh Drops</span>
          <span className="font-obviously font-black text-3xl text-[#111322]">{radarStats.totalNew}</span>
        </div>

        <div className="p-6 bg-[#F7CD63]/30 border border-[#F7CD63]/50 rounded-[28px] shadow-xs">
          <span className="text-xs font-obviously font-bold text-[#111322] block mb-1">Live Sources</span>
          <span className="font-obviously font-black text-3xl text-[#111322]">{sources.length}</span>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs font-obviously">
        {[
          { id: 'opportunities', label: `Opportunities (${opportunities.length})` },
          { id: 'ai_ingest', label: 'AI Raw Ingestion' },
          { id: 'sources', label: `Data Sources (${sources.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#111322] text-white shadow-xs'
                : 'bg-white border border-[#E2E6F5] text-neutral-600 hover:text-[#111322]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunities List */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-80 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Filter by title, company..."
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#E2E6F5] rounded-full text-xs text-[#111322] outline-none focus:border-[#4E55E0]"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsCreatingManual(prev => !prev)}
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#E2E6F5] text-[#111322] hover:border-[#111322] rounded-full text-xs font-obviously font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#4E55E0]" />
              <span>{isCreatingManual ? 'Cancel' : 'New Listing'}</span>
            </button>
          </div>

          {/* Manual Form */}
          {isCreatingManual && (
            <form onSubmit={handleCreateManual} className="p-8 bg-white border-2 border-[#4E55E0] rounded-[32px] space-y-4 shadow-sm">
              <h3 className="font-obviously font-black text-lg text-[#111322]">Create New Listing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-700 font-obviously font-bold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. AI Research Intern"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FE] border border-[#E4E8F7] rounded-xl text-[#111322] outline-none focus:border-[#4E55E0]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-obviously font-bold mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Mistral AI"
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FE] border border-[#E4E8F7] rounded-xl text-[#111322] outline-none focus:border-[#4E55E0]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-obviously font-bold mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FE] border border-[#E4E8F7] rounded-xl text-[#111322] outline-none focus:border-[#4E55E0]"
                  >
                    <option value="internship">Internship</option>
                    <option value="hackathon">Hackathon</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc]"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div className="bg-white border border-[#E4E8F7] rounded-[32px] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-[#F8F9FE] text-neutral-500 font-obviously font-bold border-b border-[#E4E8F7]">
                <tr>
                  <th className="p-4 px-6">OPPORTUNITY</th>
                  <th className="p-4">TYPE</th>
                  <th className="p-4">STIPEND</th>
                  <th className="p-4">DEADLINE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2FA] text-neutral-700">
                {filteredOpportunities.map((opp) => {
                  const deadlineInfo = getDeadlineInfo(opp.deadline);
                  return (
                    <tr key={opp.id} className="hover:bg-[#F8F9FE] transition-colors">
                      <td className="p-4 px-6">
                        <div className="font-obviously font-bold text-[#111322] text-sm">{opp.title}</div>
                        <div className="text-neutral-500 text-xs">{opp.company} · {opp.location}</div>
                      </td>
                      <td className="p-4 uppercase text-xs font-bold">{opp.type}</td>
                      <td className="p-4 font-obviously font-bold text-[#111322]">{opp.stipend}</td>
                      <td className="p-4">
                        <span className="text-[#FF783E] font-obviously font-bold">{deadlineInfo.label}</span>
                      </td>
                      <td className="p-4">
                        {opp.verified ? (
                          <span className="text-[#4E55E0] flex items-center gap-1 font-obviously font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-[#B8EB6C]" /> VERIFIED
                          </span>
                        ) : (
                          <span className="text-neutral-400 text-xs">PENDING</span>
                        )}
                      </td>
                      <td className="p-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!opp.verified && (
                            <button
                              type="button"
                              onClick={() => verifyOpportunity(opp.id)}
                              className="p-1.5 bg-[#B8EB6C] text-[#111322] rounded-full hover:opacity-80"
                              title="Verify"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteOpportunity(opp.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-500 rounded-full hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Ingestion */}
      {activeTab === 'ai_ingest' && (
        <div className="p-8 bg-white border border-[#E4E8F7] rounded-[32px] space-y-6 shadow-xs">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-[#4E55E0] shrink-0 mt-1" />
            <div>
              <h2 className="font-obviously font-black text-xl text-[#111322]">AI Opportunity Ingestion</h2>
              <p className="text-xs text-neutral-600 mt-1 font-medium">
                Paste raw job descriptions or hackathon emails to automatically extract structured data.
              </p>
            </div>
          </div>

          <div>
            <textarea
              rows={8}
              value={rawJobText}
              onChange={(e) => setRawJobText(e.target.value)}
              placeholder="Paste raw opportunity text here..."
              className="w-full p-4 bg-[#F8F9FE] border border-[#E4E8F7] rounded-2xl text-xs text-[#111322] placeholder:text-neutral-400 outline-none focus:border-[#4E55E0]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleRunAiIngestion}
              disabled={isIngesting || !rawJobText.trim()}
              className="px-7 py-3 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc] transition-colors flex items-center gap-2 disabled:opacity-50 shadow-md shadow-[#4E55E0]/20"
            >
              {isIngesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Extracting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#B8EB6C]" />
                  <span>Extract &amp; Publish</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Sources */}
      {activeTab === 'sources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((src) => (
            <div key={src.id} className="p-6 bg-white border border-[#E4E8F7] rounded-[28px] space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-obviously font-bold text-base text-[#111322]">{src.name}</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#B8EB6C] text-[#111322] font-obviously font-black uppercase">
                  {src.status}
                </span>
              </div>
              <div className="text-xs text-neutral-500 font-mono break-all">{src.url}</div>
              <div className="pt-2 border-t border-[#F0F2FA] flex items-center justify-between text-xs font-medium text-neutral-600">
                <span>Discovered: {src.discoveredCount} roles</span>
                <span>Accuracy: {src.verifiedRate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
