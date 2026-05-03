'use client';

import React, { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { EditableCard } from '../shared/EditableCard';
import { SortableItem } from '../shared/SortableItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';

export function StrengthsTab(): React.ReactElement {
  const strengths = usePortfolioStore((s) => s.data.strengths);
  const setStrengths = usePortfolioStore((s) => s.updateStrengths);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = strengths.findIndex((x) => x.label === active.id);
      const newIndex = strengths.findIndex((x) => x.label === over.id);
      setStrengths(arrayMove(strengths, oldIndex, newIndex));
    }
  };

  const startEdit = (strength: any) => {
    setEditingId(strength.label);
    setEditForm({ ...strength, id: strength.label });
  };

  const handleSave = () => {
    const newStrengths = [...strengths];
    if (editingId === 'new') {
      newStrengths.push({ icon: editForm.icon, label: editForm.label, desc: editForm.desc });
    } else {
      const idx = newStrengths.findIndex(s => s.label === editingId);
      newStrengths[idx] = { icon: editForm.icon, label: editForm.label, desc: editForm.desc };
    }
    setStrengths(newStrengths);
    setEditingId(null);
    toast.success('Strength saved');
  };

  const handleDelete = (label: string) => {
    if (confirm('Delete this strength?')) {
      setStrengths(strengths.filter(s => s.label !== label));
      toast.success('Strength deleted');
    }
  };

  const addNew = () => {
    setEditingId('new');
    setEditForm({ id: 'new', icon: 'Star', label: '', desc: '' });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Strengths</h2>
          <p className="text-[var(--text-muted)] text-sm">Manage key strengths with icons.</p>
        </div>
        <button onClick={addNew} disabled={editingId !== null} className="btn btn-outline flex items-center gap-2">
          <Plus size={16} /> Add Strength
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={strengths.map(s => s.label)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {editingId === 'new' && (
              <EditableCard isEditing onSave={handleSave} onCancel={() => setEditingId(null)} title="New Strength">
                <StrengthForm state={editForm} setState={setEditForm} />
              </EditableCard>
            )}

            {strengths.map(strength => (
              <SortableItem key={strength.label} id={strength.label}>
                {(dragHandleProps) => (
                  <EditableCard
                    title={strength.label}
                    subtitle={strength.desc}
                    isEditing={editingId === strength.label}
                    onEdit={() => startEdit(strength)}
                    onDelete={() => handleDelete(strength.label)}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                    dragHandleProps={dragHandleProps}
                  >
                    {editingId === strength.label && <StrengthForm state={editForm} setState={setEditForm} />}
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

function StrengthForm({ state, setState }: { state: any, setState: any }) {
  const handleChange = (e: any) => setState({ ...state, [e.target.name]: e.target.value });
  
  // Quick list of popular icons
  const iconList = ['Zap', 'Users', 'Layers', 'TrendingUp', 'Star', 'Award', 'Briefcase', 'Heart', 'Target', 'Coffee'];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Label / Title</label>
        <input name="label" value={state.label} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Icon Name (Lucide)</label>
        <select name="icon" value={state.icon} onChange={handleChange} className="input w-full">
          {iconList.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div className="col-span-2">
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Description</label>
        <input name="desc" value={state.desc} onChange={handleChange} className="input w-full" />
      </div>
    </div>
  );
}

export default StrengthsTab;
