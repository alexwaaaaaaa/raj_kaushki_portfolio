'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, UserCircle, Briefcase, Star, Award, 
  Zap, Palette, Layout, MousePointer2, Smartphone, Download,
  PanelLeftClose, PanelLeft, ExternalLink as ExternalLinkIcon, CloudUpload
} from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioStore } from '@/store/portfolioStore';
import { PinGate } from './PinGate';
import { DashboardTab } from './tabs/DashboardTab';
import { ProfileTab } from './tabs/ProfileTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { SkillsTab } from './tabs/SkillsTab';
import { CertificationsTab } from './tabs/CertificationsTab';
import { StrengthsTab } from './tabs/StrengthsTab';
import { EventsTab } from './tabs/EventsTab';
import { ThemeTab } from './tabs/ThemeTab';
import { LayoutEditorTab } from './tabs/LayoutEditorTab';
import { CursorTab } from './tabs/CursorTab';
import { ResponsiveTab } from './tabs/ResponsiveTab';
import { ExportTab } from './tabs/ExportTab';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: UserCircle },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Star },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'strengths', label: 'Strengths', icon: Zap },
  { id: 'events', label: 'Events & Gallery', icon: Star },
  { id: 'theme', label: 'Theme & Colors', icon: Palette },
  { id: 'layout', label: 'Layout Editor', icon: Layout },
  { id: 'cursor', label: 'Cursor', icon: MousePointer2 },
  { id: 'responsive', label: 'Responsive', icon: Smartphone },
  { id: 'export', label: 'Export & Backup', icon: Download },
];

export function AdminLayout(): React.ReactElement {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const publishToServer = usePortfolioStore((s) => s.publishToServer);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishToServer();
      toast.success('Successfully published changes to Live Site!');
    } catch (error) {
      toast.error('Failed to publish changes.');
    } finally {
      setIsPublishing(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'profile': return <ProfileTab />;
      case 'experience': return <ExperienceTab />;
      case 'skills': return <SkillsTab />;
      case 'certifications': return <CertificationsTab />;
      case 'strengths': return <StrengthsTab />;
      case 'events': return <EventsTab />;
      case 'theme': return <ThemeTab />;
      case 'layout': return <LayoutEditorTab />;
      case 'cursor': return <CursorTab />;
      case 'responsive': return <ResponsiveTab />;
      case 'export': return <ExportTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <PinGate>
      <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-secondary)] text-[var(--text-primary)]">
        
        {/* Sidebar */}
        <div className={`flex-shrink-0 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
          <div className="h-14 border-b border-[var(--border-subtle)] flex items-center px-4 justify-between flex-shrink-0">
            {sidebarOpen && (
              <div className="font-display font-bold text-sm flex items-center gap-2 text-[var(--color-primary)]">
                <div className="w-6 h-6 bg-gradient-to-br from-[var(--gold-400)] to-[var(--gold-600)] text-[var(--bg-primary)] flex items-center justify-center rounded text-[10px]">RK</div>
                Portfolio Admin
              </div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-md transition-colors mx-auto"
            >
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3 custom-scrollbar">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive ? 'bg-[var(--color-primary)] text-[var(--bg-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[rgba(201,168,76,0.05)] hover:text-[var(--text-primary)]'}`}
                  title={!sidebarOpen ? tab.label : undefined}
                >
                  <tab.icon size={18} className={isActive ? '' : 'group-hover:text-[var(--color-primary)] transition-colors'} />
                  {sidebarOpen && <span className="text-sm font-medium truncate">{tab.label}</span>}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-[var(--border-subtle)] flex flex-col gap-2">
            <button onClick={handlePublish} disabled={isPublishing} className={`btn btn-primary flex items-center justify-center gap-2 ${sidebarOpen ? 'w-full' : 'p-2'}`}>
              {isPublishing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CloudUpload size={16} />}
              {sidebarOpen && <span>{isPublishing ? 'Publishing...' : 'Publish to Live'}</span>}
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" className={`btn btn-outline flex items-center justify-center gap-2 ${sidebarOpen ? 'w-full' : 'p-2'}`}>
              <ExternalLinkIcon size={16} />
              {sidebarOpen && <span>View Live Site</span>}
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {renderTabContent()}
        </div>

      </div>
    </PinGate>
  );
}


export default AdminLayout;
