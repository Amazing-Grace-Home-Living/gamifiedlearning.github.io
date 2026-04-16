import { useState, useCallback } from 'react';
import {
  loadQuestState,
  completeQuest,
  isQuestUnlocked,
  isQuestComplete,
  QUEST_ORDER,
} from './questEngine.js';

export const MINISTRY_LEVELS = [
  { level: 0, title: 'Seeker',       minCompleted: 0 },
  { level: 1, title: 'Initiate',     minCompleted: 1 },
  { level: 2, title: 'Scholar',      minCompleted: 2 },
  { level: 3, title: 'Adept',        minCompleted: 3 },
  { level: 4, title: 'Guardian',     minCompleted: 4 },
  { level: 5, title: 'Star Keeper',  minCompleted: 5 },
];

/**
 * Derives ministry level from completed quest count.
 */
function calcMinistryLevel(completed) {
  for (let i = MINISTRY_LEVELS.length - 1; i >= 0; i--) {
    if (completed.length >= MINISTRY_LEVELS[i].minCompleted) {
      return MINISTRY_LEVELS[i];
    }
  }
  return MINISTRY_LEVELS[0];
}

/**
 * Custom hook for tracking overall ministry progression.
 */
export function useMinistryProgress() {
  const [state, setState] = useState(() => loadQuestState());

  const advance = useCallback((questId) => {
    setState((prev) => {
      const next = completeQuest(prev, questId);
      return next;
    });
  }, []);

  const ministry = calcMinistryLevel(state.completed);
  const totalQuests = QUEST_ORDER.length;
  const completedCount = state.completed.length;
  const progressPercent = Math.round((completedCount / totalQuests) * 100);

  return {
    questState: state,
    ministry,
    completedCount,
    totalQuests,
    progressPercent,
    active: state.active,
    isUnlocked: (id) => isQuestUnlocked(state, id),
    isComplete: (id) => isQuestComplete(state, id),
    advance,
    setState,
  };
}
