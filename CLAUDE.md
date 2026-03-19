# Soccerban - Development Guide

## Project Overview

Sokoban-style browser puzzle game with a soccer theme. Deployed as static assets on Cloudflare Workers.

## Architecture

- **No build step.** All source files are served directly from `public/`.
- **No frameworks.** Vanilla HTML, CSS, and JavaScript.
- **Rendering**: HTML5 Canvas (`public/game.js`)
- **Deployment**: Cloudflare Workers static assets via `wrangler deploy`
- **Custom domain**: `soccerban.emilycogsdill.com`

## File Structure

- `wrangler.toml` — Cloudflare Workers config (static assets, custom domain)
- `public/index.html` — Entry point
- `public/game.js` — Game engine (grid state, movement, rendering, input)
- `public/style.css` — Styling

## Commands

```bash
npm run dev      # Local dev server with hot reload
npm run deploy   # Deploy to Cloudflare Workers
```

## Game Design

- Grid-based Sokoban mechanics: player pushes balls (boxes) onto goals
- Tile types: EMPTY, WALL, GOAL, BALL, BALL_ON_GOAL, PLAYER, PLAYER_ON_GOAL
- Levels defined as string arrays — parsed at init
- Win condition: no BALL tiles remaining (all converted to BALL_ON_GOAL)

## Conventions

- Keep it simple. No build tools, bundlers, or transpilers unless complexity demands it.
- All game state lives in `grid[][]` — a 2D array of tile type constants.
- Levels are string-encoded: W=wall, .=empty, G=goal, B=ball, P=player, *=ball-on-goal, +=player-on-goal
