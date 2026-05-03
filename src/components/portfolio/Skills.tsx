'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MonitorSmartphone } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useScrollSpy';

const SKILLS_DATA = {
  core: [
    'Talent Acquisition',
    'Recruitment Strategy',
    'HR Management',
    'Interview Coordination',
    'Candidate Engagement',
    'Onboarding Processes'
  ],
  operations: [
    'HR Operations',
    'MIS Reporting',
    'Compliance Support',
    'Employee Relations'
  ],
  tools: [
    'LinkedIn Recruiter',
    'Apna',
    'Job Hai',
    'Naukri.com',
    'MS Excel',
    'Google Workspace',
    'MS Office Suite'
  ]
};

export function Skills(): React.ReactElement {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" ref={ref} className="pt-0 pb-[var(--space-section)] bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] overflow-hidden">
      <div className="container-xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: SKILLS (Section 6) */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
                Professional <span className="text-[var(--color-primary)]">Skills</span>
              </h2>
              <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full shadow-[0_0_10px_var(--color-primary)]" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Core HR */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                  <span className="text-[var(--color-primary)] opacity-50 font-mono text-lg">01.</span>
                  Core HR Skills
                </h3>
                <ul className="space-y-4">
                  {SKILLS_DATA.core.map((skill, i) => (
                    <motion.li 
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                      className="flex items-center gap-3 text-[var(--text-secondary)] font-medium text-lg hover:text-[var(--color-primary)] transition-colors"
                    >
                      <CheckCircle2 size={18} className="text-[var(--color-primary)] shrink-0" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Operations */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                  <span className="text-[var(--color-primary)] opacity-50 font-mono text-lg">02.</span>
                  Operations Skills
                </h3>
                <ul className="space-y-4">
                  {SKILLS_DATA.operations.map((skill, i) => (
                    <motion.li 
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                      className="flex items-center gap-3 text-[var(--text-secondary)] font-medium text-lg hover:text-[var(--color-primary)] transition-colors"
                    >
                      <CheckCircle2 size={18} className="text-[var(--color-primary)] shrink-0" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: TOOLS (Section 7) */}
          <div className="w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-secondary)] opacity-10 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-primary)] opacity-10 blur-3xl rounded-full" />
              
              <MonitorSmartphone size={40} className="text-[var(--color-primary)] mb-6 opacity-80" />
              
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                <span className="text-[var(--color-primary)] opacity-50 font-mono text-lg">03.</span>
                HR Tools & Platforms
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.tools.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                    className="px-4 py-2 bg-[rgba(var(--color-primary-rgb),0.1)] border border-[rgba(var(--color-primary-rgb),0.2)] rounded-full text-[var(--color-primary)] font-semibold text-sm hover:bg-[var(--color-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300 cursor-default shadow-sm"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Skills;
