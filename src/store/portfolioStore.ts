import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PortfolioData, PortfolioProfile, ExperienceItem, SkillItem, CertificationItem, StrengthItem } from '@/types';

const DEFAULT_DATA: PortfolioData = {
  profile: {
    name: 'Raj Kaushki',
    title: 'Human Resources Manager',
    tagline: 'Building teams that build companies.',
    email: 'indrajkaushki@gmail.com',
    phone: [],
    location: 'Sector 63, Noida, Uttar Pradesh',
    linkedin: 'https://www.linkedin.com/in/kaushki-careerconnect-279267227/',
    summary:
      'Motivated HR professional with experience in recruitment, talent acquisition, HR operations, onboarding, interview coordination, administrative functions and employee engagement.',
    stats: [
      { label: 'Years Experience', value: 2 },
      { label: 'Candidates Placed', value: 100 },
      { label: 'Team Members Led', value: 5 },
      { label: 'Clients Served', value: 20 },
    ],
    avatarUrl: '',
    aboutImage: '',
  },
  experience: [
    {
      id: 'exp1',
      role: 'Human Resources Manager',
      company: 'Brothers Infotech Solution Pvt. Ltd.',
      location: 'Sector 63, Noida, UP',
      duration: 'December 2025 – Present',
      type: 'Full-time',
      bullets: [
        'Managed end-to-end recruitment: sourcing, screening, interviewing, onboarding',
        'Led and coordinated team activities to hit hiring targets within deadlines',
        'Ensured employee documentation and compliance with company policies',
        'Assisted in payroll processing and maintained strong candidate relationships',
        'Prepared MIS reports to track recruitment performance and metrics',
        'Handled client interactions, understood hiring needs, delivered candidates on time',
        'Managed employee exit processes and identified new business opportunities',
      ],
    },
    {
      id: 'exp2',
      role: 'Human Resources Executive',
      company: 'Guru HR Solutions',
      location: 'Sector 63, Noida, UP',
      duration: 'October 2025 – December 2025',
      type: 'Full-time · 3 months',
      bullets: [
        'Sourced candidates through job portals and screened resumes per JD',
        'Scheduled interviews and coordinated between candidates and hiring managers',
        'Managed employee joining process, documentation, and induction activities',
        'Maintained employee records, attendance, and updated HR databases',
        'Prepared daily hiring status and attendance reports',
        'Weekly follow-ups with selected candidates until joining',
      ],
    },
    {
      id: 'exp3',
      role: 'Senior HR Recruiter',
      company: 'Culabr International',
      location: 'Advant Tower, Noida, UP',
      duration: 'November 2024 – October 2025',
      type: 'Full-time · 13 months',
      bullets: [
        'Managed end-to-end recruitment for multiple roles across departments',
        'Partnered with clients to understand requirements and deliver quality candidates',
        'Led a team of 5 recruiters, mentoring them to achieve monthly hiring targets',
        'Implemented sourcing strategies via job portals, LinkedIn, and referrals',
        'Ensured excellent candidate experience through regular communication',
        'Managed bulk and critical hiring including dropout replacements',
      ],
    },
    {
      id: 'exp4',
      role: 'Human Resources Intern',
      company: 'Saumata Service India Pvt. Ltd.',
      location: 'Noida One, Sector 62, Noida, UP',
      duration: 'September 2024 – November 2024',
      type: 'Internship · 3 months',
      bullets: [
        'Gained hands-on experience in end-to-end recruitment process',
        'Used job portals (Apna, Job Hai, LinkedIn) for sourcing and talent mapping',
        'Learned resume screening techniques and shortlisting against JDs',
        'Assisted in interview scheduling and coordination',
        'Understood employee onboarding, documentation, and induction procedures',
        'Developed communication, coordination, and organizational skills',
      ],
    },
  ],
  skills: [
    { id: 's1', name: 'HR Management', level: 92, category: 'Core' },
    { id: 's2', name: 'Talent Acquisition', level: 95, category: 'Core' },
    { id: 's3', name: 'Recruitment Strategy', level: 90, category: 'Core' },
    { id: 's4', name: 'Candidate Engagement', level: 88, category: 'Soft' },
    { id: 's5', name: 'Onboarding Processes', level: 85, category: 'Operations' },
    { id: 's6', name: 'Interview Coordination', level: 93, category: 'Core' },
    { id: 's7', name: 'HR Operations', level: 87, category: 'Operations' },
    { id: 's8', name: 'Employee Relations', level: 84, category: 'Soft' },
    { id: 's9', name: 'Compliance Support', level: 80, category: 'Operations' },
    { id: 's10', name: 'MIS Reporting', level: 78, category: 'Operations' },
    { id: 's11', name: 'Team Leadership', level: 82, category: 'Soft' },
    { id: 's12', name: 'Client Management', level: 86, category: 'Soft' },
  ],
  certifications: [
    {
      id: 'c1',
      name: 'Excel Skills Job Simulation',
      issuer: 'JP Morgan Chase & Co.',
      year: '2024',
      credentialId: 'JPMC-EXCEL-2024',
      color: '#1a73e8',
    },
  ],
  strengths: [
    { icon: 'Zap', label: 'Fast Learner', desc: 'Adapts quickly to new tools and environments' },
    { icon: 'Users', label: 'Team Player', desc: 'Thrives in collaborative, cross-functional teams' },
    { icon: 'Layers', label: 'Multitasker', desc: 'Manages multiple requisitions and priorities' },
    { icon: 'TrendingUp', label: 'Growth Mindset', desc: 'Continuously upskilling and self-improving' },
  ],
  events: [
    {
      id: 'e1',
      title: 'Annual HR Summit 2025',
      description: 'Attended the Annual HR Summit to discuss the future of AI in recruitment.',
      date: '2025-08-15',
      imageUrl: '',
      location: 'New Delhi, India',
    }
  ],
};

