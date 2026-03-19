# Soccerban

Sokoban-style browser puzzle game with a soccer theme. **Live at [soccerban.emilycogsdill.com](https://soccerban.emilycogsdill.com).**

## Critical Rules

These are non-negotiable design decisions. Do not change them without explicit user approval.

- **Balls SLIDE until blocked.** When kicked, a ball moves in that direction until hitting a wall, another ball, or the grid edge. This is NOT classic Sokoban push-one-tile. This is the core mechanic.
- **Goals are floor.** Balls slide through/over goals. Goals do not stop movement. You must use walls or other balls to stop a ball on a goal.
- **Balls block balls.** A scored ball (on a goal) still acts as an obstacle. This is intentional and important for puzzle design.
- **No build step.** Vanilla JS with ES modules (`type="module"`). No bundlers, transpilers, or frameworks.
- **No backend.** Pure client-side. Deployed as static assets on Cloudflare Workers.

## Development

```bash
npm run dev      # Local dev server (wrangler)
npm run deploy   # Deploy to Cloudflare Workers
```

After any commit that changes files in `public/`, deploy with `npm run deploy` and push to main immediately.

## Architecture

ES modules in `public/js/`, loaded from `public/index.html` via `public/js/main.js`.

- **GameState** class owns the grid, movement/sliding logic, undo stack, and win detection.
- **Renderer** class draws a GameState onto a canvas.
- **InputHandler** class binds keyboard events and delegates to callbacks.
- **Levels** are a data-driven array of objects. The engine supports any rectangular grid size.
- **Constants** module defines tile types, directions, and rendering config.

Use `Glob` to find specific files — don't rely on this list being exhaustive.

## Level Format

Levels are objects with `id`, `name`, and `grid` (array of strings).

```
# = wall    . = floor    P = player    B = ball
G = goal    O = ball on goal    Q = player on goal
```

Each level needs exactly one player and equal counts of balls and goals.

## Controls

Arrow keys / WASD — move | Z — undo | R — restart | Enter — next level (after win)

## Working With Project Context

This project uses a layered context system. Follow these rules to keep it healthy.

### Before starting work

1. **Read CLAUDE.md** (this file). The Critical Rules section is non-negotiable.
2. **Check `docs/DECISIONS.md`** before proposing architectural changes — the decision may already be made.
3. **Check `docs/PRD.md` and `docs/TECHNICAL_SPEC.md`** when working on game mechanics or data structures — these are authoritative for design intent.

### After completing work

1. **Update `docs/DECISIONS.md`** if you made any architectural or design decision (new module, new mechanic, changed data format, etc.). Include date, decision, and rationale.
2. **Update project memory** if the project state changed meaningfully (new features, changed architecture, new capabilities). The main conversation agent manages memory — subagents do not have access to it.
3. **Update this file (CLAUDE.md)** if you changed something that would cause another agent to break things — new critical rules, changed architecture, new commands.
4. **Update `docs/PRD.md` or `docs/TECHNICAL_SPEC.md`** if your changes affect game design or technical specifications. Keep these in sync with what the code actually does.

### What goes where

| Information | Where it lives |
|-------------|---------------|
| Rules that must not be violated | CLAUDE.md — Critical Rules |
| Architecture overview | CLAUDE.md — Architecture |
| Why a decision was made | `docs/DECISIONS.md` |
| Game design intent and scope | `docs/PRD.md` |
| Data structures and algorithms | `docs/TECHNICAL_SPEC.md` |
| Current project state and progress | Project memory (main agent only) |
| Deployment and infrastructure details | Project memory (main agent only) |

### Design References

- `docs/PRD.md` — product requirements, game design decisions, aesthetic direction
- `docs/TECHNICAL_SPEC.md` — data structures, algorithms, sliding logic specification
- `docs/DECISIONS.md` — log of architectural and design decisions with rationale
