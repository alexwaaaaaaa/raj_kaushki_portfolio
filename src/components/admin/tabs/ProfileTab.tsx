'use client';

import React from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileTab(): React.ReactElement {
  const profile = usePortfolioStore((s) => s.data.profile);
  const updateProfile = usePortfolioStore((s) => s.updateProfile);

  const [formData, setFormData] = React.useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhone = [...formData.phone];
    newPhone[index] = value;
    setFormData({ ...formData, phone: newPhone });
  };

  const handleStatChange = (index: number, key: 'label' | 'value', value: string | number) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [key]: value };
    setFormData({ ...formData, stats: newStats });
  };

  const onSave = () => {
    updateProfile(formData);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Profile Settings</h2>
          <p className="text-[var(--text-muted)] text-sm">Update your personal information and statistics.</p>
        </div>
        <button onClick={onSave} className="btn btn-primary flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="space-y-8">
        <div className="glass-strong card p-6 border border-[var(--border-subtle)] space-y-4">
          <h3 className="font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">Basic Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">Professional Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="input w-full" />
            </div>
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Profile Photo (URL or Upload)</label>
            <div className="flex gap-2 items-center">
              <input 
                type="text" 
                name="avatarUrl" 
                value={formData.avatarUrl || ''} 
                onChange={handleChange} 
                className="input w-full" 
                placeholder="https://example.com/my-photo.png"
              />
              <label className="btn btn-outline cursor-pointer whitespace-nowrap px-4 py-2">
                Upload
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error('Image is too large. Please use an image under 2MB.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setFormData({ ...formData, avatarUrl: event.target.result as string });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
              </label>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">For best results, use a transparent PNG cutout under 2MB. Or paste a direct URL (Imgur, Cloudinary, etc.) if it's larger.</p>
            {formData.avatarUrl && (
              <div className="mt-2 w-24 h-24 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
                <img src={formData.avatarUrl} alt="Avatar Preview" className="w-full h-full object-contain" />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">About Section Image (URL or Upload)</label>
            <div className="flex gap-2">
              <input type="text" name="aboutImage" value={formData.aboutImage || ''} onChange={handleChange} className="input w-full" placeholder="Paste URL..." />
              <label className="btn btn-outline cursor-pointer whitespace-nowrap">
                Upload
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error('Image is too large. Please use an image under 2MB.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setFormData({ ...formData, aboutImage: event.target.result as string });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
              </label>
            </div>
            {formData.aboutImage && (
              <div className="mt-2 w-24 h-24 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
                <img src={formData.aboutImage} alt="About Image Preview" className="w-full h-full object-contain" />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Tagline</label>
            <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="input w-full" />
          </div>

          <div>
            <label className="text-xs text-[var(--text-secondary)] mb-1 block">Professional Summary</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} rows={5} className="input w-full resize-none" />
          </div>
        </div>

        <div className="glass-strong card p-6 border border-[var(--border-subtle)] space-y-4">
          <h3 className="font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">Contact Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">LinkedIn URL</label>
              <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="input w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="input w-full" />
            </div>
            
            {formData.phone.map((ph, idx) => (
              <div key={idx}>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Phone {idx + 1}</label>
                <input type="text" value={ph} onChange={(e) => handlePhoneChange(idx, e.target.value)} className="input w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong card p-6 border border-[var(--border-subtle)] space-y-4">
          <h3 className="font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">Hero Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {formData.stats.map((stat, idx) => (
              <div key={idx} className="p-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg">
                <input 
                  type="text" 
                  value={stat.label} 
                  onChange={(e) => handleStatChange(idx, 'label', e.target.value)} 
                  className="bg-transparent border-none focus:ring-0 text-sm text-[var(--text-secondary)] w-full mb-1 p-0"
                />
                <input 
                  type="number" 
                  value={stat.value} 
                  onChange={(e) => handleStatChange(idx, 'value', parseInt(e.target.value) || 0)} 
                  className="bg-transparent border-none focus:ring-0 text-xl font-bold text-[var(--text-primary)] w-full p-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;
