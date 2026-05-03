'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import type { PortfolioData } from '@/types';

export function usePortfolioData(): PortfolioData {
  return usePortfolioStore((s) => s.data);
}

export function usePortfolioProfile() {
  return usePortfolioStore((s) => s.data.profile);
}

export function usePortfolioExperience() {
  return usePortfolioStore((s) => s.data.experience);
}

export function usePortfolioSkills() {
  return usePortfolioStore((s) => s.data.skills);
}

export function usePortfolioCertifications() {
  return usePortfolioStore((s) => s.data.certifications);
}

export function usePortfolioStrengths() {
  return usePortfolioStore((s) => s.data.strengths);
}
