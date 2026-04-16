import React from 'react';

/**
 * Wisdom — star component representing the final virtue.
 * Displayed upon completion of the Library of Still Waters.
 */
export default function Wisdom({ earned = false }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      opacity: earned ? 1 : 0.35,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{
        width: 56, height: 56,
        borderRadius: '50%',
        background: earned ? 'radial-gradient(circle, #5a3a0a, #2a1a0a)' : 'rgba(255,255,255,0.04)',
        border: `2px solid ${earned ? 'var(--color-primary)' : 'var(--color-border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.8rem',
        boxShadow: earned ? '0 0 18px var(--color-primary-glow), 0 0 36px var(--color-primary-glow)' : 'none',
        transition: 'all 0.4s ease',
        animation: earned ? 'glow 2s ease-in-out infinite alternate' : 'none',
      }}>
        ✦
      </div>
      <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: earned ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: earned ? 700 : 400 }}>
        Wisdom
      </span>
    </div>
  );
}
