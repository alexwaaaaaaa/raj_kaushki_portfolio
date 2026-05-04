'use client';

import React from 'react';
import { usePortfolioProfile } from '@/hooks/usePortfolioData';

export function Footer(): React.ReactElement {
  const profile = usePortfolioProfile();
  const currentYear = new Date().getFullYear();

  // Safety check
  if (!profile || !profile.name) {
    return <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', padding: '3rem 0' }}><div className="container-xl text-center text-[var(--text-secondary)]">Loading...</div></footer>;
  }

  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', padding: '3rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container-xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>

        
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', maxWidth: 400 }}>
          {profile.tagline}
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href={`mailto:${profile.email}`} className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Email</a>
          <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm font-medium">LinkedIn</a>
          <a href="/admin" className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Admin Login</a>
        </div>

        <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)', margin: '1rem 0' }} />

        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
          © {currentYear} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
