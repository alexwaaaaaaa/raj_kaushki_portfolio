'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, MapPin, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioProfile } from '@/hooks/usePortfolioData';
import { useIntersectionObserver } from '@/hooks/useScrollSpy';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact(): React.ReactElement {
  const profile = usePortfolioProfile();
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Message sent successfully! I will get back to you soon.');
    reset();
    setIsSubmitting(false);
  };

  // Safety check
  if (!profile || !profile.email) {
    return <section id="contact" className="section-padding bg-[var(--bg-primary)]"><div className="container-xl mx-auto px-6 text-center text-[var(--text-secondary)]">Loading...</div></section>;
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: Phone, label: 'Phone', value: profile.phone.join(' | '), href: `tel:${profile.phone[0]}` },
    { icon: Linkedin, label: 'LinkedIn', value: profile.linkedin, href: `https://${profile.linkedin}` },
  ];

  return (
    <section id="contact" ref={ref} className="section-padding bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-secondary)] opacity-5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm mb-4">
            Contact Me
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
            Let's <span className="text-[var(--color-primary)]">Connect</span>
          </h2>
          <div className="w-20 h-1.5 bg-[var(--color-primary)] rounded-full mx-auto shadow-[0_0_10px_var(--color-primary)]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              I am currently open to new opportunities, freelance consulting, and exciting HR projects. Send me a message and let's discuss how we can work together.
            </p>
            
            <div className="space-y-6">
              {contactItems.map(({ icon: Icon, label, value, href }, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--bg-primary)] transition-all duration-300 shadow-md">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[var(--text-primary)] font-bold text-lg hover:text-[var(--color-primary)] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span className="text-[var(--text-primary)] font-bold text-lg">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Row */}
            <div className="pt-8 flex items-center gap-4">
              <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${profile.email}`} className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#ea4335] hover:text-white hover:border-[#ea4335] transition-all">
                <Mail size={20} />
              </a>
              <a href={`https://wa.me/91${profile.phone[0]}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </motion.div>

          {/* Form (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden" noValidate>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input {...register('name')} className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="Your Name" />
                  {errors.name && <span className="text-red-500 text-xs mt-2 block pl-2">{errors.name.message}</span>}
                </div>
                <div>
                  <input {...register('email')} type="email" className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors" placeholder="Your Email" />
                  {errors.email && <span className="text-red-500 text-xs mt-2 block pl-2">{errors.email.message}</span>}
                </div>
              </div>
              
              <div className="mb-6">
                <textarea {...register('message')} rows={6} className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none" placeholder="Your Message" />
                {errors.message && <span className="text-red-500 text-xs mt-2 block pl-2">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-[var(--bg-primary)] rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.5)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

export default Contact;
