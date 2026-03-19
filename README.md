# Soccerban

A Sokoban-style puzzle game with a soccer twist. Kick balls across the grid — they slide until they hit a wall, another ball, or the edge. Get every ball into a goal to win.

## Play

**Live**: [soccerban.emilycogsdill.com](https://soccerban.emilycogsdill.com)

**Controls**: Arrow keys / WASD to move, Z to undo, R to restart, Enter for next level.

## Development

```bash
npm install        # install dependencies (Playwright)
npm run dev        # local dev server (wrangler)
npm run deploy     # deploy to Cloudflare Workers
npm run test:e2e   # run E2E tests
```

## Stack

- Vanilla HTML/JS/CSS — ES modules, no build step, no frameworks
- HTML5 Canvas rendering with sprite support (fallback to drawn shapes)
- Playwright E2E tests
- Deployed to Cloudflare Workers (static assets)
