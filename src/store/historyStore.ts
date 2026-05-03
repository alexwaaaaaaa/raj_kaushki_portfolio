import { create } from 'zustand';
import type { HistoryAction, HistoryActionType } from '@/types';
import { generateId } from '@/lib/utils';

const MAX_HISTORY = 50;

interface HistoryStore {
  past: HistoryAction[];
  future: HistoryAction[];
  canUndo: boolean;
  canRedo: boolean;
  push: (type: HistoryActionType, description: string, before: unknown, after: unknown) => void;
  undo: () => HistoryAction | null;
  redo: () => HistoryAction | null;
  clear: () => void;
}

export const useHistoryStore = create<HistoryStore>()((set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,
  push: (type, description, before, after) => {
    const action: HistoryAction = {
      id: generateId(),
      type,
      timestamp: Date.now(),
      description,
      before,
      after,
    };
    set((s) => {
      const past = [...s.past, action].slice(-MAX_HISTORY);
      return { past, future: [], canUndo: true, canRedo: false };
    });
  },
  undo: () => {
    const { past } = get();
    if (past.length === 0) return null;
    const action = past[past.length - 1];
    set((s) => ({
      past: s.past.slice(0, -1),
      future: [action, ...s.future],
      canUndo: s.past.length > 1,
      canRedo: true,
    }));
    return action;
  },
  redo: () => {
    const { future } = get();
    if (future.length === 0) return null;
    const action = future[0];
    set((s) => ({
      past: [...s.past, action],
      future: s.future.slice(1),
      canUndo: true,
      canRedo: s.future.length > 1,
    }));
    return action;
  },
  clear: () => set({ past: [], future: [], canUndo: false, canRedo: false }),
}));
