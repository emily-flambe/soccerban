import { test, expect } from '@playwright/test';

test.describe('Soccerban', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the game to fully initialize
    await expect(page.locator('#game-canvas')).toBeVisible();
    await expect(page.locator('#level-name')).toHaveText('Level 1: First Kick');
  });

  test('loads the game', async ({ page }) => {
    // Collect console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await expect(page.locator('h1')).toHaveText('Soccerban');
    await expect(page.locator('#game-canvas')).toBeVisible();
    await expect(page.locator('#level-name')).toHaveText('Level 1: First Kick');
    await expect(page.locator('#status')).toHaveText('Moves: 0');

    // Give a moment for any async errors to surface
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test('level 1 — one kick solve', async ({ page }) => {
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#status')).toContainText(/win|next level/i);
  });

  test('undo restores state', async ({ page }) => {
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#status')).toContainText(/win|next level/i);

    await page.keyboard.press('z');
    await expect(page.locator('#status')).toHaveText('Moves: 0');
  });

  test('restart resets level', async ({ page }) => {
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#status')).toContainText(/win|next level/i);

    await page.keyboard.press('r');
    await expect(page.locator('#status')).toHaveText('Moves: 0');
  });

  test('level progression', async ({ page }) => {
    // Solve level 1
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#status')).toContainText(/win|next level/i);

    // Advance to level 2
    await page.keyboard.press('Enter');
    await expect(page.locator('#level-name')).toHaveText('Level 2: Bank Shot');
  });

  test('level 2 — bank shot solve', async ({ page }) => {
    // Solve level 1 first
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#status')).toContainText(/win|next level/i);
    await page.keyboard.press('Enter');
    await expect(page.locator('#level-name')).toHaveText('Level 2: Bank Shot');

    // Solve level 2: Right, Up, Right, Down
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');

    await expect(page.locator('#status')).toContainText(/win|next level/i);
  });
});
