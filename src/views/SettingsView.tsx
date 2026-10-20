import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, ArrowLeft, Download, RotateCcw } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, resetProfile, navigateTo, savedIds, showToast } = useApp();

  const [closingHours, setClosingHours] = useState(profile.alertSettings?.closingSoonHours || 24);
  const [minMatch, setMinMatch] = useState(profile.alertSettings?.minMatchScore || 75);
  const [browserAlerts, setBrowserAlerts] = useState(profile.alertSettings?.browserAlerts ?? true);
  const [emailAlerts, setEmailAlerts] = useState(profile.alertSettings?.emailAlerts ?? true);

  const handleSaveSettings = () => {
    updateProfile({
      alertSettings: {
        closingSoonHours: closingHours,
        minMatchScore: minMatch,
        browserAlerts,
        emailAlerts
      }
    });
    showToast("Settings saved.");
  };

  const handleExportData = () => {
    const data = {
      profile,
      savedIds,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `droply-export-${Date.now()}.json`;
    a.click();
    showToast("Data exported.");
  };

  return (
    <div className="min-h-screen pb-28 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      {/* Header */}
      <button
        type="button"
        onClick={() => navigateTo('/profile')}
        className="flex items-center gap-2 text-xs font-obviously font-bold text-neutral-600 hover:text-[#111322] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to profile</span>
      </button>

      <div className="mb-8 pb-6 border-b border-[#E4E8F7]">
        <h1 className="font-obviously font-black text-4xl sm:text-5xl text-[#111322] tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-neutral-600 font-medium mt-1">
          Notification alerts, sensitivity thresholds, and data backup.
        </p>
      </div>

      <div className="space-y-6">
        {/* Notification Frequency */}
        <div className="p-8 bg-white border border-[#E4E8F7] rounded-[32px] space-y-6 shadow-xs">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#4E55E0]" />
            <h2 className="font-obviously font-black text-lg text-[#111322]">Alert Preferences</h2>
          </div>

          {/* Urgent Closing Threshold */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-obviously font-bold">
              <span className="text-neutral-700">Closing Alert Threshold:</span>
              <span className="text-[#4E55E0] font-black">{closingHours} Hours</span>
            </div>
            <input
              type="range"
              min={6}
              max={72}
              step={6}
              value={closingHours}
              onChange={(e) => setClosingHours(Number(e.target.value))}
              className="w-full accent-[#4E55E0] cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-4 border-t border-[#F0F2FA]">
            <label className="flex items-center justify-between p-4 bg-[#F8F9FE] rounded-2xl border border-[#E4E8F7] cursor-pointer">
              <div>
                <span className="text-xs font-obviously font-bold text-[#111322] block">In-App Live Alerts</span>
                <span className="text-[11px] text-neutral-500 font-medium">Receive notifications for newly verified drops</span>
              </div>
              <input
                type="checkbox"
                checked={browserAlerts}
                onChange={(e) => setBrowserAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#4E55E0]"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[#F8F9FE] rounded-2xl border border-[#E4E8F7] cursor-pointer">
              <div>
                <span className="text-xs font-obviously font-bold text-[#111322] block">Closing Soon Digest</span>
                <span className="text-[11px] text-neutral-500 font-medium">Receive summary for opportunities closing within 24h</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#4E55E0]"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSaveSettings}
            className="w-full py-3 bg-[#4E55E0] text-white font-obviously font-bold text-xs rounded-full hover:bg-[#3f46cc] transition-colors shadow-md shadow-[#4E55E0]/20 cursor-pointer"
          >
            Save Preferences
          </button>
        </div>

        {/* Data Management */}
        <div className="p-8 bg-white border border-[#E4E8F7] rounded-[32px] space-y-4 shadow-xs">
          <h2 className="font-obviously font-black text-lg text-[#111322]">Data &amp; Backup</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleExportData}
              className="flex-1 py-3 px-4 bg-[#F8F9FE] border border-[#E4E8F7] rounded-full text-xs font-obviously font-bold text-[#111322] hover:bg-[#F0F2FA] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#4E55E0]" />
              <span>Export Profile &amp; Saved Data</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to reset profile to defaults?")) {
                  resetProfile();
                  showToast("Profile reset.");
                }
              }}
              className="py-3 px-6 bg-red-50 border border-red-100 rounded-full text-xs font-obviously font-bold text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
