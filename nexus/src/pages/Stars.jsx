import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMinistryProgress } from '../state/useMinistryProgress.js';
import { useBadges, BADGE_DEFS } from '../state/useBadges.js';
import Wisdom from '../components/stars/Wisdom.jsx';
import Discernment from '../components/stars/Discernment.jsx';
import RewardBadge from '../components/ui/RewardBadge.jsx';
import { QUEST_IDS } from '../state/questEngine.js';

export default function Stars() {
  const navigate = useNavigate();
  const { isComplete, completedCount, totalQuests } = useMinistryProgress();
  const { hasBadge } = useBadges();

  const wisdomEarned      = isComplete(QUEST_IDS.LIBRARY_STILL_WATERS);
  const discernmentEarned = isComplete(QUEST_IDS.WHISPERING_PINES);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>
      <button
        className="btn btn-ghost"
        onClick={() => navigate('/')}
        style={{ marginBottom: '1.5rem', fontSize: '0.8rem', padding: '4px 12px' }}
      >
        ← Back to Ledger
      </button>

      <h1 className="screen-title">Star Gallery</h1>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
        {completedCount} of {totalQuests} quests complete
      </p>

      {/* Stars */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <Discernment earned={discernmentEarned} />
        <Wisdom earned={wisdomEarned} />
      </div>

      <hr className="divider" />

      {/* Badges */}
      <h2 style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '1rem' }}>
        Badges
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        {Object.values(BADGE_DEFS).map((badge) => (
          <RewardBadge key={badge.id} badge={badge} earned={hasBadge(badge.id)} />
        ))}
      </div>

      {wisdomEarned && (
        <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem', border: '1px solid rgba(200,168,75,0.3)', borderRadius: '12px', background: 'rgba(200,168,75,0.04)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✦</div>
          <p style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Ministry Restored
          </p>
          <p className="lore-text" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            All seven stars aligned. The Nexus shines.
          </p>
        </div>
      )}
    </div>
  );
}
