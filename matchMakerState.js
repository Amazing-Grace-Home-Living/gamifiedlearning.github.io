// matchMakerState.js - Game state management for Match Maker
export const GRID_SIZE = 7;

const GEM_TYPES = ['heart', 'star', 'cross', 'flame', 'drop'];

/**
 * Create a random initial grid with no initial matches
 */
export function createInitialGrid() {
  let grid = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      grid[r][c] = randomGemType();
    }
  }

  // Remove any initial matches
  let matches = findMatches(grid);
  while (matches.length > 0) {
    matches.forEach(match => {
      match.forEach(pos => {
        grid[pos.r][pos.c] = randomGemType();
      });
    });
    matches = findMatches(grid);
  }

  return grid;
}

function randomGemType() {
  return GEM_TYPES[Math.floor(Math.random() * GEM_TYPES.length)];
}

/**
 * Check if two cells are adjacent and can be swapped
 */
export function canSwap(grid, r1, c1, r2, c2) {
  // Must be adjacent (horizontal or vertical)
  const rowDiff = Math.abs(r1 - r2);
  const colDiff = Math.abs(c1 - c2);

  if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
    // Simulate the swap and check if it creates matches
    const testGrid = applySwap(grid, r1, c1, r2, c2);
    const matches = findMatches(testGrid);
    return matches.length > 0;
  }

  return false;
}

/**
 * Swap two cells in the grid
 */
export function applySwap(grid, r1, c1, r2, c2) {
  const newGrid = grid.map(row => [...row]);
  const temp = newGrid[r1][c1];
  newGrid[r1][c1] = newGrid[r2][c2];
  newGrid[r2][c2] = temp;
  return newGrid;
}

/**
 * Find all matches in the grid (3 or more in a row)
 */
export function findMatches(grid) {
  const matches = [];
  const matched = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));

  // Check horizontal matches
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 2; c++) {
      const type = grid[r][c];
      if (type === null) continue;

      let length = 1;
      while (c + length < GRID_SIZE && grid[r][c + length] === type) {
        length++;
      }

      if (length >= 3) {
        const match = [];
        for (let i = 0; i < length; i++) {
          matched[r][c + i] = true;
          match.push({ r, c: c + i });
        }
        matches.push(match);
      }
    }
  }

  // Check vertical matches
  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE - 2; r++) {
      const type = grid[r][c];
      if (type === null) continue;

      let length = 1;
      while (r + length < GRID_SIZE && grid[r + length][c] === type) {
        length++;
      }

      if (length >= 3) {
        const match = [];
        for (let i = 0; i < length; i++) {
          matched[r + i][c] = true;
          match.push({ r: r + i, c });
        }
        matches.push(match);
      }
    }
  }

  return matches;
}

/**
 * Clear matched cells from the grid
 */
export function clearMatches(grid, matches) {
  const newGrid = grid.map(row => [...row]);

  matches.forEach(match => {
    match.forEach(pos => {
      newGrid[pos.r][pos.c] = null;
    });
  });

  return newGrid;
}

/**
 * Apply gravity to fill empty cells
 */
export function applyGravity(grid) {
  const newGrid = grid.map(row => [...row]);

  // For each column, drop gems down
  for (let c = 0; c < GRID_SIZE; c++) {
    // Collect non-null gems from bottom to top
    const gems = [];
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      if (newGrid[r][c] !== null) {
        gems.push(newGrid[r][c]);
      }
    }

    // Fill from bottom with collected gems
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      if (gems.length > 0) {
        newGrid[r][c] = gems.shift();
      } else {
        // Fill empty spaces with new random gems
        newGrid[r][c] = randomGemType();
      }
    }
  }

  return newGrid;
}
