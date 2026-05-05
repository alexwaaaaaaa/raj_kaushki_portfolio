'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, User, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePortfolioProfile } from '@/hooks/usePortfolioData';
import { useIntersectionObserver } from '@/hooks/useScrollSpy';

const SceneCanvas = dynamic(() => import('@/components/three/SceneCanvas').then(m => ({ default: m.SceneCanvas })), { ssr: false });

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SKILL_TAGS = ['End-to-End Recruitment', 'Talent Acquisition', 'HR Operations', 'Team Leadership', 'Onboarding', 'MIS Reporting', 'Client Management', 'Employee Relations', 'Compliance', 'Interview Coordination'];

export function About(): React.ReactElement {
  const profile = usePortfolioProfile();
  const [ref, inView] = useIntersectionObserver({ threshold: 0.15 });

  // Safety check
  if (!profile || !profile.location) {
    return <section id="about" className="section-padding bg-[var(--bg-primary)]"><div className="container-xl mx-auto px-6 text-center text-[var(--text-secondary)]">Loading...</div></section>;
  }

  const contactItems = [
    { icon: MapPin, label: profile.location },
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Linkedin, label: profile.linkedin, href: profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}` },
  ];

  return (
    <section id="about" ref={ref} className="section-padding bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container-xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left — Image (Panda Coders Style) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="absolute inset-0 bg-[var(--color-secondary)] opacity-10 blur-[80px] rounded-full" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[var(--bg-card)]">
               {(profile.aboutImage || profile.avatarUrl) ? (
                 <img 
                   src={profile.aboutImage || profile.avatarUrl} 
                   alt={`About ${profile.name}`} 
                   className="w-full h-full object-cover" 
                 />
               ) : (
                 <div className="absolute inset-0 bg-[var(--bg-card)] flex flex-col items-center justify-center pt-10">
                   {/* Placeholder for the user's photo */}
                   <div className="w-full h-full bg-gradient-to-t from-[var(--color-primary)] to-[var(--bg-elevated)] opacity-20" />
                   <User size={150} className="absolute text-[var(--color-primary)] opacity-40 bottom-0 drop-shadow-[0_0_30px_var(--color-primary)]" />
                   <span className="absolute font-display font-bold text-9xl text-[var(--bg-elevated)] opacity-50 tracking-tighter mix-blend-overlay">
                     {profile.name.split(' ').map(n => n[0]).join('')}
                   </span>
                 </div>
               )}
            </div>
            {/* Decorative dots grid overlay */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-30" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
          </motion.div>

          {/* Right — Content */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-[var(--text-primary)]">
                People Are My <span className="text-[var(--color-primary)]">Passion</span>
              </h2>
              <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full mb-8 shadow-[0_0_10px_var(--color-primary)]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 font-light"
            >
              {profile.summary} With a track record of placing 100+ candidates and leading a team of recruiters, I bring strategic HR thinking combined with hands-on operational expertise. Driven by learning and curiosity, I am always looking to explore new talent acquisition strategies.
            </motion.p>

            {/* Contact Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
            >
              {contactItems.map(({ icon: Icon, label, href }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-primary)] flex-shrink-0 shadow-lg">
                    <Icon size={20} />
                  </div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[var(--text-primary)] font-medium hover:text-[var(--color-primary)] transition-colors truncate">
                      {label}
                    </a>
                  ) : (
                    <span className="text-[var(--text-primary)] font-medium truncate">{label}</span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-[var(--bg-primary)] rounded-full font-bold uppercase tracking-wider hover:bg-[var(--color-primary-light)] hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.5)] transition-all"
              >
                Download Resume <Download size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
