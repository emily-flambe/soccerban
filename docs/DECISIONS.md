# Decision Log

Architectural and design decisions with rationale. Newest first.

## 2026-03-18: Modular ES modules, no build step

**Decision**: Structure as ES modules (`import`/`export`) served directly by the browser. No bundler.

**Rationale**: Game is small, vanilla JS. ES modules give us clean separation without build complexity. Can always add a bundler later if needed.

**Modules**: constants, levels, game (GameState), renderer, input, main.

## 2026-03-18: Sliding ball mechanic (not push-one-tile)

**Decision**: Kicked balls slide until hitting a wall, another ball, or the grid edge.

**Rationale**: This is the core design from the PRD. It transforms the puzzle space — you need obstacles to stop balls where you want them, unlike classic Sokoban where push = one tile.

## 2026-03-18: Goals are floor, balls block balls

**Decision**: Goals don't stop ball movement. Scored balls still act as obstacles.

**Rationale**: These two rules create emergent puzzle complexity. You must engineer wall/ball configurations to land balls on goals. Scored balls become tools for subsequent kicks.

## 2026-03-18: Cloudflare Workers static assets deployment

**Decision**: Deploy to Cloudflare Workers using `[assets]` config (not Workers Sites, not Pages).

**Rationale**: Workers static assets is the current recommended approach. No KV, no Worker script needed for static-only. Custom domain at soccerban.emilycogsdill.com.

## 2026-03-18: Level format — string arrays

**Decision**: Levels defined as `{ id, name, grid: string[] }` using character encoding (`#.PBGOQ`).

**Rationale**: Human-readable, easy to author and diff. Variable grid sizes supported. Same format used in the technical spec.
