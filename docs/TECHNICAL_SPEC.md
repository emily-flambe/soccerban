# Soccerban — Technical Spec

> Last updated: 2026-03-18

## Architecture overview

Browser-based puzzle game. No backend. Pure client-side.

### Tech decisions (TBD — pending setup agent)

The setup agent is independently choosing the tech stack. This spec describes game logic and data structures only — it is stack-agnostic.

## Game state

The entire game state is a 10x10 grid where each cell contains zero or more entities.

### Entity types

```
FLOOR   — empty passable cell (default)
WALL    — impassable, static
PLAYER  — exactly one per level
BALL    — pushable, slides until blocked
GOAL    — target cell for balls (floor underneath)
```

A cell can contain:
- Floor (implicit — every cell is floor unless it's a wall)
- Wall (exclusive — nothing else occupies this cell)
- Player (on floor or goal)
- Ball (on floor or goal)
- Goal is an overlay — a ball or player can be on a goal cell

### Level format

Levels are defined as 10x10 character grids:

```
. = floor
# = wall
P = player
B = ball
G = goal
O = ball on goal (ball starts pre-placed on a goal)
Q = player on goal (player starts on a goal)
```

Example level:

```
##########
#........#
#..B.....#
#........#
#....#...#
#........#
#.P......#
#......G.#
#........#
##########
```

## Core game loop

```
1. Wait for input (arrow key / WASD)
2. Determine target cell (one tile in input direction from player)
3. If target is wall or grid edge → do nothing
4. If target is empty floor/goal → move player there
5. If target contains a ball →
   a. Trace the ball's path in the input direction
   b. Ball slides until hitting: wall, grid edge, or another ball
   c. If the ball cannot move (immediately blocked) → do nothing
   d. Otherwise: move ball to final position, move player to ball's old position
6. Check win condition: are all goals occupied by balls?
7. If win → show completion, allow advancing to next level
8. Push state to undo stack
```

### Ball sliding logic (the key mechanic)

```
function getSlideDestination(grid, ballPos, direction):
    current = ballPos
    while true:
        next = current + direction
        if next is out of bounds → return current
        if grid[next] is WALL → return current
        if grid[next] has BALL → return current
        current = next
    return current
```

The ball moves to the **last free cell** before hitting an obstacle. If that cell is the same as its starting position (immediately blocked), the kick fails and the player doesn't move.

## Undo system

- Maintain a stack of game states (or a stack of move deltas)
- Each move pushes the pre-move state onto the stack
- Undo pops and restores
- Unlimited depth
- Restart = restore initial state (index 0)

Full-state snapshots are fine for a 10x10 grid — memory is negligible.

## Win detection

```
function checkWin(grid, goals):
    return goals.every(pos => grid[pos] contains BALL)
```

## Level progression

- Levels are stored as an ordered list
- Completing a level unlocks the next
- No level select in V1 (just sequential)

## Rendering (placeholder)

Stack-agnostic description of what to draw:

- 10x10 grid of square tiles
- Each tile: solid color or shape based on contents
- Player: small filled circle (e.g., blue)
- Ball: larger filled circle (e.g., white with black outline)
- Wall: filled dark square
- Goal: hollow square or X mark (e.g., red outline)
- Ball on goal: ball with goal indicator visible underneath
- Minimal or no animation for V1

## Design decisions (locked)

- **Goals are floor.** A ball slides through a goal — goals do not stop movement. The player also walks over goals freely. You must engineer walls/obstacles to stop the ball exactly on the goal.
- **Balls block balls.** A ball on a goal still acts as an obstacle for other sliding balls. This means a "scored" ball can be used as a wall for subsequent kicks — intentional and interesting for puzzle design.

## Open questions

- [ ] How many levels for initial release?
- [ ] Level progression UX (title screen? level complete screen?)
