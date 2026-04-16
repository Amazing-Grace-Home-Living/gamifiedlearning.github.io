import { useState, useCallback } from 'react';
import { loadQuestState, saveQuestState } from './questEngine.js';

const XP_PER_LEVEL = 200;

/**
 * Custom hook for XP management.
 * Reads/writes the shared quest state in localStorage.
 */
export function useXP() {
  const [state, setState] = useState(() => loadQuestState());

  const addXP = useCallback((amount) => {
    setState((prev) => {
      const next = { ...prev, xp: prev.xp + amount };
      saveQuestState(next);
      return next;
    });
  }, []);

  const level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = state.xp % XP_PER_LEVEL;
  const progress = xpIntoLevel / XP_PER_LEVEL;

  return {
    xp: state.xp,
    level,
    xpIntoLevel,
    xpPerLevel: XP_PER_LEVEL,
    progress,
    addXP,
  };
}
