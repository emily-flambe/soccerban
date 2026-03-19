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
npm run dev        # Local dev server (wrangler)
npm run deploy     # Deploy to Cloudflare Workers
npm run test:e2e   # Run Playwright E2E tests
```

After any commit that changes files in `public/`, deploy with `npm run deploy` and push to main immediately.

## Testing

Playwright E2E tests in `tests/e2e/`. Config in `playwright.config.js`. Tests auto-start `wrangler dev` on port 8788.

Level solutions are documented as comments in `levels.js` — E2E tests replay these solutions to verify levels are solvable. When adding or modifying levels, update both the solution comments and the corresponding E2E tests.

## Architecture

ES modules in `public/js/`, loaded from `public/index.html` via `public/js/main.js`.

- **GameState** class owns the grid, movement/sliding logic, undo stack, and win detection.
- **Renderer** class draws a GameState onto a canvas.
- **InputHandler** class binds keyboard events and delegates to callbacks.
- **Levels** are a data-driven array of objects. The engine supports any rectangular grid size.
- **Constants** module defines tile types, directions, and rendering config.

Use `Glob` to find specific files — don't rely on this list being exhaustive.

## Assets

Image assets live in `public/assets/`. The Renderer loads sprites with graceful fallback — if an image fails to load, it falls back to drawn shapes (circles/squares). To add a new sprite:

1. Place the image in `public/assets/`
2. Add it to the `toLoad` map in `Renderer._loadSprites()`
3. Use it in the corresponding `_draw*` method with a fallback `else` branch

## Level Format

Levels are objects with `id`, `name`, and `grid` (array of strings).

```
# = wall    . = floor    P = player    B = ball
G = goal    O = ball on goal    Q = player on goal
```

Each level needs exactly one player and equal counts of balls and goals.

## Controls

Arrow keys / WASD — move | Z — undo | R — restart | Enter — next level (after win)

## Agents

Custom agents in `.claude/agents/` handle specialized tasks. **Use these agents — do not do their jobs yourself.**

| Trigger | Agent | What it does |
|---------|-------|-------------|
| User asks to implement a feature, fix a bug, or write game code | `implementer` | Writes code. Reads specs first. Does not test. |
| After any code change, or user asks to test | `tester` | Runs `npm run test:e2e`, writes new tests, finds bugs. |
| Before committing, or user asks for review | `reviewer` | Read-only review against critical rules checklist. Outputs APPROVE/BLOCK. |
| User asks to create, modify, or balance levels | `level-designer` | Designs puzzles, validates solvability, documents solutions. |
| After committing changes to `public/`, or user asks to deploy | `deployer` | Runs `npm run deploy`, verifies site is live. |

**Standard workflow for non-trivial changes:**
1. `implementer` writes the code
2. `tester` attacks it — goal is to find bugs
3. `implementer` fixes what tester found
4. `reviewer` checks correctness and enforces rules — BLOCK or APPROVE
5. `deployer` ships it

For small changes (config tweaks, single-line fixes, docs-only), skip the full pipeline — use your judgment.

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
