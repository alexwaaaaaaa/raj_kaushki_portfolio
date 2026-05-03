'use client';

import React from 'react';
import { Activity, Eye, MousePointer2, Clock, ArrowRight } from 'lucide-react';

export function DashboardTab(): React.ReactElement {
  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Dashboard</h2>
        <p className="text-[var(--text-muted)]">Welcome back. Here's an overview of your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Views', value: '1,248', icon: Eye, change: '+12%' },
          { label: 'Interactions', value: '856', icon: MousePointer2, change: '+5%' },
          { label: 'Avg Time', value: '2m 14s', icon: Clock, change: '+18%' },
          { label: 'Live Status', value: 'Active', icon: Activity, change: 'Running', isGood: true },
        ].map((stat, i) => (
          <div key={i} className="glass-strong card p-4 border border-[var(--border-subtle)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[rgba(201,168,76,0.1)] rounded-lg text-[var(--color-primary)]">
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-medium ${stat.isGood ? 'text-green-400' : 'text-[var(--text-muted)]'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
            <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-strong card p-6 border border-[var(--border-subtle)]">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Edit Profile Information', tab: 'profile' },
              { label: 'Add New Experience', tab: 'experience' },
              { label: 'Update Skills', tab: 'skills' },
              { label: 'Customize Theme Colors', tab: 'theme' },
              { label: 'Modify Page Layout', tab: 'layout' },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--color-primary)] hover:bg-[rgba(201,168,76,0.05)] transition-colors group">
                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">{action.label}</span>
                <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transform group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>

        <div className="glass-strong card p-6 border border-[var(--border-subtle)]">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <p className="text-sm text-[var(--text-primary)]">3D Canvas Engine</p>
                <p className="text-xs text-[var(--text-muted)]">WebGL 2.0 via Three.js r165</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Optimized</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <p className="text-sm text-[var(--text-primary)]">Data Persistence</p>
                <p className="text-xs text-[var(--text-muted)]">Zustand LocalStorage (Encrypted)</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Synced</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[var(--text-primary)]">Last Build</p>
                <p className="text-xs text-[var(--text-muted)]">Next.js 14 App Router</p>
              </div>
              <span className="text-xs text-[var(--text-muted)]">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTab;
