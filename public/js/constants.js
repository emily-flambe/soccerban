// Tile types
export const Tile = {
  EMPTY: 0,
  WALL: 1,
  GOAL: 2,
  BALL: 3,
  BALL_ON_GOAL: 4,
  PLAYER: 5,
  PLAYER_ON_GOAL: 6,
};

// Level format character mapping
export const CHAR_TO_TILE = {
  '.': Tile.EMPTY,
  '#': Tile.WALL,
  'G': Tile.GOAL,
  'B': Tile.BALL,
  'P': Tile.PLAYER,
  'O': Tile.BALL_ON_GOAL,
  'Q': Tile.PLAYER_ON_GOAL,
};

// Directions as [row, col] deltas
export const Direction = {
  UP:    [-1, 0],
  DOWN:  [1, 0],
  LEFT:  [0, -1],
  RIGHT: [0, 1],
};

// Rendering config
export const TILE_SIZE = 96;

export const COLORS = {
  background: '#16213e',
  wall: '#2c3e50',
  goal: '#e74c3c',
  ball: '#f1c40f',
  ballOnGoal: '#e67e22',
  player: '#4ecca3',
  playerEye: '#1a1a2e',
  ballOutline: '#333',
};
