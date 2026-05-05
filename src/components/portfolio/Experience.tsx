'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, ChevronUp, Briefcase, GraduationCap } from 'lucide-react';
import { usePortfolioExperience, usePortfolioEducation } from '@/hooks/usePortfolioData';
import { useIntersectionObserver } from '@/hooks/useScrollSpy';

const ACHIEVEMENTS = [
  {
    id: '01',
    category: 'HR Achievement',
    title: 'Placed 100+ Candidates',
    desc: 'End-to-end recruitment management across multiple industries and domains.',
  },
  {
    id: '02',
    category: 'Leadership',
    title: 'Led Team of 5 Recruiters',
    desc: 'Mentored junior recruiters to achieve monthly hiring targets consistently.',
  },
  {
    id: '03',
    category: 'Operations',
    title: 'MIS Reporting System',
    desc: 'Implemented recruitment tracking and performance metrics reporting.',
  },
  {
    id: '04',
    category: 'Client Success',
    title: '20+ Clients Served',
    desc: 'Managed client relationships and delivered quality candidates on time.',
  }
];

export function Experience(): React.ReactElement {
  const experience = usePortfolioExperience();
  const education = usePortfolioEducation() || [];
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });

  // Safety check
  if (!experience || experience.length === 0) {
    return (
      <section id="experience" className="section-padding bg-[var(--bg-primary)]">
        <div className="container-xl mx-auto px-6 text-center text-[var(--text-secondary)]">Loading...</div>
      </section>
    );
  }

  return (
    <section id="experience" ref={ref} className="bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] overflow-hidden">
      
      {/* SECTION 4: HR ACHIEVEMENTS (Replaces Projects) */}
      <div className="section-padding container-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
            My <span className="text-[var(--color-primary)]">Achievements</span>
          </h2>
          <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full mx-auto shadow-[0_0_10px_var(--color-primary)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:border-[var(--color-primary)] transition-colors duration-300 shadow-lg"
            >
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-[var(--color-primary)] opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity" />
              
              <div className="font-mono text-5xl font-bold text-[var(--border-subtle)] opacity-50 mb-6 group-hover:text-[var(--color-primary)] group-hover:opacity-20 transition-colors">
                {item.id}
              </div>
              <p className="text-[var(--color-primary)] font-bold text-sm tracking-widest uppercase mb-3">
                {item.category}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 5: EXPERIENCE + EDUCATION */}
      <div className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] w-full relative">
        <div className="section-padding container-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
            Experience & <span className="text-[var(--color-primary)]">Education</span>
          </h2>
          <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full mx-auto mb-12 shadow-[0_0_10px_var(--color-primary)]" />

          {/* TABS */}
          <div className="inline-flex bg-[var(--bg-elevated)] p-1.5 rounded-full border border-[var(--border-subtle)] shadow-md">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === 'experience' 
                ? 'bg-[var(--color-primary)] text-[var(--bg-primary)] shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Briefcase size={16} /> Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === 'education' 
                ? 'bg-[var(--color-primary)] text-[var(--bg-primary)] shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <GraduationCap size={16} /> Education
            </button>
          </div>
        </motion.div>

        {/* TIMELINE LIST */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'experience' ? (
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 hover:border-[var(--color-primary)] transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">{exp.role}</h3>
                      <p className="text-[var(--color-primary)] font-bold text-sm tracking-wide">{exp.company}</p>
                    </div>
                    <div className="bg-[rgba(var(--color-primary-rgb),0.1)] text-[var(--color-primary)] px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap self-start border border-[rgba(var(--color-primary-rgb),0.2)]">
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {exp.bullets[0]}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 hover:border-[var(--color-primary)] transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">{edu.role}</h3>
                      <p className="text-[var(--color-primary)] font-bold text-sm tracking-wide">{edu.company}</p>
                    </div>
                    <div className="bg-[rgba(var(--color-primary-rgb),0.1)] text-[var(--color-primary)] px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap self-start border border-[rgba(var(--color-primary-rgb),0.2)]">
                      {edu.duration}
                    </div>
                  </div>
                  {edu.bullets && edu.bullets.length > 0 && (
                    <div className="text-[var(--text-secondary)] leading-relaxed space-y-1">
                      {edu.bullets.map((b, bIdx) => {
                        const parts = b.split(':');
                        if (parts.length > 1) {
                          return (
                            <span key={bIdx} className="block">
                              <strong>{parts[0]}:</strong> {parts.slice(1).join(':')}
                            </span>
                          );
                        }
                        return <span key={bIdx} className="block">{b}</span>;
                      })}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
