'use client';

import React, { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { EditableCard } from '../shared/EditableCard';
import { SortableItem } from '../shared/SortableItem';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function SkillsTab(): React.ReactElement {
  const skills = usePortfolioStore((s) => s.data.skills);
  const setSkills = usePortfolioStore((s) => s.updateSkills);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = skills.findIndex((x) => x.id === active.id);
      const newIndex = skills.findIndex((x) => x.id === over.id);
      setSkills(arrayMove(skills, oldIndex, newIndex));
    }
  };

  const startEdit = (skill: any) => {
    setEditingId(skill.id);
    setEditForm({ ...skill });
  };

  const handleSave = () => {
    if (editingId === 'new') {
      setSkills([editForm, ...skills]);
    } else {
      setSkills(skills.map(s => s.id === editingId ? editForm : s));
    }
    setEditingId(null);
    toast.success('Skill saved');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this skill?')) {
      setSkills(skills.filter(s => s.id !== id));
      toast.success('Skill deleted');
    }
  };

  const addNew = () => {
    setEditingId('new');
    setEditForm({
      id: `s_${Date.now()}`,
      name: '', level: 50, category: 'Core'
    });
  };

  const uniqueCategories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Skills</h2>
          <p className="text-[var(--text-muted)] text-sm">Manage skills and proficiency levels.</p>
        </div>
        <button onClick={addNew} disabled={editingId !== null} className="btn btn-outline flex items-center gap-2">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {editingId === 'new' && (
              <EditableCard isEditing onSave={handleSave} onCancel={() => setEditingId(null)} title="New Skill">
                <SkillForm state={editForm} setState={setEditForm} categories={uniqueCategories} />
              </EditableCard>
            )}

            {skills.map(skill => (
              <SortableItem key={skill.id} id={skill.id}>
                {(dragHandleProps) => (
                  <EditableCard
                    title={skill.name}
                    subtitle={`${skill.category} • ${skill.level}%`}
                    isEditing={editingId === skill.id}
                    onEdit={() => startEdit(skill)}
                    onDelete={() => handleDelete(skill.id)}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                    dragHandleProps={dragHandleProps}
                  >
                    {editingId === skill.id && <SkillForm state={editForm} setState={setEditForm} categories={uniqueCategories} />}
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

function SkillForm({ state, setState, categories }: { state: any, setState: any, categories: string[] }) {
  const handleChange = (e: any) => setState({ ...state, [e.target.name]: e.target.value });
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Skill Name</label>
        <input name="name" value={state.name} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Category</label>
        <input name="category" list="categories" value={state.category} onChange={handleChange} className="input w-full" />
        <datalist id="categories">
          {categories.map(c => <option key={c} value={c} />)}
        </datalist>
      </div>
      <div className="col-span-2">
        <label className="text-xs text-[var(--text-secondary)] mb-1 flex justify-between">
          <span>Proficiency Level</span>
          <span className="text-[var(--color-primary)]">{state.level}%</span>
        </label>
        <input 
          type="range" 
          name="level" 
          min="1" max="100" 
          value={state.level} 
          onChange={(e) => setState({ ...state, level: parseInt(e.target.value) })}
          className="w-full accent-[var(--color-primary)]" 
        />
      </div>
    </div>
  );
}

export default SkillsTab;
