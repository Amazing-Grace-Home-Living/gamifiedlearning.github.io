// badges.js - Badge and achievement tracking system

let badgeDB = null;
let currentUser = null;

const BADGES = {
  FIRST_MATCH: {
    id: 'first_match',
    name: 'First Match',
    description: 'Complete your first match',
    icon: '🎯'
  },
  LEVEL_5: {
    id: 'level_5',
    name: 'Level 5 Master',
    description: 'Reach level 5',
    icon: '⭐'
  },
  LEVEL_10: {
    id: 'level_10',
    name: 'Level 10 Champion',
    description: 'Reach level 10',
    icon: '🏆'
  },
  HIGH_SCORER: {
    id: 'high_scorer',
    name: 'High Scorer',
    description: 'Score 1000+ points in a single game',
    icon: '💎'
  },
  COMBO_MASTER: {
    id: 'combo_master',
    name: 'Combo Master',
    description: 'Create a chain reaction',
    icon: '🔥'
  }
};

/**
 * Initialize the badge system
 */
export function initBadges(db, user) {
  badgeDB = db;
  currentUser = user;

  // Initialize user badges if not exists
  if (!badgeDB[user]) {
    badgeDB[user] = {
      badges: [],
      stats: {
        totalGames: 0,
        highestLevel: 0,
        highestScore: 0,
        totalMatches: 0
      }
    };
  }
}

/**
 * Award a badge to the user
 */
export function awardBadge(badgeId) {
  if (!badgeDB || !currentUser) return;

  const userData = badgeDB[currentUser];
  if (!userData.badges.includes(badgeId)) {
    userData.badges.push(badgeId);

    const badge = Object.values(BADGES).find(b => b.id === badgeId);
    if (badge) {
      console.log(`🎉 Badge Unlocked: ${badge.name} ${badge.icon}`);
      showBadgeNotification(badge);
    }
  }
}

/**
 * Show badge notification
 */
function showBadgeNotification(badge) {
  // This can be enhanced with a proper UI notification
  if (typeof alert !== 'undefined') {
    setTimeout(() => {
      alert(`🎉 Badge Unlocked!\n${badge.icon} ${badge.name}\n${badge.description}`);
    }, 100);
  }
}

/**
 * Called when a level is completed
 */
export function onLevelComplete(db, user, level) {
  if (db && user) {
    initBadges(db, user);
  }

  if (!badgeDB || !currentUser) return;

  const userData = badgeDB[currentUser];

  // Update stats
  userData.stats.totalGames++;
  if (level > userData.stats.highestLevel) {
    userData.stats.highestLevel = level;
  }

  // Award level-based badges
  if (level >= 5 && !userData.badges.includes(BADGES.LEVEL_5.id)) {
    awardBadge(BADGES.LEVEL_5.id);
  }

  if (level >= 10 && !userData.badges.includes(BADGES.LEVEL_10.id)) {
    awardBadge(BADGES.LEVEL_10.id);
  }
}

/**
 * Update score for badge tracking
 */
export function updateScore(score) {
  if (!badgeDB || !currentUser) return;

  const userData = badgeDB[currentUser];

  if (score > userData.stats.highestScore) {
    userData.stats.highestScore = score;
  }

  if (score >= 1000 && !userData.badges.includes(BADGES.HIGH_SCORER.id)) {
    awardBadge(BADGES.HIGH_SCORER.id);
  }
}

/**
 * Record a match
 */
export function recordMatch() {
  if (!badgeDB || !currentUser) return;

  const userData = badgeDB[currentUser];
  userData.stats.totalMatches++;

  if (userData.stats.totalMatches === 1) {
    awardBadge(BADGES.FIRST_MATCH.id);
  }
}

/**
 * Get user badges
 */
export function getUserBadges() {
  if (!badgeDB || !currentUser) return [];
  return badgeDB[currentUser].badges || [];
}

/**
 * Get user stats
 */
export function getUserStats() {
  if (!badgeDB || !currentUser) return null;
  return badgeDB[currentUser].stats || null;
}

/**
 * Get all available badges
 */
export function getAllBadges() {
  return BADGES;
}
