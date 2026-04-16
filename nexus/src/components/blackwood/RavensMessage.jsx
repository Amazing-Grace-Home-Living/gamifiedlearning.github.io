import React, { useState, useCallback } from 'react';
import {
  createBoard,
  canSwap,
  applySwap,
  findMatches,
  clearMatches,
  applyGravity,
  scoreMatches,
  hasAnyMove,
  BOARD_SIZE,
  RAVEN_TILES,
} from '../../game/ravensMessageBoard.js';

const TILE_IMAGES = Object.fromEntries(
  RAVEN_TILES.map((t) => [t, `/nexus/assets/blackwood/${t}.png`])
);

const TARGET_SCORE = 300;

function resolveBoard(board) {
  let current = board;
  let totalScore = 0;
  let matches;
  while ((matches = findMatches(current)).length > 0) {
    totalScore += scoreMatches(matches);
    current = clearMatches(current, matches);
    current = applyGravity(current);
  }
  return { board: current, score: totalScore };
}

/**
 * RavensMessage — Quest 3 match-3 game using raven tiles.
 */
export default function RavensMessage({ questData, onComplete, isComplete }) {
  const [board, setBoard] = useState(() => createBoard());
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [won, setWon] = useState(isComplete);

  const handleTileClick = useCallback((r, c) => {
    if (won) return;

    if (!selected) {
      setSelected({ r, c });
      return;
    }

    if (selected.r === r && selected.c === c) {
      setSelected(null);
      return;
    }

    if (!canSwap(selected.r, selected.c, r, c)) {
      setSelected({ r, c });
      return;
    }

    const swapped = applySwap(board, selected.r, selected.c, r, c);
    const matches = findMatches(swapped);

    if (matches.length === 0) {
      setSelected(null);
      return;
    }

    const { board: resolved, score: gained } = resolveBoard(swapped);
    const newScore = score + gained;

    setBoard(hasAnyMove(resolved) ? resolved : createBoard());
    setScore(newScore);
    setSelected(null);

    if (newScore >= TARGET_SCORE && !won) {
      setWon(true);
      onComplete?.();
    }
  }, [board, score, selected, won, onComplete]);

  return (
    <div className="transition-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <img src="/nexus/assets/icons/ravens.png" alt="Ravens" style={{ width: 48, height: 48 }} />
        <div>
          <div className="card-header">{questData?.subtitle}</div>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>{questData?.label}</h2>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>SCORE</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)' }}>{score}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>/ {TARGET_SCORE}</div>
        </div>
      </div>

      <p className="lore-text" style={{ marginBottom: '1rem' }}>{questData?.lore}</p>

      <div style={{ marginBottom: '0.5rem' }}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, (score / TARGET_SCORE) * 100)}%` }}
          />
        </div>
      </div>

      {won ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--color-success)', fontWeight: 600 }}>
          ✦ The ravens&apos; message is decoded. Artifact recovered.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            gap: '4px',
            maxWidth: '320px',
            margin: '0 auto',
          }}
        >
          {board.map((row, r) =>
            row.map((tile, c) => {
              const isSelected = selected?.r === r && selected?.c === c;
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleTileClick(r, c)}
                  style={{
                    aspectRatio: '1',
                    background: isSelected ? 'rgba(200,168,75,0.3)' : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${isSelected ? 'var(--color-primary)' : 'transparent'}`,
                    borderRadius: '6px',
                    padding: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  aria-label={tile}
                  aria-pressed={isSelected}
                >
                  <img src={TILE_IMAGES[tile]} alt={tile} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
