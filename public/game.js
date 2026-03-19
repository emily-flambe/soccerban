// Tile types
const EMPTY = 0;
const WALL = 1;
const GOAL = 2;
const BALL = 3;
const BALL_ON_GOAL = 4;
const PLAYER = 5;
const PLAYER_ON_GOAL = 6;

// Tile size in pixels
const TILE = 48;

// Colors
const COLORS = {
  [EMPTY]: '#16213e',
  [WALL]: '#2c3e50',
  [GOAL]: '#e74c3c',
  [BALL]: '#f1c40f',
  [BALL_ON_GOAL]: '#e67e22',
  [PLAYER]: '#4ecca3',
  [PLAYER_ON_GOAL]: '#4ecca3',
};

// Level: a simple Sokoban puzzle
// W=wall, .=empty, G=goal, B=ball, P=player, *=ball on goal, +=player on goal
const LEVEL_STRING = [
  'WWWWWWWWWW',
  'W........W',
  'W........W',
  'W..B.....W',
  'W...P..G.W',
  'W........W',
  'W....B...W',
  'W......G.W',
  'W........W',
  'WWWWWWWWWW',
];

function parseLevel(lines) {
  const charMap = {
    'W': WALL,
    '.': EMPTY,
    'G': GOAL,
    'B': BALL,
    'P': PLAYER,
    '*': BALL_ON_GOAL,
    '+': PLAYER_ON_GOAL,
  };
  return lines.map(row => [...row].map(ch => charMap[ch] ?? EMPTY));
}

let grid;
let playerRow, playerCol;

function initLevel() {
  grid = parseLevel(LEVEL_STRING);
  // Find player
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === PLAYER || grid[r][c] === PLAYER_ON_GOAL) {
        playerRow = r;
        playerCol = c;
      }
    }
  }
}

function isWalkable(tile) {
  return tile === EMPTY || tile === GOAL;
}

function isBall(tile) {
  return tile === BALL || tile === BALL_ON_GOAL;
}

function move(dr, dc) {
  const nr = playerRow + dr;
  const nc = playerCol + dc;
  if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return;

  const target = grid[nr][nc];

  if (target === WALL) return;

  if (isBall(target)) {
    // Try to push ball
    const br = nr + dr;
    const bc = nc + dc;
    if (br < 0 || br >= grid.length || bc < 0 || bc >= grid[0].length) return;
    const behind = grid[br][bc];
    if (!isWalkable(behind)) return;

    // Move ball
    grid[br][bc] = behind === GOAL ? BALL_ON_GOAL : BALL;
    grid[nr][nc] = target === BALL_ON_GOAL ? GOAL : EMPTY;
  } else if (!isWalkable(target)) {
    return;
  }

  // Move player
  const currentTile = grid[playerRow][playerCol];
  grid[playerRow][playerCol] = (currentTile === PLAYER_ON_GOAL) ? GOAL : EMPTY;
  const destTile = grid[nr][nc];
  grid[nr][nc] = (destTile === GOAL) ? PLAYER_ON_GOAL : PLAYER;
  playerRow = nr;
  playerCol = nc;

  render();
  checkWin();
}

function checkWin() {
  // Win when no BALL tiles remain (all balls are on goals)
  for (const row of grid) {
    for (const tile of row) {
      if (tile === BALL) return;
    }
  }
  document.getElementById('status').textContent = 'You win!';
}

// Rendering
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function render() {
  const rows = grid.length;
  const cols = grid[0].length;
  canvas.width = cols * TILE;
  canvas.height = rows * TILE;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = grid[r][c];
      const x = c * TILE;
      const y = r * TILE;

      // Background
      ctx.fillStyle = COLORS[EMPTY];
      ctx.fillRect(x, y, TILE, TILE);

      // Draw goal marker underneath
      if (tile === GOAL || tile === BALL_ON_GOAL || tile === PLAYER_ON_GOAL) {
        ctx.fillStyle = COLORS[GOAL];
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, TILE / 6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (tile === WALL) {
        ctx.fillStyle = COLORS[WALL];
        ctx.fillRect(x, y, TILE, TILE);
      } else if (tile === BALL || tile === BALL_ON_GOAL) {
        // Soccer ball
        ctx.fillStyle = COLORS[tile];
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, TILE / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (tile === PLAYER || tile === PLAYER_ON_GOAL) {
        // Player
        ctx.fillStyle = COLORS[PLAYER];
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, TILE / 3, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(x + TILE / 2 - 5, y + TILE / 2 - 4, 3, 0, Math.PI * 2);
        ctx.arc(x + TILE / 2 + 5, y + TILE / 2 - 4, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// Input
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'arrowup' || key === 'w') move(-1, 0);
  else if (key === 'arrowdown' || key === 's') move(1, 0);
  else if (key === 'arrowleft' || key === 'a') move(0, -1);
  else if (key === 'arrowright' || key === 'd') move(0, 1);
  else if (key === 'r') {
    initLevel();
    document.getElementById('status').textContent = 'Push all balls into the goals!';
    render();
  }
});

// Start
initLevel();
render();