interface PortfolioStore {
  data: PortfolioData;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  updateProfile: (profile: Partial<PortfolioProfile>) => void;
  updateExperience: (exp: ExperienceItem[]) => void;
  addExperience: (item: ExperienceItem) => void;
  updateExperienceItem: (id: string, item: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  updateSkills: (skills: SkillItem[]) => void;
  addSkill: (skill: SkillItem) => void;
  updateSkillItem: (id: string, item: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  updateCertifications: (certs: CertificationItem[]) => void;
  addCertification: (cert: CertificationItem) => void;
  updateCertificationItem: (id: string, item: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  updateStrengths: (strengths: StrengthItem[]) => void;
  updateEvents: (events: import('@/types').EventItem[]) => void;
  addEvent: (event: import('@/types').EventItem) => void;
  updateEventItem: (id: string, item: Partial<import('@/types').EventItem>) => void;
  deleteEvent: (id: string) => void;
  resetToDefaults: () => void;
  fetchFromServer: () => Promise<void>;
  publishToServer: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      data: DEFAULT_DATA,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      updateProfile: (profile) =>
        set((s) => ({ data: { ...s.data, profile: { ...s.data.profile, ...profile } } })),
      updateExperience: (experience) =>
        set((s) => ({ data: { ...s.data, experience } })),
      addExperience: (item) =>
        set((s) => ({ data: { ...s.data, experience: [item, ...s.data.experience] } })),
      updateExperienceItem: (id, item) =>
        set((s) => ({
          data: {
            ...s.data,
            experience: s.data.experience.map((e) => (e.id === id ? { ...e, ...item } : e)),
          },
        })),
      deleteExperience: (id) =>
        set((s) => ({
          data: { ...s.data, experience: s.data.experience.filter((e) => e.id !== id) },
        })),
      updateSkills: (skills) => set((s) => ({ data: { ...s.data, skills } })),
      addSkill: (skill) =>
        set((s) => ({ data: { ...s.data, skills: [...s.data.skills, skill] } })),
      updateSkillItem: (id, item) =>
        set((s) => ({
          data: {
            ...s.data,
            skills: s.data.skills.map((sk) => (sk.id === id ? { ...sk, ...item } : sk)),
          },
        })),
      deleteSkill: (id) =>
        set((s) => ({ data: { ...s.data, skills: s.data.skills.filter((sk) => sk.id !== id) } })),
      updateCertifications: (certifications) =>
        set((s) => ({ data: { ...s.data, certifications } })),
      addCertification: (cert) =>
        set((s) => ({
          data: { ...s.data, certifications: [...s.data.certifications, cert] },
        })),
      updateCertificationItem: (id, item) =>
        set((s) => ({
          data: {
            ...s.data,
            certifications: s.data.certifications.map((c) => (c.id === id ? { ...c, ...item } : c)),
          },
        })),
      deleteCertification: (id) =>
        set((s) => ({
          data: {
            ...s.data,
            certifications: s.data.certifications.filter((c) => c.id !== id),
          },
        })),
      updateStrengths: (strengths) => set((s) => ({ data: { ...s.data, strengths } })),
      updateEvents: (events) => set((s) => ({ data: { ...s.data, events } })),
      addEvent: (event) =>
        set((s) => ({ data: { ...s.data, events: [event, ...(s.data.events || [])] } })),
      updateEventItem: (id, item) =>
        set((s) => ({
          data: {
            ...s.data,
            events: (s.data.events || []).map((e) => (e.id === id ? { ...e, ...item } : e)),
          },
        })),
      deleteEvent: (id) =>
        set((s) => ({
          data: { ...s.data, events: (s.data.events || []).filter((e) => e.id !== id) },
        })),
      resetToDefaults: () => set({ data: DEFAULT_DATA }),
      fetchFromServer: async () => {
        try {
          const res = await fetch('/api/data');
          if (res.ok) {
            let serverData = await res.json();
            if (typeof serverData === 'string') {
              try {
                serverData = JSON.parse(serverData);
              } catch (e) {
                // ignore
              }
            }
            if (serverData && typeof serverData === 'object' && Object.keys(serverData).length > 0) {

              set({ data: serverData });
            } else {
              // If server returns empty, use DEFAULT_DATA
              console.log('No data in Redis, using default data');
              set({ data: DEFAULT_DATA });
            }
          }
        } catch (error) {
          console.error('Failed to fetch data from server', error);
          // On error, use DEFAULT_DATA
          set({ data: DEFAULT_DATA });
        }
      },
      publishToServer: async () => {
        try {
          // get state directly
          const state = usePortfolioStore.getState();
          const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state.data),
          });
          if (!res.ok) throw new Error('Failed to publish');
        } catch (error) {
          console.error('Failed to publish to server', error);
          throw error; // re-throw to handle in UI
        }
      },
    }),
    {
      name: 'rk-portfolio-data',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);

        }
      },
    }
  )
);
