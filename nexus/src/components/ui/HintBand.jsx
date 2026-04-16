import React, { useState } from 'react';

/**
 * HintBand — collapsible hint ribbon displayed below clue inputs.
 */
export default function HintBand({ hints = [] }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (hints.length === 0) return null;

  const handleReveal = () => {
    setRevealed(true);
    setIndex(0);
  };

  const handleNext = () => {
    setIndex((i) => Math.min(i + 1, hints.length - 1));
  };

  return (
    <div style={{
      background: 'rgba(123,94,167,0.12)',
      border: '1px solid rgba(123,94,167,0.3)',
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      marginTop: '0.75rem',
    }}>
      {!revealed ? (
        <button
          className="btn btn-ghost"
          onClick={handleReveal}
          style={{ fontSize: '0.8rem', padding: '4px 12px' }}
        >
          🔍 Show Hint
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ flex: 1, color: 'var(--color-text)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            {hints[index]}
          </span>
          {index < hints.length - 1 && (
            <button
              className="btn btn-ghost"
              onClick={handleNext}
              style={{ fontSize: '0.75rem', padding: '3px 10px', whiteSpace: 'nowrap' }}
            >
              Next hint
            </button>
          )}
        </div>
      )}
    </div>
  );
}
