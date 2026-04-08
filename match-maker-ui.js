// match-maker-ui.js - UI rendering and interaction for Match Maker game
import {
  createInitialGrid,
  canSwap,
  applySwap,
  findMatches,
  clearMatches,
  applyGravity,
  GRID_SIZE,
} from './matchMakerState.js';
import { onLevelComplete } from './badges.js';

let grid;
let selected = null;
let score = 0;
let moves = 20;
let level = 1;
let db = null;
let user = null;

export function initMatchMaker(database, currentUser) {
  db = database;
  user = currentUser;
  grid = createInitialGrid();
  score = 0;
  moves = 20;
  level = 1;
  selected = null;

  renderGrid();
  updateUI();
}

function updateUI() {
  const scoreEl = document.getElementById('match-score');
  const movesEl = document.getElementById('match-moves');
  const levelEl = document.getElementById('match-level');

  if (scoreEl) scoreEl.textContent = score;
  if (movesEl) movesEl.textContent = moves;
  if (levelEl) levelEl.textContent = level;
}

function renderGrid() {
  const container = document.getElementById('match-grid');
  if (!container) return;

  container.innerHTML = '';

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'match-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.textContent = gemIcon(grid[r][c]);
      cell.onclick = () => onCellClick(r, c);
      container.appendChild(cell);
    }
  }
}

function gemIcon(type) {
  switch (type) {
    case 'heart': return '💖';
    case 'star': return '⭐';
    case 'cross': return '✝️';
    case 'flame': return '🔥';
    case 'drop': return '💧';
    default: return '⬛';
  }
}

function onCellClick(r, c) {
  if (moves <= 0) {
    return; // Game over
  }

  if (!selected) {
    selected = { r, c };
    highlightCell(r, c, true);
    return;
  }

  const { r: r1, c: c1 } = selected;

  // Clicked the same cell - deselect
  if (r === r1 && c === c1) {
    highlightCell(r, c, false);
    selected = null;
    return;
  }

  // Check if valid swap
  if (!canSwap(grid, r1, c1, r, c)) {
    highlightCell(r1, c1, false);
    selected = null;
    return;
  }

  // Perform the swap
  grid = applySwap(grid, r1, c1, r, c);
  resolveMatches();
  highlightCell(r1, c1, false);
  selected = null;

  // Decrease moves
  moves--;
  updateUI();

  // Check for game over
  if (moves <= 0) {
    checkLevelComplete();
  }
}

function highlightCell(r, c, on) {
  const cell = document.querySelector(`.match-cell[data-row="${r}"][data-col="${c}"]`);
  if (!cell) return;
  cell.style.outline = on ? '2px solid #00ff41' : 'none';
}

function resolveMatches() {
  let matches = findMatches(grid);

  if (matches.length === 0) {
    renderGrid();
    return;
  }

  // Calculate score
  matches.forEach(m => {
    score += m.length * 10;
  });
  updateUI();

  // Clear matches and apply gravity
  grid = clearMatches(grid, matches);
  grid = applyGravity(grid);
  renderGrid();

  // Check for chain reactions after a delay
  setTimeout(resolveMatches, 200);
}

function checkLevelComplete() {
  // Level completion threshold
  const threshold = level * 500;

  if (score >= threshold) {
    level++;
    moves = 20;
    score = 0;
    grid = createInitialGrid();

    // Notify badge system
    if (typeof onLevelComplete === 'function') {
      onLevelComplete(db, user, level - 1);
    }

    renderGrid();
    updateUI();

    alert(`Level ${level - 1} Complete! Starting Level ${level}`);
  } else {
    alert(`Game Over! Score: ${score}. Try again!`);
    resetGame();
  }
}

function resetGame() {
  score = 0;
  moves = 20;
  level = 1;
  selected = null;
  grid = createInitialGrid();
  renderGrid();
  updateUI();
}

// Export reset function for external use
export function resetMatchMaker() {
  resetGame();
}
