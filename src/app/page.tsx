'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useThemeStore } from '@/store/themeStore';
import { useEditorStore } from '@/store/editorStore';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Experience } from '@/components/portfolio/Experience';
import { Skills } from '@/components/portfolio/Skills';
import { Certifications } from '@/components/portfolio/Certifications';
import { Strengths } from '@/components/portfolio/Strengths';
import { Events } from '@/components/portfolio/Events';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';

export default function PortfolioPage() {
  const isPortfolioHydrated = usePortfolioStore((s) => s.hydrated);
  const isThemeHydrated = useThemeStore((s) => s.hydrated);
  const applyToDOM = useThemeStore((s) => s.applyToDOM);
  const [mounted, setMounted] = useState(false);

  const fetchPortfolio = usePortfolioStore((s) => s.fetchFromServer);
  const fetchTheme = useThemeStore((s) => s.fetchFromServer);
  const fetchEditor = useEditorStore((s) => s.fetchFromServer);

  useEffect(() => {
    setMounted(true);
    // Fetch latest published data from server for visitors
    Promise.all([fetchPortfolio(), fetchTheme(), fetchEditor()]).then(() => {
      if (isThemeHydrated) {
        applyToDOM();
      }
    });
  }, [isThemeHydrated, applyToDOM, fetchPortfolio, fetchTheme, fetchEditor]);

  // Prevent hydration mismatch by showing nothing until Zustand stores are loaded
  if (!mounted || !isPortfolioHydrated || !isThemeHydrated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="relative w-full overflow-hidden bg-[var(--bg-primary)]">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Certifications />
      <Strengths />
      <Events />
      <Contact />
      <Footer />
    </main>
  );
}
