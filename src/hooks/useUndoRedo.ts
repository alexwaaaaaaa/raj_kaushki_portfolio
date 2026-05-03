'use client';

import { useCallback } from 'react';
import { useHistoryStore } from '@/store/historyStore';
import type { HistoryActionType } from '@/types';

interface UseUndoRedoReturn {
  push: (type: HistoryActionType, description: string, before: unknown, after: unknown) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function useUndoRedo(
  onUndo?: (action: ReturnType<typeof useHistoryStore.getState>['past'][number]) => void,
  onRedo?: (action: ReturnType<typeof useHistoryStore.getState>['past'][number]) => void
): UseUndoRedoReturn {
  const { push, canUndo, canRedo } = useHistoryStore();
  const undoFn = useHistoryStore((s) => s.undo);
  const redoFn = useHistoryStore((s) => s.redo);

  const undo = useCallback(() => {
    const action = undoFn();
    if (action && onUndo) onUndo(action);
  }, [undoFn, onUndo]);

  const redo = useCallback(() => {
    const action = redoFn();
    if (action && onRedo) onRedo(action);
  }, [redoFn, onRedo]);

  return { push, undo, redo, canUndo, canRedo };
}
