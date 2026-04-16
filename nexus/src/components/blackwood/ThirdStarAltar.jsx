import React, { useState } from 'react';

/**
 * ThirdStarAltar — Quest 4 ritual interface.
 * Players must press symbols in the correct sequence.
 */
export default function ThirdStarAltar({ questData, onComplete, isComplete }) {
  const correctSequence = questData?.sequence ?? [];
  const symbols = questData?.symbols ?? [];

  const [entered, setEntered] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | wrong | complete

  const handleSymbol = (symbolId) => {
    if (isComplete || status === 'complete') return;

    const next = [...entered, symbolId];
    setEntered(next);

    const expected = correctSequence[next.length - 1];
    if (symbolId !== expected) {
      setStatus('wrong');
      setTimeout(() => {
        setEntered([]);
        setStatus('idle');
      }, 1000);
      return;
    }

    if (next.length === correctSequence.length) {
      setStatus('complete');
      onComplete?.();
    }
  };

  const progressWidth = correctSequence.length > 0
    ? `${(entered.length / correctSequence.length) * 100}%`
    : '0%';

  return (
    <div className="transition-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <img src="/nexus/assets/blackwood/third-star-altar.png" alt="Third Star Altar" style={{ width: 80, height: 80, borderRadius: '12px', border: '1px solid var(--color-border)' }} />
        <div>
          <div className="card-header">{questData?.subtitle}</div>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>{questData?.label}</h2>
        </div>
      </div>

      <p className="lore-text" style={{ marginBottom: '1.5rem' }}>{questData?.lore}</p>

      {/* Entry display */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
        {correctSequence.map((_, i) => {
          const filled = entered[i];
          const sym = filled ? symbols.find((s) => s.id === filled) : null;
          return (
            <div key={i} style={{
              width: 48, height: 48,
              border: `2px solid ${status === 'wrong' ? 'var(--color-danger)' : filled ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
              background: filled ? 'rgba(200,168,75,0.1)' : 'rgba(255,255,255,0.02)',
              transition: 'all 0.2s ease',
            }}>
              {sym ? sym.label : ''}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
        <div className="progress-fill" style={{ width: progressWidth, background: status === 'wrong' ? 'var(--color-danger)' : undefined }} />
      </div>

      {isComplete || status === 'complete' ? (
        <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-success)', fontWeight: 600 }}>
          ✦ The altar awakens. Third star revealed.
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {symbols.map((sym) => (
            <button
              key={sym.id}
              onClick={() => handleSymbol(sym.id)}
              disabled={status === 'wrong'}
              className="btn btn-ghost"
              style={{ width: 72, height: 72, fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}
              aria-label={sym.label}
            >
              {sym.label}
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                {sym.id}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
