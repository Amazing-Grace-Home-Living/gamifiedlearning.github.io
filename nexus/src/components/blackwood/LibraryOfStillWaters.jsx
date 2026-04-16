import React, { useState } from 'react';
import ClueInput from './ClueInput.jsx';

/**
 * LibraryOfStillWaters — Wisdom Star quest.
 * Final challenge: answer all wisdom clues from the ancient scrolls.
 */
export default function LibraryOfStillWaters({ questData, onComplete, isComplete }) {
  const clues = questData?.clues ?? [];
  const [solvedClues, setSolvedClues] = useState([]);

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
          src="/nexus/assets/blackwood/library-still-waters.png"
          alt="Library of Still Waters"
          style={{ width: 80, height: 80, borderRadius: '12px', border: '1px solid var(--color-border)' }}
        />
        <div>
          <div className="card-header">{questData?.subtitle}</div>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>{questData?.label}</h2>
        </div>
      </div>

      <p className="lore-text" style={{ marginBottom: '1.5rem' }}>{questData?.lore}</p>

      <div style={{ marginBottom: '1rem' }}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${clues.length > 0 ? (solvedClues.length / clues.length) * 100 : 0}%` }}
          />
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', textAlign: 'right' }}>
          {solvedClues.length} / {clues.length} scrolls read
        </div>
      </div>

      {isComplete ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '1.1rem' }}>
          ✦ The Wisdom Star shines. All seven stars aligned.
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
          ✦ All scrolls read. Wisdom attained.
        </div>
      )}
    </div>
  );
}
