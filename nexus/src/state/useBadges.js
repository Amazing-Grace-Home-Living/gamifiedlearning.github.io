import { useState, useCallback } from 'react';
import { loadQuestState, saveQuestState } from './questEngine.js';

export const BADGE_DEFS = {
  FIRST_SEAL:    { id: 'first-seal',    label: 'First Seal',    description: 'Opened the Blackwood Ledger.' },
  PATHFINDER:    { id: 'pathfinder',    label: 'Pathfinder',    description: 'Found the Whispering Pines.' },
  RAVEN_SPEAKER: { id: 'raven-speaker', label: 'Raven Speaker', description: 'Decoded the Raven\'s Message.' },
  STAR_WALKER:   { id: 'star-walker',   label: 'Star Walker',   description: 'Performed the Third Star Ritual.' },
  KEEPER:        { id: 'keeper',        label: 'Keeper',        description: 'Mastered the Library of Still Waters.' },
};

/**
 * Custom hook for badge management.
 */
export function useBadges() {
  const [state, setState] = useState(() => loadQuestState());

  const awardBadge = useCallback((badgeId) => {
    setState((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      const next = { ...prev, badges: [...prev.badges, badgeId] };
      saveQuestState(next);
      return next;
    });
  }, []);

  const hasBadge = useCallback(
    (badgeId) => state.badges.includes(badgeId),
    [state.badges]
  );

  return {
    badges: state.badges,
    badgeDefs: BADGE_DEFS,
    awardBadge,
    hasBadge,
  };
}
