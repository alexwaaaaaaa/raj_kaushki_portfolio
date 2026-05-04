'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, ExternalLink } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { usePortfolioProfile } from '@/hooks/usePortfolioData';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { id: 'about', label: 'About Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.id));
  const profile = usePortfolioProfile();

  // Safety check - Navbar can still render without profile
  const hasProfile = profile && profile.name;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 h-16 flex items-center z-[100] transition-all duration-300',
          scrolled ? 'glass-strong shadow-[0_1px_0_rgba(201,168,76,0.1)]' : 'bg-transparent'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-xl w-full flex items-center justify-between">
          {/* Logo */}
          <div />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={cn('nav-link', activeId === link.id && 'active')}
                aria-current={activeId === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="open-to-work hidden sm:flex">Open to Work</div>
            <a
              href="/admin"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--border-default)] transition-all"
              aria-label="Admin panel"
              title="Admin"
            >
              <Lock size={15} />
            </a>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 text-[var(--text-primary)]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] glass-strong flex flex-col items-center justify-center gap-8"
            style={{ paddingTop: 64 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNavClick(link.id)}
                className="text-3xl font-display font-semibold text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <div className="open-to-work mt-4">Open to Work</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for ripple */}
      <style>{`
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }
      `}</style>
    </>
  );
}

export default Navbar;
