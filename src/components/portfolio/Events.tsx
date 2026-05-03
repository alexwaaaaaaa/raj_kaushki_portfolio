'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Camera } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useIntersectionObserver } from '@/hooks/useScrollSpy';

export function Events(): React.ReactElement | null {
  const events = usePortfolioStore((s) => s.data.events);
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });

  if (!events || events.length === 0) return null;

  return (
    <section id="events" ref={ref} className="bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] overflow-hidden">
      <div className="section-padding container-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
            Event <span className="text-[var(--color-primary)]">Gallery</span>
          </h2>
          <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full mx-auto shadow-[0_0_10px_var(--color-primary)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden group hover:border-[var(--color-primary)] transition-colors duration-300 shadow-lg flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] bg-[var(--bg-secondary)] relative overflow-hidden">
                {event.imageUrl ? (
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                    <Camera size={48} className="opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent opacity-60" />
              </div>
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                  )}
                </div>
                
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-[var(--text-secondary)] leading-relaxed mt-auto">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
