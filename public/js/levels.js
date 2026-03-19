// Level definitions
// Format: # = wall, . = floor, P = player, B = ball, G = goal,
//         O = ball on goal, Q = player on goal
//
// Levels don't need to be 10x10 — the engine handles any rectangular grid.
// Each level needs exactly one player and equal numbers of balls and goals.

export const levels = [
  {
    id: 'level-1',
    name: 'First Kick',
    grid: [
      '##########',
      '#........#',
      '#........#',
      '#..B.....#',
      '#...P....#',
      '#........#',
      '#........#',
      '#......G.#',
      '#........#',
      '##########',
    ],
  },
  {
    id: 'level-2',
    name: 'Two Birds',
    grid: [
      '##########',
      '#........#',
      '#..B.....#',
      '#........#',
      '#....#...#',
      '#........#',
      '#.P..B...#',
      '#......G.#',
      '#.G......#',
      '##########',
    ],
  },
  {
    id: 'level-3',
    name: 'Corner Pocket',
    grid: [
      '##########',
      '#........#',
      '#.B......#',
      '#..###...#',
      '#........#',
      '#...P..B.#',
      '#........#',
      '#.G..#.G.#',
      '#........#',
      '##########',
    ],
  },
];
