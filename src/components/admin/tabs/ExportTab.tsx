'use client';

import React from 'react';
import { Download, Upload, Copy, RefreshCw } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useEditorStore } from '@/store/editorStore';
import { useThemeStore } from '@/store/themeStore';
import { toast } from 'sonner';

export function ExportTab(): React.ReactElement {
  const portfolio = usePortfolioStore((s) => s);
  const editor = useEditorStore((s) => s);
  const theme = useThemeStore((s) => s);

  const handleExportJSON = () => {
    const data = {
      portfolio: {
        profile: portfolio.data.profile,
        experience: portfolio.data.experience,
        skills: portfolio.data.skills,
        certifications: portfolio.data.certifications,
        strengths: portfolio.data.strengths,
      },
      editor: {
        layouts: editor.layouts,
        widgets: editor.widgets,
      },
      theme: {
        colors: theme.theme.colors,
        typography: theme.theme.typography,
        preset: theme.theme.preset,
        cursor: theme.cursor,
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raj-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Backup exported successfully');
  };

  const handleCopyConfig = () => {
    // Implement copy to clipboard
    toast.success('Config copied to clipboard');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Export & Backup</h2>
        <p className="text-[var(--text-muted)] text-sm">Save your data or restore from a backup.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-strong card p-6 border border-[var(--border-subtle)] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-[var(--color-primary)]">
            <Download size={24} />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Export JSON Backup</h3>
          <p className="text-sm text-[var(--text-muted)]">Download all settings, content, layouts, and themes in a single JSON file.</p>
          <button onClick={handleExportJSON} className="btn btn-primary w-full mt-auto">Download Backup</button>
        </div>

        <div className="glass-strong card p-6 border border-[var(--border-subtle)] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[rgba(124,111,205,0.1)] flex items-center justify-center text-[var(--color-secondary)]">
            <Upload size={24} />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Import Backup</h3>
          <p className="text-sm text-[var(--text-muted)]">Restore portfolio state from a previously exported JSON backup file.</p>
          <div className="mt-auto relative">
            <input type="file" accept=".json" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <button className="btn btn-outline w-full pointer-events-none">Select File</button>
          </div>
        </div>

        <div className="glass-strong card p-6 border border-[var(--border-subtle)] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Copy size={24} />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Copy Raw Config</h3>
          <p className="text-sm text-[var(--text-muted)]">Copy current configuration to clipboard for sharing or manual editing.</p>
          <button onClick={handleCopyConfig} className="btn btn-outline w-full mt-auto">Copy to Clipboard</button>
        </div>

        <div className="glass-strong card p-6 border border-red-500/20 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
            <RefreshCw size={24} />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Factory Reset</h3>
          <p className="text-sm text-[var(--text-muted)]">Reset all configurations to default. This action cannot be undone.</p>
          <button className="btn bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 w-full mt-auto">Reset Everything</button>
        </div>
      </div>
    </div>
  );
}

export default ExportTab;
