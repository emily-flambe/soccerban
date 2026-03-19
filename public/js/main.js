import { levels } from './levels.js';
import { GameState } from './game.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';

const canvas = document.getElementById('game-canvas');
const statusEl = document.getElementById('status');
const levelNameEl = document.getElementById('level-name');

let currentLevelIndex = 0;
let game = null;
let renderer = new Renderer(canvas);
let input = null;

function updateStatus() {
  if (game.won) {
    const isLast = currentLevelIndex >= levels.length - 1;
    statusEl.textContent = isLast
      ? 'You beat all the levels!'
      : 'You win! Press Enter for the next level.';
  } else {
    statusEl.textContent = `Moves: ${game.moveCount}`;
  }
}

function updateLevelName() {
  const level = levels[currentLevelIndex];
  levelNameEl.textContent = `Level ${currentLevelIndex + 1}: ${level.name}`;
}

function loadLevel(index) {
  if (index < 0 || index >= levels.length) return;
  currentLevelIndex = index;
  game = new GameState(levels[index]);
  updateLevelName();
  updateStatus();
  renderer.render(game);
}

function onMove(dr, dc) {
  if (game.won) return;
  const moved = game.move(dr, dc);
  if (moved) {
    renderer.render(game);
    updateStatus();
  }
}

function onUndo() {
  if (game.undo()) {
    renderer.render(game);
    updateStatus();
  }
}

function onRestart() {
  game.restart();
  renderer.render(game);
  updateStatus();
}

// Handle Enter to advance levels
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && game.won && currentLevelIndex < levels.length - 1) {
    loadLevel(currentLevelIndex + 1);
  }
});

// Wire up input
input = new InputHandler({ onMove, onUndo, onRestart });

// Wait for sprites, then start
renderer.waitForSprites().then(() => loadLevel(0));
