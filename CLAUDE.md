# Soccerban - Development Guide

## Project Overview

Sokoban-style browser puzzle game with a soccer theme. Kicked balls **slide until they hit an obstacle** (wall, another ball, or grid edge) — this is the core mechanic that distinguishes it from classic Sokoban. Deployed as static assets on Cloudflare Workers.

## Architecture

- **No build step.** ES modules served directly from `public/`.
- **No frameworks.** Vanilla HTML, CSS, and JavaScript.
- **Rendering**: HTML5 Canvas
- **Deployment**: Cloudflare Workers static assets via `wrangler deploy`
- **Custom domain**: `soccerban.emilycogsdill.com`

## File Structure

- `wrangler.toml` — Cloudflare Workers config
- `public/index.html` — Entry point
- `public/style.css` — Styling
- `public/js/constants.js` — Tile types, directions, colors, config
- `public/js/levels.js` — Level definitions (data-driven)
- `public/js/game.js` — GameState class (grid, sliding movement, undo, win detection)
- `public/js/renderer.js` — Renderer class (canvas drawing)
- `public/js/input.js` — InputHandler class (keyboard events)
- `public/js/main.js` — Entry point, level progression wiring

## Commands

```bash
npm run dev      # Local dev server with hot reload
npm run deploy   # Deploy to Cloudflare Workers
```

## Game Mechanics

- Player moves one tile per input (arrow keys / WASD)
- Kicking a ball makes it **slide** in that direction until blocked
- Goals are floor — balls slide through/over goals, goals don't stop movement
- Balls block other balls (a scored ball acts as a wall for subsequent kicks)
- Win condition: all balls resting on goals (no BALL tiles remain, only BALL_ON_GOAL)

## Level Format

Levels are defined in `public/js/levels.js` as objects with `id`, `name`, and `grid` (array of strings).

```
# = wall    . = floor    P = player    B = ball
G = goal    O = ball on goal    Q = player on goal
```

Levels can be any rectangular size (not limited to 10x10).

## Controls

- Arrow keys / WASD — move player
- Z / Ctrl+Z — undo
- R — restart level
- Enter — next level (after winning)

## Design Docs

- `docs/PRD.md` — Product requirements (authoritative for game design decisions)
- `docs/TECHNICAL_SPEC.md` — Technical spec (authoritative for data structures and algorithms)
