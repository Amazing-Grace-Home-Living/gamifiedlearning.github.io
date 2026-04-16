import React, { useState } from 'react';
import HintBand from '../ui/HintBand.jsx';

/**
 * ClueInput — text input for answering a quest clue.
 * Calls onCorrect() when the normalised answer matches.
 */
export default function ClueInput({ clue, onCorrect, disabled = false }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle'); // idle | correct | wrong

  const normalise = (s) => s.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || status === 'correct') return;

    if (normalise(value) === normalise(clue.answer)) {
      setStatus('correct');
      onCorrect?.();
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 1200);
    }
  };

  const borderColor = status === 'correct' ? 'var(--color-success)'
    : status === 'wrong' ? 'var(--color-danger)'
    : undefined;

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>{clue.prompt}</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          className="input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your answer…"
          disabled={disabled || status === 'correct'}
          aria-label={clue.prompt}
          style={{ borderColor }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={disabled || status === 'correct' || value.trim() === ''}
          style={{ flexShrink: 0 }}
        >
          {status === 'correct' ? '✓' : 'Submit'}
        </button>
      </form>
      {status === 'wrong' && (
        <p style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          That doesn&apos;t seem right — try again.
        </p>
      )}
      {status !== 'correct' && <HintBand hints={clue.hints ?? []} />}
    </div>
  );
}
