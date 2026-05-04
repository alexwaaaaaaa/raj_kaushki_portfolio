'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Layers, TrendingUp } from 'lucide-react';
import { usePortfolioStrengths } from '@/hooks/usePortfolioData';
import { useIntersectionObserver } from '@/hooks/useScrollSpy';

const ICON_MAP: Record<string, React.FC<any>> = {
  Zap,
  Users,
  Layers,
  TrendingUp,
};

export function Strengths(): React.ReactElement {
  const strengths = usePortfolioStrengths();
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });

  // Safety check
  if (!strengths || strengths.length === 0) {
    return (
      <section id="strengths" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-xl text-center text-[var(--text-secondary)]">Loading...</div>
      </section>
    );
  }

  return (
    <section id="strengths" ref={ref} className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-xl">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <p style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Core Advantages
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
              Why Choose <span className="gradient-text">Me</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 400 }}>
              Combining deep HR expertise with a proactive, agile mindset. I don't just fill roles—I build resilient, high-performing teams aligned with company goals.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', gridColumn: 'span 2' }}>
            {strengths.map((strength, i) => {
              const Icon = ICON_MAP[strength.icon] || Zap;
              return (
                <motion.div
                  key={strength.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card"
                  style={{ padding: '2rem' }}
                  whileHover={{ y: -5 }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(124,111,205,0.1))',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: 'var(--color-primary)'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    {strength.label}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    {strength.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Strengths;
