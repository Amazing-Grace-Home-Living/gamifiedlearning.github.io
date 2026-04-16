import React, { useState, useEffect } from 'react';

const SEAL_STATES = {
  locked:  { src: '/nexus/assets/ui/seal-locked.png',  label: 'Sealed' },
  cracked: { src: '/nexus/assets/ui/seal-cracked.png', label: 'Cracking…' },
  open:    { src: '/nexus/assets/ui/seal-open.png',    label: 'Opened!' },
};

/**
 * SealAnimation — animates through locked → cracked → open states.
 * Calls onComplete when the open state finishes rendering.
 */
export default function SealAnimation({ state = 'locked', onComplete }) {
  const [displayed, setDisplayed] = useState(state);

  useEffect(() => {
    setDisplayed(state);
    if (state === 'cracked') {
      const t = setTimeout(() => setDisplayed('open'), 800);
      return () => clearTimeout(t);
    }
    if (state === 'open' && onComplete) {
      const t = setTimeout(onComplete, 1200);
      return () => clearTimeout(t);
    }
  }, [state, onComplete]);

  const info = SEAL_STATES[displayed] ?? SEAL_STATES.locked;
  const animClass = displayed === 'cracked' ? 'transition-bounce'
    : displayed === 'open' ? 'transition-fade-in' : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <img
        src={info.src}
        alt={info.label}
        className={animClass}
        style={{ width: 64, height: 64 }}
      />
      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
        {info.label}
      </span>
    </div>
  );
}
