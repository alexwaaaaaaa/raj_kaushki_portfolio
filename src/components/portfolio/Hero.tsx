'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { usePortfolioProfile } from '@/hooks/usePortfolioData';

const TYPEWRITER_TITLES = [
  'Human Resources Manager',
  'Talent Acquisition Expert',
  'Team Builder & Leader',
  'HR Operations Specialist',
];

function useTypewriter(titles: string[], speed = 80, pause = 2000): string {
  const [display, setDisplay] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTitleIndex((t) => (t + 1) % titles.length);
    }

    setDisplay(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, titleIndex, titles, speed, pause]);

  return display;
}

export function Hero(): React.ReactElement {
  const profile = usePortfolioProfile();
  const shouldReduceMotion = useReducedMotion();
  const typewriterText = useTypewriter(TYPEWRITER_TITLES);

  // Safety check: if profile is not loaded yet, show loading state
  if (!profile || !profile.name) {
    return (
      <section id="hero" className="relative min-h-[100vh] pt-32 pb-0 flex flex-col justify-center overflow-hidden bg-[var(--bg-primary)]">
        <div className="container-xl mx-auto px-6 w-full z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
            <p className="mt-4 text-[var(--text-secondary)]">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="hero" className="relative min-h-[100vh] pt-32 pb-0 flex flex-col justify-center overflow-hidden bg-[var(--bg-primary)]">
      <div className="container-xl mx-auto px-6 w-full z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT COLUMN */}
        <motion.div 
          className="w-full lg:w-[55%]"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] mb-8 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span className="text-xs font-semibold text-[var(--color-primary)] tracking-wider uppercase">Available for Work</span>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[var(--text-secondary)] mb-3 font-body text-lg">
            Hello, I'm
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="font-display font-black text-5xl md:text-7xl mb-4 leading-[1.1] tracking-tight">
            {profile.name.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-[var(--color-primary)]" : "text-[var(--text-primary)]"}>{word} </span>
            ))}
          </motion.h1>

          <motion.div variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-[var(--text-secondary)] mb-8 h-10 flex items-center">
            I'm a&nbsp;<span className="text-[var(--color-primary)]">{typewriterText}</span>
            <span className="inline-block w-0.5 h-8 bg-[var(--color-primary)] ml-1 animate-pulse align-middle" />
          </motion.div>

          <motion.p variants={itemVariants} className="text-[var(--text-muted)] text-lg max-w-lg mb-10 leading-relaxed font-light">
            {profile.summary}
          </motion.p>



          <motion.div variants={itemVariants} className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}` },
              { icon: Mail, href: `mailto:${profile.email}` }
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[rgba(var(--color-primary-rgb),0.05)] transition-all duration-300">
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN (Glowing Cutout Style) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-[45%] flex justify-center items-end relative min-h-[300px] md:min-h-[500px] mt-12 lg:mt-0"
        >
          {/* Radial Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full bg-[var(--color-secondary)] opacity-30 blur-[80px] md:blur-[120px] mix-blend-screen z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[550px] h-[200px] md:h-[550px] rounded-full bg-[var(--color-primary)] opacity-20 blur-[60px] md:blur-[90px] mix-blend-screen z-0" />
          
          {/* Avatar Container (Transparent Cutout) */}
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[650px] flex items-end justify-center z-10">
            {profile.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]" 
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              />
            ) : (
              <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[0_0_60px_rgba(0,0,0,0.6)]">
                <span className="font-display font-bold text-6xl md:text-7xl text-[var(--color-primary)] tracking-tighter">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            

          </div>
        </motion.div>
      </div>





      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

export default Hero;
