import { Tile, TILE_SIZE, COLORS } from './constants.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = TILE_SIZE;
    this.sprites = {};
    this._loadSprites();
  }

  _loadSprites() {
    const toLoad = {
      player: 'assets/spherical-cat.png',
      ball: 'assets/soccer-ball.png',
    };
    this._spritesReady = Promise.all(
      Object.entries(toLoad).map(([key, src]) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { this.sprites[key] = img; resolve(); };
          img.onerror = () => resolve(); // fall back to drawn shapes
          img.src = src;
        })
      )
    );
  }

  async waitForSprites() {
    await this._spritesReady;
  }

  render(gameState) {
    const { grid, rows, cols } = gameState;
    this.canvas.width = cols * this.tileSize;
    this.canvas.height = rows * this.tileSize;
    const ctx = this.ctx;
    const t = this.tileSize;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tile = grid[r][c];
        const x = c * t;
        const y = r * t;

        // Background
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(x, y, t, t);

        // Goal marker (drawn underneath ball/player)
        if (tile === Tile.GOAL || tile === Tile.BALL_ON_GOAL || tile === Tile.PLAYER_ON_GOAL) {
          ctx.fillStyle = COLORS.goal;
          ctx.beginPath();
          ctx.arc(x + t / 2, y + t / 2, t / 6, 0, Math.PI * 2);
          ctx.fill();
        }

        if (tile === Tile.WALL) {
          this._drawWall(ctx, x, y, t);
        } else if (tile === Tile.BALL || tile === Tile.BALL_ON_GOAL) {
          this._drawBall(ctx, x, y, t, tile);
        } else if (tile === Tile.PLAYER || tile === Tile.PLAYER_ON_GOAL) {
          this._drawPlayer(ctx, x, y, t);
        }
      }
    }
  }

  _drawWall(ctx, x, y, t) {
    ctx.fillStyle = COLORS.wall;
    ctx.fillRect(x, y, t, t);
  }

  _drawBall(ctx, x, y, t, tile) {
    if (this.sprites.ball) {
      const padding = t * 0.1;
      ctx.drawImage(this.sprites.ball, x + padding, y + padding, t - padding * 2, t - padding * 2);
      // Tint orange when on goal
      if (tile === Tile.BALL_ON_GOAL) {
        ctx.fillStyle = 'rgba(230, 126, 34, 0.35)';
        ctx.beginPath();
        ctx.arc(x + t / 2, y + t / 2, t / 2 - padding, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = tile === Tile.BALL_ON_GOAL ? COLORS.ballOnGoal : COLORS.ball;
      ctx.beginPath();
      ctx.arc(x + t / 2, y + t / 2, t / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = COLORS.ballOutline;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  _drawPlayer(ctx, x, y, t) {
    if (this.sprites.player) {
      const padding = t * 0.05;
      ctx.drawImage(this.sprites.player, x + padding, y + padding, t - padding * 2, t - padding * 2);
    } else {
      ctx.fillStyle = COLORS.player;
      ctx.beginPath();
      ctx.arc(x + t / 2, y + t / 2, t / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLORS.playerEye;
      ctx.beginPath();
      ctx.arc(x + t / 2 - 5, y + t / 2 - 4, 3, 0, Math.PI * 2);
      ctx.arc(x + t / 2 + 5, y + t / 2 - 4, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
