import { Tile, TILE_SIZE, COLORS } from './constants.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = TILE_SIZE;
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
    ctx.fillStyle = tile === Tile.BALL_ON_GOAL ? COLORS.ballOnGoal : COLORS.ball;
    ctx.beginPath();
    ctx.arc(x + t / 2, y + t / 2, t / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.ballOutline;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  _drawPlayer(ctx, x, y, t) {
    ctx.fillStyle = COLORS.player;
    ctx.beginPath();
    ctx.arc(x + t / 2, y + t / 2, t / 3, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = COLORS.playerEye;
    ctx.beginPath();
    ctx.arc(x + t / 2 - 5, y + t / 2 - 4, 3, 0, Math.PI * 2);
    ctx.arc(x + t / 2 + 5, y + t / 2 - 4, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
