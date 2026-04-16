/**
 * questEngine.js
 * Core quest state machine. Manages quest unlocking, completion, and progression.
 */

export const QUEST_IDS = {
  BLACKWOOD_LEDGER:      'blackwood-ledger',
  WHISPERING_PINES:      'whispering-pines',
  RAVENS_MESSAGE:        'ravens-message',
  THIRD_STAR_ALTAR:      'third-star-altar',
  LIBRARY_STILL_WATERS:  'library-still-waters',
};

export const QUEST_ORDER = [
  QUEST_IDS.BLACKWOOD_LEDGER,
  QUEST_IDS.WHISPERING_PINES,
  QUEST_IDS.RAVENS_MESSAGE,
  QUEST_IDS.THIRD_STAR_ALTAR,
  QUEST_IDS.LIBRARY_STILL_WATERS,
];

export const QUEST_XP = {
  [QUEST_IDS.BLACKWOOD_LEDGER]:     100,
  [QUEST_IDS.WHISPERING_PINES]:     150,
  [QUEST_IDS.RAVENS_MESSAGE]:       200,
  [QUEST_IDS.THIRD_STAR_ALTAR]:     250,
  [QUEST_IDS.LIBRARY_STILL_WATERS]: 400,
};

const STORAGE_KEY = 'nexus_quest_state';

/**
 * Returns the default (fresh) quest state.
 */
export function defaultQuestState() {
  return {
    completed: [],
    active: QUEST_IDS.BLACKWOOD_LEDGER,
    xp: 0,
    badges: [],
    ministryLevel: 0,
  };
}

/**
 * Loads quest state from localStorage, falling back to defaults.
 */
export function loadQuestState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultQuestState();
    const parsed = JSON.parse(raw);
    return { ...defaultQuestState(), ...parsed };
  } catch {
    return defaultQuestState();
  }
}

/**
 * Persists quest state to localStorage.
 */
export function saveQuestState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Marks a quest as complete, awards XP, and unlocks the next quest.
 * Returns the updated state (does not mutate input).
 */
export function completeQuest(state, questId) {
  if (state.completed.includes(questId)) return state;

  const xpGain = QUEST_XP[questId] ?? 0;
  const newCompleted = [...state.completed, questId];

  const currentIndex = QUEST_ORDER.indexOf(questId);
  const nextQuest = QUEST_ORDER[currentIndex + 1] ?? null;

  const newState = {
    ...state,
    completed: newCompleted,
    active: nextQuest,
    xp: state.xp + xpGain,
  };

  saveQuestState(newState);
  return newState;
}

/**
 * Returns whether a quest is unlocked (either active or completed).
 */
export function isQuestUnlocked(state, questId) {
  return state.active === questId || state.completed.includes(questId);
}

/**
 * Returns whether a quest has been completed.
 */
export function isQuestComplete(state, questId) {
  return state.completed.includes(questId);
}

/**
 * Resets all quest progress (for testing/debug).
 */
export function resetQuestState() {
  const fresh = defaultQuestState();
  saveQuestState(fresh);
  return fresh;
}
