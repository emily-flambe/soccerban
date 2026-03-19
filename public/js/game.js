import { Tile, CHAR_TO_TILE } from './constants.js';

export class GameState {
  constructor(levelDef) {
    this.levelDef = levelDef;
    this.undoStack = [];
    this.won = false;
    this.moveCount = 0;
    this._initFromDef(levelDef);
  }

  _initFromDef(levelDef) {
    this.grid = levelDef.grid.map(row =>
      [...row].map(ch => CHAR_TO_TILE[ch] ?? Tile.EMPTY)
    );
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;
    this._findPlayer();
  }

  _findPlayer() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c] === Tile.PLAYER || this.grid[r][c] === Tile.PLAYER_ON_GOAL) {
          this.playerRow = r;
          this.playerCol = c;
          return;
        }
      }
    }
  }

  _snapshot() {
    return {
      grid: this.grid.map(row => [...row]),
      playerRow: this.playerRow,
      playerCol: this.playerCol,
      moveCount: this.moveCount,
    };
  }

  _restore(snapshot) {
    this.grid = snapshot.grid;
    this.playerRow = snapshot.playerRow;
    this.playerCol = snapshot.playerCol;
    this.moveCount = snapshot.moveCount;
    this.won = false;
  }

  _inBounds(r, c) {
    return r >= 0 && r < this.rows && c >= 0 && c < this.cols;
  }

  _isWalkable(tile) {
    return tile === Tile.EMPTY || tile === Tile.GOAL;
  }

  _isBall(tile) {
    return tile === Tile.BALL || tile === Tile.BALL_ON_GOAL;
  }

  // Find where a ball slides to in a given direction.
  // Returns [destRow, destCol] — the last free cell before hitting an obstacle.
  // If the ball can't move at all, returns its current position.
  _getSlideDestination(startRow, startCol, dr, dc) {
    let r = startRow;
    let c = startCol;
    while (true) {
      const nr = r + dr;
      const nc = c + dc;
      if (!this._inBounds(nr, nc)) return [r, c];
      const tile = this.grid[nr][nc];
      if (tile === Tile.WALL || this._isBall(tile)) return [r, c];
      r = nr;
      c = nc;
    }
  }

  // Attempt to move the player in direction [dr, dc].
  // Returns true if the move was executed.
  move(dr, dc) {
    if (this.won) return false;

    const nr = this.playerRow + dr;
    const nc = this.playerCol + dc;
    if (!this._inBounds(nr, nc)) return false;

    const target = this.grid[nr][nc];
    if (target === Tile.WALL) return false;

    // Save state for undo before making changes
    const snapshot = this._snapshot();

    if (this._isBall(target)) {
      // Kick the ball — it slides until blocked
      const [destR, destC] = this._getSlideDestination(nr, nc, dr, dc);
      if (destR === nr && destC === nc) return false; // ball can't move

      // Move ball to slide destination
      const destTile = this.grid[destR][destC];
      this.grid[destR][destC] = destTile === Tile.GOAL ? Tile.BALL_ON_GOAL : Tile.BALL;

      // Clear ball's old position
      this.grid[nr][nc] = target === Tile.BALL_ON_GOAL ? Tile.GOAL : Tile.EMPTY;
    } else if (!this._isWalkable(target)) {
      return false;
    }

    // Move player
    const currentTile = this.grid[this.playerRow][this.playerCol];
    this.grid[this.playerRow][this.playerCol] =
      currentTile === Tile.PLAYER_ON_GOAL ? Tile.GOAL : Tile.EMPTY;

    const destTile = this.grid[nr][nc];
    this.grid[nr][nc] = destTile === Tile.GOAL ? Tile.PLAYER_ON_GOAL : Tile.PLAYER;

    this.playerRow = nr;
    this.playerCol = nc;
    this.moveCount++;

    this.undoStack.push(snapshot);
    this._checkWin();
    return true;
  }

  undo() {
    if (this.undoStack.length === 0) return false;
    this._restore(this.undoStack.pop());
    return true;
  }

  restart() {
    this.undoStack = [];
    this.won = false;
    this.moveCount = 0;
    this._initFromDef(this.levelDef);
  }

  _checkWin() {
    for (const row of this.grid) {
      for (const tile of row) {
        if (tile === Tile.BALL) return;
      }
    }
    this.won = true;
  }
}
