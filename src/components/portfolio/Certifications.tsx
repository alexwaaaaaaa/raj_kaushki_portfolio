'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Award, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useScrollSpy';

const CERTS = [
  {
    id: '1',
    issuer: 'JP Morgan Chase & Co.',
    title: 'Excel Skills Job Simulation',
    year: '2024',
    credential: 'JPMC-EXCEL-2024',
    status: 'completed'
  },
  {
    id: '2',
    issuer: 'Industry Recognized',
    title: 'HR Management Certification',
    year: 'Expected 2026',
    credential: 'Coming Soon',
    status: 'pending'
  },
  {
    id: '3',
    issuer: 'Global Standard',
    title: 'Talent Acquisition Pro',
    year: 'Expected 2026',
    credential: 'Coming Soon',
    status: 'pending'
  },
  {
    id: '4',
    issuer: 'HR Institute',
    title: 'Advanced Operations',
    year: 'Expected 2027',
    credential: 'Coming Soon',
    status: 'pending'
  }
];

export function Certifications(): React.ReactElement {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const amount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="certifications" ref={ref} className="section-padding bg-[var(--bg-primary)] overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="container-xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
              Verified <span className="text-[var(--color-primary)]">Certifications</span>
            </h2>
            <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full shadow-[0_0_10px_var(--color-primary)]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 hidden md:flex"
          >
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                canScrollLeft 
                ? 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--bg-primary)]' 
                : 'border-[var(--border-subtle)] text-[var(--border-subtle)] cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                canScrollRight 
                ? 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--bg-primary)]' 
                : 'border-[var(--border-subtle)] text-[var(--border-subtle)] cursor-not-allowed'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative -mx-6 px-6 pb-10"
        >
          <div 
            ref={containerRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CERTS.map((cert) => (
              <div 
                key={cert.id}
                className="snap-start shrink-0 w-[85vw] md:w-[400px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 relative overflow-hidden group hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(var(--color-primary-rgb),0.15)] hover:-translate-y-2"
              >
                {/* Decorative Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-opacity ${cert.status === 'completed' ? 'bg-[var(--color-primary)] group-hover:opacity-20' : 'bg-[var(--border-subtle)]'}`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-300 ${
                  cert.status === 'completed' 
                  ? 'bg-[rgba(var(--color-primary-rgb),0.1)] border-[var(--color-primary)] text-[var(--color-primary)] group-hover:scale-110' 
                  : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-muted)]'
                }`}>
                  {cert.status === 'completed' ? <ShieldCheck size={32} /> : <Award size={32} />}
                </div>

                <div className="mb-8">
                  <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-2">
                    {cert.issuer}
                  </p>
                  <h3 className={`font-display text-2xl font-bold leading-tight ${cert.status === 'completed' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-auto pt-6 border-t border-[var(--border-subtle)]">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-mono text-[var(--text-muted)]">{cert.year}</span>
                    <span className={`font-mono text-xs px-3 py-1 rounded-full ${
                      cert.status === 'completed' 
                      ? 'bg-[rgba(var(--color-primary-rgb),0.1)] text-[var(--color-primary)] font-bold' 
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                    }`}>
                      {cert.status === 'completed' ? `ID: ${cert.credential}` : cert.credential}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

export default Certifications;
