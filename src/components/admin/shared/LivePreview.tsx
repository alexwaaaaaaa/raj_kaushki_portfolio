'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore';
import { isMobile } from '@/lib/utils';

export function LivePreview(): React.ReactElement {
  const applyToDOM = useThemeStore((s) => s.applyToDOM);
  
  // Keep live preview CSS synced
  React.useEffect(() => {
    applyToDOM();
  }, [applyToDOM]);

  return (
    <div className="w-full h-full bg-[var(--bg-primary)] rounded-xl overflow-hidden shadow-2xl border border-[var(--border-subtle)] relative flex flex-col">
      <div className="h-8 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto bg-[var(--bg-card)] rounded-md px-3 py-0.5 text-[10px] text-[var(--text-muted)] font-mono border border-[var(--border-subtle)]">
          rajkaushki.com
        </div>
        <div className="w-10" />
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-[var(--bg-primary)]">
        {/* We use an iframe pointing to the live site for true isolation 
            and to prevent admin CSS from leaking into the preview */}
        <iframe 
          src="/" 
          className="absolute inset-0 w-full h-full border-none"
          title="Portfolio Live Preview"
        />
        
        {/* Overlay to block interaction in some modes if needed, but usually we want it interactive */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
      </div>
    </div>
  );
}

export default LivePreview;
