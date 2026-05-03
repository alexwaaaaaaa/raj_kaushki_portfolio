'use client';

import React from 'react';
import { Pencil, Trash2, GripVertical, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface EditableCardProps {
  title: string;
  subtitle?: string;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  dragHandleProps?: any;
  children?: React.ReactNode;
}

export function EditableCard({
  title, subtitle, isEditing, onEdit, onDelete, onSave, onCancel, dragHandleProps, children
}: EditableCardProps): React.ReactElement {
  
  if (isEditing) {
    return (
      <div className="bg-[var(--bg-elevated)] border border-[var(--color-primary)] rounded-xl p-4 shadow-lg mb-3">
        <div className="flex justify-between items-center mb-4 border-b border-[var(--border-subtle)] pb-2">
          <h4 className="font-display font-semibold text-[var(--color-primary)] text-sm">Editing Item</h4>
          <div className="flex gap-2">
            <button onClick={onCancel} className="p-1.5 text-[var(--text-muted)] hover:text-red-400 transition-colors bg-[var(--bg-card)] rounded-md">
              <X size={14} />
            </button>
            <button onClick={onSave} className="p-1.5 text-[var(--bg-primary)] bg-[var(--color-primary)] hover:bg-[var(--gold-400)] transition-colors rounded-md">
              <Check size={14} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className="bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] rounded-xl p-3 mb-3 flex items-start gap-3 group transition-colors"
    >
      <div {...dragHandleProps} className="mt-1 cursor-grab active:cursor-grabbing text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
        <GripVertical size={16} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[var(--text-primary)] text-sm truncate">{title}</h4>
        {subtitle && <p className="text-[var(--text-muted)] text-xs truncate mt-0.5">{subtitle}</p>}
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[rgba(201,168,76,0.1)] rounded transition-colors" title="Edit">
          <Pencil size={14} />
        </button>
        <button onClick={onDelete} className="p-1.5 text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default EditableCard;
