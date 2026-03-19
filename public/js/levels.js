// Level definitions for sliding-ball mechanic
// Format: # = wall, . = floor, P = player, B = ball, G = goal,
//         O = ball on goal, Q = player on goal
//
// Balls slide until hitting a wall, grid edge, or another ball.
// All levels are 10x10 with wall borders.

export const levels = [
  {
    id: 'level-1',
    name: 'First Kick',
    // Tutorial: one downward kick solves it.
    // Player kicks ball down; ball slides and stops against wall, landing on goal.
    // Solution: Down (1 move, 1 kick)
    grid: [
      '##########',
      '#........#',
      '#........#',
      '#........#',
      '#...P....#',
      '#...B....#',
      '#........#',
      '#...G....#',
      '#...#....#',
      '##########',
    ],
  },
  {
    id: 'level-2',
    name: 'Bank Shot',
    // Two kicks: right into wall, then down into goal.
    // Solution: Right (kick ball right to col 5), Up, Right, Right, Down (kick ball down to goal)
    // Kick 1: ball at (3,4) slides right, stops at (3,5) against wall at (3,6)
    // Kick 2: ball at (3,5) slides down, stops at (7,5) against wall at (8,5) — on goal
    grid: [
      '##########',
      '#........#',
      '#........#',
      '#..PB.#..#',
      '#........#',
      '#........#',
      '#........#',
      '#....G...#',
      '#....#...#',
      '##########',
    ],
  },
  {
    id: 'level-3',
    name: 'Two Birds',
    // Two balls, two goals. Each ball needs one downward kick.
    // Solution: Down (kick B1 to G1), Up, Right, Right, Right, Down, Down, Down (kick B2 to G2)
    // Kick 1: B1 at (3,3) slides down to (8,3)=G1 (stopped by border)
    // Kick 2: B2 at (2,6) slides down to (8,6)=G2 (stopped by border)
    grid: [
      '##########',
      '#........#',
      '#..P..B..#',
      '#..B.....#',
      '#........#',
      '#........#',
      '#........#',
      '#........#',
      '#..G..G..#',
      '##########',
    ],
  },
  {
    id: 'level-4',
    name: 'Obstacle Course',
    // One ball, three kicks to navigate through walls.
    // Kick 1 (down): ball at (3,3) slides down, stops at (4,3) against wall at (5,3)
    // Kick 2 (right): ball at (4,3) slides right, stops at (4,4) against wall at (4,5)
    // Kick 3 (down): ball at (4,4) slides down through gap, stops at (7,4) against wall at (8,4) — on goal
    // Solution: Down (kick 1), Left, Down, Right (kick 2), Up, Right, Down (kick 3)
    grid: [
      '##########',
      '#........#',
      '#..P.....#',
      '#..B.#...#',
      '#....#...#',
      '#..#.....#',
      '#........#',
      '#...G....#',
      '#...#....#',
      '##########',
    ],
  },
  {
    id: 'level-5',
    name: 'Corner Pocket',
    // Two balls, two goals. Must score B1 first — it acts as a wall for B2.
    // Kick 1: B1 at (4,5) kicked down, slides to (8,5)=G2 (stopped by border)
    // Kick 2: B2 at (8,2) kicked right, slides along row 8, stops at (8,4) against
    //         scored B1 at (8,5) — lands on G1
    // Without B1 scored first, B2 slides past both goals to the far wall.
    // Solution: Right, Right, Down, Down (kick B1), Left, Left, Left, Left,
    //           Down, Down, Down, Down (kick B2)
    grid: [
      '##########',
      '#........#',
      '#..P.....#',
      '#........#',
      '#....B...#',
      '#........#',
      '#........#',
      '#........#',
      '#.B.GG...#',
      '##########',
    ],
  },
];
