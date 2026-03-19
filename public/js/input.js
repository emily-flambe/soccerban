import { Direction } from './constants.js';

const KEY_MAP = {
  arrowup: Direction.UP,
  arrowdown: Direction.DOWN,
  arrowleft: Direction.LEFT,
  arrowright: Direction.RIGHT,
  w: Direction.UP,
  s: Direction.DOWN,
  a: Direction.LEFT,
  d: Direction.RIGHT,
};

export class InputHandler {
  constructor(callbacks) {
    // callbacks: { onMove(dr, dc), onUndo(), onRestart() }
    this.callbacks = callbacks;
    this._onKeyDown = this._onKeyDown.bind(this);
    document.addEventListener('keydown', this._onKeyDown);
  }

  _onKeyDown(e) {
    const key = e.key.toLowerCase();

    // Undo: Z or Ctrl+Z
    if (key === 'z') {
      e.preventDefault();
      this.callbacks.onUndo();
      return;
    }

    // Restart: R
    if (key === 'r') {
      this.callbacks.onRestart();
      return;
    }

    // Movement
    const dir = KEY_MAP[key];
    if (dir) {
      e.preventDefault();
      this.callbacks.onMove(dir[0], dir[1]);
    }
  }

  destroy() {
    document.removeEventListener('keydown', this._onKeyDown);
  }
}
