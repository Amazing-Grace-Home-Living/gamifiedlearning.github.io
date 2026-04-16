import React from 'react';
import SealAnimation from '../ui/SealAnimation.jsx';

/**
 * LedgerCard — displays a single quest entry in the ledger with seal status.
 */
export default function LedgerCard({ quest, isComplete, isActive, isLocked, onClick }) {
  const sealState = isComplete ? 'open' : isActive ? 'cracked' : 'locked';

  return (
    <div
      className={`card ${isLocked ? '' : 'shadow-card'}`}
      onClick={isLocked ? undefined : onClick}
      style={{
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.45 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.25rem',
        transition: 'all 0.2s ease',
        border: isActive ? '1px solid rgba(123,94,167,0.5)' : undefined,
      }}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && !isLocked && onClick?.()}
      aria-label={`${quest.label} — ${isComplete ? 'complete' : isActive ? 'active' : 'locked'}`}
    >
      <img
        src={quest.icon}
        alt=""
        style={{ width: 36, height: 36, flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
          {quest.subtitle}
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: isComplete ? 'var(--color-primary)' : 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {quest.label}
        </div>
      </div>
      <SealAnimation state={sealState} />
    </div>
  );
}
