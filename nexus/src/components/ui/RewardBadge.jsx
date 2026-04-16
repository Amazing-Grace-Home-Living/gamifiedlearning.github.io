import React from 'react';

/**
 * RewardBadge — displays an awarded badge with icon and label.
 */
export default function RewardBadge({ badge, earned = false }) {
  if (!badge) return null;

  return (
    <div
      className={`reward-badge ${earned ? 'reward-badge--earned' : 'reward-badge--locked'}`}
      title={badge.description}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem',
        border: `1px solid ${earned ? 'rgba(200,168,75,0.5)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '12px',
        background: earned ? 'rgba(200,168,75,0.08)' : 'rgba(255,255,255,0.02)',
        opacity: earned ? 1 : 0.45,
        transition: 'all 0.3s ease',
        minWidth: '80px',
      }}
    >
      <img
        src="/nexus/assets/ui/badge-blackwood.png"
        alt={badge.label}
        style={{ width: 40, height: 40, filter: earned ? 'none' : 'grayscale(1)' }}
      />
      <span style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: earned ? 'var(--color-primary)' : 'var(--color-text-muted)',
        textAlign: 'center',
      }}>
        {badge.label}
      </span>
    </div>
  );
}
