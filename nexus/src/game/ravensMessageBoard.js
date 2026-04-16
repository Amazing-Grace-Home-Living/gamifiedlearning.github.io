/**
 * ravensMessageBoard.js
 * Match-3 game engine for the Raven's Message quest.
 * Adapted from the existing Match Maker engine for the Nexus theme.
 */

export const BOARD_SIZE = 6;

const RAVEN_TILES = [
  'raven-tile-1',
  'raven-tile-2',
  'raven-tile-3',
  'raven-tile-4',
  'raven-tile-5',
];

export { RAVEN_TILES };

function randomTile() {
  return RAVEN_TILES[Math.floor(Math.random() * RAVEN_TILES.length)];
}

/**
 * Creates an initial 6×6 board with no pre-existing matches.
 */
export function createBoard() {
  const board = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    board[r] = [];
    for (let c = 0; c < BOARD_SIZE; c++) {
      let tile;
      do {
        tile = randomTile();
      } while (
        (c >= 2 && board[r][c - 1] === tile && board[r][c - 2] === tile) ||
        (r >= 2 && board[r - 1][c] === tile && board[r - 2][c] === tile)
      );
      board[r][c] = tile;
    }
  }
  return board;
}

/**
 * Returns true if two cells are adjacent (share an edge).
 */
export function canSwap(r1, c1, r2, c2) {
  const dr = Math.abs(r1 - r2);
  const dc = Math.abs(c1 - c2);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

/**
 * Returns a new board with two cells swapped.
 */
export function applySwap(board, r1, c1, r2, c2) {
  const next = board.map((row) => [...row]);
  const tmp = next[r1][c1];
  next[r1][c1] = next[r2][c2];
  next[r2][c2] = tmp;
  return next;
}

/**
 * Finds all horizontal/vertical matches of 3 or more.
 * Returns an array of match groups, each group being [{r, c}].
 */
export function findMatches(board) {
  const matched = new Set();
  const key = (r, c) => `${r},${c}`;

  for (let r = 0; r < BOARD_SIZE; r++) {
    let run = 1;
    for (let c = 1; c <= BOARD_SIZE; c++) {
      if (c < BOARD_SIZE && board[r][c] && board[r][c] === board[r][c - 1]) {
        run++;
      } else {
        if (run >= 3) {
          for (let k = c - run; k < c; k++) matched.add(key(r, k));
        }
        run = 1;
      }
    }
  }

  for (let c = 0; c < BOARD_SIZE; c++) {
    let run = 1;
    for (let r = 1; r <= BOARD_SIZE; r++) {
      if (r < BOARD_SIZE && board[r][c] && board[r][c] === board[r - 1][c]) {
        run++;
      } else {
        if (run >= 3) {
          for (let k = r - run; k < r; k++) matched.add(key(k, c));
        }
        run = 1;
      }
    }
  }

  if (matched.size === 0) return [];

  return [[...matched].map((k) => {
    const [r, c] = k.split(',').map(Number);
    return { r, c };
  })];
}

/**
 * Returns a new board with matched cells set to null.
 */
export function clearMatches(board, matches) {
  const next = board.map((row) => [...row]);
  matches.forEach((group) => {
    group.forEach(({ r, c }) => {
      next[r][c] = null;
    });
  });
  return next;
}

/**
 * Applies gravity: existing tiles fall down, new random tiles fill from top.
 */
export function applyGravity(board) {
  const next = board.map((row) => [...row]);
  for (let c = 0; c < BOARD_SIZE; c++) {
    const tiles = [];
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      if (next[r][c] !== null) tiles.push(next[r][c]);
    }
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      next[r][c] = tiles.length > 0 ? tiles.shift() : randomTile();
    }
  }
  return next;
}

/**
 * Calculates the score for a set of matches.
 * Base: 10 per tile, ×1.5 bonus for 4+, ×2 bonus for 5+.
 */
export function scoreMatches(matches) {
  let total = 0;
  matches.forEach((group) => {
    const count = group.length;
    const multiplier = count >= 5 ? 2 : count >= 4 ? 1.5 : 1;
    total += Math.round(count * 10 * multiplier);
  });
  return total;
}

/**
 * Checks whether any move exists on the board.
 */
export function hasAnyMove(board) {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (c + 1 < BOARD_SIZE) {
        const swapped = applySwap(board, r, c, r, c + 1);
        if (findMatches(swapped).length > 0) return true;
      }
      if (r + 1 < BOARD_SIZE) {
        const swapped = applySwap(board, r, c, r + 1, c);
        if (findMatches(swapped).length > 0) return true;
      }
    }
  }
  return false;
}
