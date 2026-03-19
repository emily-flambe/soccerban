# Soccerban — Product Requirements Document

> Last updated: 2026-03-18

## Overview

Soccerban is a Sokoban-style puzzle game played in the browser. The player kicks soccer balls across a grid, using walls and obstacles to control where the ball stops. The goal: get every ball into a goal.

**Inspiration:** Hempuli (Baba Is You) — minimal mechanics, emergent complexity, personality through simplicity.

## Core concept

Unlike classic Sokoban where pushed blocks move one tile, kicked balls **slide until they hit something** (a wall, another ball, or the grid edge). This single rule change transforms the puzzle design space — you need obstacles to stop the ball where you want it.

## V1 scope (extremely minimal)

### Game elements

| Element | Appearance (placeholder) | Behavior |
|---------|-------------------------|----------|
| Player  | Small colored circle    | Moves one tile per input (arrow keys / WASD). Cannot walk through walls or balls at rest. |
| Ball    | Larger circle, different color | When the player moves into a ball, it is **kicked** — it slides in that direction until blocked by a wall, grid edge, or another ball. |
| Wall    | Filled square           | Static. Blocks all movement. |
| Goal    | Square outline or X mark | A target cell. Ball resting here = "scored." Goals are just floor — balls slide through them, they don't stop movement. |
| Floor   | Empty / light color     | Passable by player and ball. |

### Win condition

All balls are on goals. That's it. Pass/fail — no star ratings, no move counter, no par.

### Controls

- **Arrow keys** or **WASD** — move player one tile in cardinal direction
- **Z** or **Ctrl+Z** — undo last move (unlimited, step-by-step)
- **R** — restart level

### Grid

- Fixed 10x10 tile grid
- Levels are hand-designed (no procedural generation)

### What V1 does NOT include

- No scoring or timers (move count is displayed as a convenience but is not a win/loss criterion)
- No animations beyond basic tile transitions
- No sound
- No level editor
- No save/load (levels are small enough to restart)
- No mobile/touch support (keyboard only)
- No mechanic escalation (no special tile types, no levers, no rule changes)

## Future direction (not in scope — ideas only)

The long-term vision is Baba-Is-You-style escalating complexity. Potential future mechanics (all TBD, none designed yet):

- Balls with different behaviors (heavy balls that only slide 1 tile, ghost balls that pass through walls)
- Walls that can be toggled with levers/switches
- Pushable walls
- One-way tiles
- Defenders (static or patrolling blockers)
- Ice / friction surfaces
- Rule-changing mechanics

These are brainstorm-tier. None are committed.

## Aesthetic direction

**Now:** Pure geometric placeholders. Colored shapes on a grid. Function over form.

**Eventually:** Hempuli-style wobbly pixel art. Chunky, charming, hand-drawn feel. Personality through animation wobble and color, not detail.
