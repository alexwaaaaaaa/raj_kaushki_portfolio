'use client';

import React, { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { EditableCard } from '../shared/EditableCard';
import { SortableItem } from '../shared/SortableItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

export function ExperienceTab(): React.ReactElement {
  const experiences = usePortfolioStore((s) => s.data.experience);
  const setExperience = usePortfolioStore((s) => s.updateExperience);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = experiences.findIndex((x) => x.id === active.id);
      const newIndex = experiences.findIndex((x) => x.id === over.id);
      setExperience(arrayMove(experiences, oldIndex, newIndex));
    }
  };

  const startEdit = (exp: any) => {
    setEditingId(exp.id);
    setEditForm({ ...exp, bullets: [...exp.bullets] });
  };

  const handleSave = () => {
    if (editingId === 'new') {
      setExperience([editForm, ...experiences]);
    } else {
      setExperience(experiences.map(e => e.id === editingId ? editForm : e));
    }
    setEditingId(null);
    toast.success('Experience saved');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this experience?')) {
      setExperience(experiences.filter(e => e.id !== id));
      toast.success('Experience deleted');
    }
  };

  const addNew = () => {
    setEditingId('new');
    setEditForm({
      id: `exp_${Date.now()}`,
      role: '', company: '', location: '', duration: '', type: 'Full-time', bullets: ['']
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Experience</h2>
          <p className="text-[var(--text-muted)] text-sm">Manage your work history timeline.</p>
        </div>
        <button onClick={addNew} disabled={editingId !== null} className="btn btn-outline flex items-center gap-2">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experiences.map(e => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {editingId === 'new' && (
              <EditableCard isEditing onSave={handleSave} onCancel={() => setEditingId(null)} title="New">
                <EditForm state={editForm} setState={setEditForm} />
              </EditableCard>
            )}

            {experiences.map(exp => (
              <SortableItem key={exp.id} id={exp.id}>
                {(dragHandleProps) => (
                  <EditableCard
                    title={exp.role}
                    subtitle={`${exp.company} • ${exp.duration}`}
                    isEditing={editingId === exp.id}
                    onEdit={() => startEdit(exp)}
                    onDelete={() => handleDelete(exp.id)}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                    dragHandleProps={dragHandleProps}
                  >
                    {editingId === exp.id && <EditForm state={editForm} setState={setEditForm} />}
                  </EditableCard>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// Inner form component for clean code
function EditForm({ state, setState }: { state: any, setState: any }) {
  const handleChange = (e: any) => setState({ ...state, [e.target.name]: e.target.value });
  
  const handleBulletChange = (idx: number, val: string) => {
    const nb = [...state.bullets];
    nb[idx] = val;
    setState({ ...state, bullets: nb });
  };

  const addBullet = () => setState({ ...state, bullets: [...state.bullets, ''] });
  const removeBullet = (idx: number) => setState({ ...state, bullets: state.bullets.filter((_:any, i:number) => i !== idx) });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Role / Title</label>
        <input name="role" value={state.role} onChange={handleChange} className="input w-full" placeholder="e.g. Senior HR Recruiter" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Company</label>
        <input name="company" value={state.company} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Location</label>
        <input name="location" value={state.location} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Duration</label>
        <input name="duration" value={state.duration} onChange={handleChange} className="input w-full" placeholder="e.g. Jan 2023 - Present" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Type</label>
        <input name="type" value={state.type} onChange={handleChange} className="input w-full" placeholder="e.g. Full-time" />
      </div>
      <div className="col-span-2 mt-2">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-[var(--text-secondary)] block">Bullets</label>
          <button onClick={addBullet} className="text-xs text-[var(--color-primary)] hover:underline">+ Add Bullet</button>
        </div>
        <div className="space-y-2">
          {state.bullets.map((b: string, i: number) => (
            <div key={i} className="flex gap-2">
              <input value={b} onChange={(e) => handleBulletChange(i, e.target.value)} className="input w-full text-xs" />
              <button onClick={() => removeBullet(i)} className="text-red-400 p-2 hover:bg-red-500/10 rounded">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExperienceTab;
