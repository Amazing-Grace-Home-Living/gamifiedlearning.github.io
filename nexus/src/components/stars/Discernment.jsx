import React from 'react';

/**
 * Discernment — star component representing the virtue of discernment.
 * Displayed in ministry progression after completing the Whispering Pines quest.
 */
export default function Discernment({ earned = false }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      opacity: earned ? 1 : 0.35,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{
        width: 48, height: 48,
        borderRadius: '50%',
        background: earned ? 'radial-gradient(circle, #3a1a5a, #1a0a2e)' : 'rgba(255,255,255,0.04)',
        border: `2px solid ${earned ? 'var(--color-accent)' : 'var(--color-border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem',
        boxShadow: earned ? '0 0 12px var(--color-accent-glow)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        ◈
      </div>
      <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: earned ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
        Discernment
      </span>
    </div>
  );
}
