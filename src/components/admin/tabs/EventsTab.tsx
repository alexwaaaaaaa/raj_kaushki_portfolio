'use client';

import React, { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Plus, Trash2, Image as ImageIcon, MapPin, Calendar, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export function EventsTab(): React.ReactElement {
  const events = usePortfolioStore((s) => s.data.events) || [];
  const addEvent = usePortfolioStore((s) => s.addEvent);
  const updateEventItem = usePortfolioStore((s) => s.updateEventItem);
  const deleteEvent = usePortfolioStore((s) => s.deleteEvent);

  const [isUploading, setIsUploading] = useState<string | null>(null);

  const handleAddNew = () => {
    addEvent({
      id: crypto.randomUUID(),
      title: 'New Event',
      description: 'Event description goes here...',
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      location: 'City, Country',
    });
    toast.success('New event added. Scroll down to edit it.');
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be under 5MB');
      return;
    }

    setIsUploading(id);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload');
      }

      updateEventItem(id, { imageUrl: data.url });
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image');
    } finally {
      setIsUploading(null);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Events & Gallery</h2>
          <p className="text-[var(--text-muted)] text-sm">Manage your professional event photos and posts.</p>
        </div>
        <button onClick={handleAddNew} className="btn btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="glass-strong card p-6 border border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 relative group">
            
            <button 
              onClick={() => deleteEvent(event.id)}
              className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Delete Event"
            >
              <Trash2 size={18} />
            </button>

            {/* Image Upload Area */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider block">Event Photo</label>
              <div className="w-full aspect-[4/3] bg-[var(--bg-elevated)] border-2 border-dashed border-[var(--border-subtle)] rounded-xl overflow-hidden relative flex items-center justify-center group/img">
                {event.imageUrl ? (
                  <>
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                      <label className="btn btn-primary cursor-pointer text-sm">
                        Change Photo
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(event.id, e)} disabled={isUploading === event.id} />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-sm font-medium">{isUploading === event.id ? 'Uploading...' : 'Upload Photo'}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(event.id, e)} disabled={isUploading === event.id} />
                  </label>
                )}
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">Max 5MB. Will be uploaded to /public/uploads</p>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Event Title</label>
                <input 
                  type="text" 
                  value={event.title} 
                  onChange={(e) => updateEventItem(event.id, { title: e.target.value })} 
                  className="input w-full font-bold text-lg" 
                  placeholder="E.g., HR Summit 2025"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--text-secondary)] mb-1 block">Date</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      type="date" 
                      value={event.date} 
                      onChange={(e) => updateEventItem(event.id, { date: e.target.value })} 
                      className="input w-full pl-9" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-secondary)] mb-1 block">Location</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      type="text" 
                      value={event.location || ''} 
                      onChange={(e) => updateEventItem(event.id, { location: e.target.value })} 
                      className="input w-full pl-9" 
                      placeholder="E.g., New Delhi"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Description</label>
                <textarea 
                  value={event.description} 
                  onChange={(e) => updateEventItem(event.id, { description: e.target.value })} 
                  rows={4} 
                  className="input w-full resize-none leading-relaxed" 
                  placeholder="Write a few lines about the event and your experience..."
                />
              </div>
            </div>

          </div>
        ))}

        {events.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[var(--border-subtle)] rounded-xl">
            <ImageIcon size={48} className="mx-auto text-[var(--text-muted)] mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">No Events Yet</h3>
            <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">Add your professional events, talks, or gallery photos here.</p>
            <button onClick={handleAddNew} className="btn btn-primary mx-auto">
              Add Your First Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsTab;
