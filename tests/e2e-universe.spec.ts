import { test, expect } from '@playwright/test';

test.describe('Kosmos 3D Universe Browser E2E Test Suite', () => {

  test('Loads default Earth view and verifies 3D canvas and telemetry HUD', async ({ page }) => {
    await page.goto('http://localhost:3000/app/universe');

    // Verify Title and Header Badges
    await expect(page).toHaveTitle(/Universe Browser/);
    await expect(page.locator('#prop-name')).toHaveText('Earth (Terra)');
    await expect(page.locator('#prop-type')).toHaveText('Terrestrial Planet');
    await expect(page.locator('#prop-mass')).toHaveText('5.972 × 10²⁴ kg');

    // Verify 3D Canvas is present and visible
    const canvas = page.locator('#cosmos-canvas');
    await expect(canvas).toBeVisible();
  });

  test('Clicking left sidebar item updates right pane telemetry, audio, and URL search param', async ({ page }) => {
    await page.goto('http://localhost:3000/app/universe');

    // Click Saturn
    await page.locator('div[data-body-id="saturn"]').click();

    // Verify Right Pane Properties
    await expect(page.locator('#prop-name')).toHaveText('Saturn');
    await expect(page.locator('#prop-type')).toHaveText('Gas Giant (Ringed)');
    await expect(page.locator('#prop-mass')).toHaveText('5.683 × 10²⁶ kg');

    // Verify URL param synchronized
    await expect(page).toHaveURL(/obj=saturn/);

    // Click Mars
    await page.locator('div[data-body-id="mars"]').click();
    await expect(page.locator('#prop-name')).toHaveText('Mars');
    await expect(page.locator('#prop-velocity')).toHaveText('24.07 km/s');
    await expect(page).toHaveURL(/obj=mars/);
  });

  test('Direct deep linking with ?obj= parameter initializes chosen celestial object', async ({ page }) => {
    await page.goto('http://localhost:3000/app/universe?obj=jupiter');

    // Verify Jupiter was auto-selected on load
    await expect(page.locator('#prop-name')).toHaveText('Jupiter');
    await expect(page.locator('#prop-type')).toHaveText('Gas Giant');
    await expect(page.locator('#prop-mass')).toHaveText('1.898 × 10²⁷ kg');
    await expect(page.locator('#prop-gravity')).toHaveText('24.79 m/s²');
  });

  test('Black hole Gargantua deep link and interaction', async ({ page }) => {
    await page.goto('http://localhost:3000/app/universe?obj=gargantua');

    await expect(page.locator('#prop-name')).toHaveText('Gargantua');
    await expect(page.locator('#prop-type')).toHaveText('Supermassive Black Hole');
    await expect(page.locator('#prop-habitability')).toHaveText('Extreme Gravitational Lensing');
  });

  test('Interactive Time-Warp and Pause toggling via HTMXUI Bolt signals', async ({ page }) => {
    await page.goto('http://localhost:3000/app/universe');

    const pauseBtn = page.locator('#btn-pause');
    await expect(pauseBtn).toBeVisible();

    // Click pause
    await pauseBtn.click();
    await expect(page.locator('#btn-pause-text')).toHaveText(/Resume/);

    // Resume
    await pauseBtn.click();
    await expect(page.locator('#btn-pause-text')).toHaveText(/Pause/);
  });

});
