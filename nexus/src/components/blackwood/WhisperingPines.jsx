import React, { useState } from 'react';
import ClueInput from './ClueInput.jsx';

/**
 * WhisperingPines — Quest 2 location.
 * Players find hidden echoes by answering clues about the pine grove.
 */
export default function WhisperingPines({ questData, onComplete, isComplete }) {
  const [solvedClues, setSolvedClues] = useState([]);

  const clues = questData?.clues ?? [];
  const allSolved = clues.length > 0 && solvedClues.length === clues.length;

  const handleCorrect = (clueId) => {
    setSolvedClues((prev) => {
      if (prev.includes(clueId)) return prev;
      const next = [...prev, clueId];
      if (next.length === clues.length && !isComplete) {
        onComplete?.();
      }
      return next;
    });
  };

  return (
    <div className="transition-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <img
          src="/nexus/assets/blackwood/whispering-pines.png"
          alt="Whispering Pines"
          style={{ width: 80, height: 80, borderRadius: '12px', border: '1px solid var(--color-border)' }}
        />
        <div>
          <div className="card-header">{questData?.subtitle}</div>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>{questData?.label}</h2>
        </div>
      </div>

      <p className="lore-text" style={{ marginBottom: '1.5rem' }}>{questData?.lore}</p>

      {isComplete ? (
        <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-success)' }}>
          ✦ The pines have whispered their secret. Artifact recovered.
        </div>
      ) : (
        clues.map((clue) => (
          <ClueInput
            key={clue.id}
            clue={clue}
            onCorrect={() => handleCorrect(clue.id)}
            disabled={solvedClues.includes(clue.id) || isComplete}
          />
        ))
      )}

      {allSolved && !isComplete && (
        <div style={{ marginTop: '1rem', color: 'var(--color-success)', textAlign: 'center', fontWeight: 600 }}>
          ✦ Echo found! Quest complete.
        </div>
      )}
    </div>
  );
}
