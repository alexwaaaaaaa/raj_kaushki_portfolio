'use client';

import React, { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { EditableCard } from '../shared/EditableCard';
import { SortableItem } from '../shared/SortableItem';
import { ColorPicker } from '../shared/ColorPicker';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function CertificationsTab(): React.ReactElement {
  const certs = usePortfolioStore((s) => s.data.certifications);
  const setCerts = usePortfolioStore((s) => s.updateCertifications);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = certs.findIndex((x) => x.id === active.id);
      const newIndex = certs.findIndex((x) => x.id === over.id);
      setCerts(arrayMove(certs, oldIndex, newIndex));
    }
  };

  const startEdit = (cert: any) => {
    setEditingId(cert.id);
    setEditForm({ ...cert });
  };

  const handleSave = () => {
    if (editingId === 'new') {
      setCerts([editForm, ...certs]);
    } else {
      setCerts(certs.map(c => c.id === editingId ? editForm : c));
    }
    setEditingId(null);
    toast.success('Certification saved');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this certification?')) {
      setCerts(certs.filter(c => c.id !== id));
      toast.success('Certification deleted');
    }
  };

  const addNew = () => {
    setEditingId('new');
    setEditForm({
      id: `c_${Date.now()}`,
      name: '', issuer: '', year: new Date().getFullYear().toString(), credentialId: '', color: '#c9a84c'
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Certifications</h2>
          <p className="text-[var(--text-muted)] text-sm">Manage your professional certifications.</p>
        </div>
        <button onClick={addNew} disabled={editingId !== null} className="btn btn-outline flex items-center gap-2">
          <Plus size={16} /> Add Cert
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={certs.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {editingId === 'new' && (
              <EditableCard isEditing onSave={handleSave} onCancel={() => setEditingId(null)} title="New Certification">
                <CertForm state={editForm} setState={setEditForm} />
              </EditableCard>
            )}

            {certs.map(cert => (
              <SortableItem key={cert.id} id={cert.id}>
                {(dragHandleProps) => (
                  <EditableCard
                    title={cert.name}
                    subtitle={`${cert.issuer} • ${cert.year}`}
                    isEditing={editingId === cert.id}
                    onEdit={() => startEdit(cert)}
                    onDelete={() => handleDelete(cert.id)}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                    dragHandleProps={dragHandleProps}
                  >
                    {editingId === cert.id && <CertForm state={editForm} setState={setEditForm} />}
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

function CertForm({ state, setState }: { state: any, setState: any }) {
  const handleChange = (e: any) => setState({ ...state, [e.target.name]: e.target.value });
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Certification Name</label>
        <input name="name" value={state.name} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Issuer</label>
        <input name="issuer" value={state.issuer} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Year</label>
        <input name="year" value={state.year} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Credential ID / URL</label>
        <input name="credentialId" value={state.credentialId} onChange={handleChange} className="input w-full" />
      </div>
      <div>
        <ColorPicker color={state.color} onChange={(c) => setState({ ...state, color: c })} label="Theme Color" />
      </div>
    </div>
  );
}

export default CertificationsTab;
