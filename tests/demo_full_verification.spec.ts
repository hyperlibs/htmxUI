import { test, expect } from '@playwright/test';

test.describe('HTMXUI Live Demos & TailAdmin Full Verification Suite', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log(`[PAGE CONSOLE ${msg.type()}]`, msg.text()));
    page.on('pageerror', err => console.log(`[PAGE ERROR]`, err.message));
  });

  test('1. Demos Hub (/demo) loads and executes in-browser reactive engine test', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo`);
    await expect(page).toHaveTitle(/Verifiable Live Demos/);

    // Verify flagship demo links exist
    await expect(page.locator('a[href="/demo/tailadmin"]')).toBeVisible();
    await expect(page.locator('a[href="/demo/erp"]')).toBeVisible();
    await expect(page.locator('a[href="/demo/hypersheet"]')).toBeVisible();
    await expect(page.locator('a[href="/demo/universe"]')).toBeVisible();

    // Verify live reactive calculation widget
    const inputA = page.locator('input[hx-model\\.number="calcA1"], input[type="number"]').first();
    const inputB = page.locator('input[hx-model\\.number="calcB1"], input[type="number"]').nth(1);
    const outputCalc = page.locator('span[hx-text="calcA1 * calcB1"]');

    await expect(outputCalc).toHaveText('52500');

    // Mutate input values to test Bolt signal reactivity
    await inputA.fill('200');
    await inputA.dispatchEvent('input');
    await inputB.fill('400');
    await inputB.dispatchEvent('input');

    // 200 * 400 = 80000
    await expect(outputCalc).toHaveText('80000');
  });

  test('2. TailAdmin Full Recreation (/demo/tailadmin) renders all dashboards, apps, forms, tables, and settings', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/tailadmin`);
    await expect(page).toHaveTitle(/TailAdmin Dashboard/);

    // --- 1. E-Commerce Dashboard ---
    const totalViews = page.locator('span[hx-text*="kpis.views"]');
    const totalProfit = page.locator('span[hx-text*="kpis.profit"]');
    await expect(totalViews).toBeVisible();
    await expect(totalProfit).toContainText('45,200');

    // Time filter buttons
    const dayBtn = page.getByRole('button', { name: 'Day' });
    const monthBtn = page.getByRole('button', { name: 'Month' });
    await dayBtn.click();
    await expect(dayBtn).toHaveClass(/bg-blue-600/);
    await monthBtn.click();
    await expect(monthBtn).toHaveClass(/bg-blue-600/);

    // Notification mark-as-read
    const notifBtn = page.locator('header button:has-text("🔔")');
    await notifBtn.click();
    await expect(page.locator('text=High Volume Order Surge')).toBeVisible();
    const markReadBtn = page.getByRole('button', { name: 'Mark all read' });
    await markReadBtn.click();
    await expect(page.locator('span[hx-text="unreadNotifications"]')).toBeHidden();

    // Orders table & order injection signal
    const orderRows = page.locator('#recent-orders-table tbody tr');
    await expect(orderRows).toHaveCount(5);
    const injectBtn = page.getByRole('button', { name: '+ Inject Order (Bolt Signal)' });
    await injectBtn.click();
    await expect(orderRows).toHaveCount(6);
    await expect(orderRows.first()).toContainText('ORD-999');
    await expect(orderRows.first()).toContainText('Mac Studio M3 Ultra');

    // --- 2. Analytics Dashboard ---
    const analyticsNavBtn = page.getByRole('button', { name: /Analytics/ });
    await analyticsNavBtn.click();
    await expect(page.locator('h1:has-text("Analytics Overview")')).toBeVisible();
    await expect(page.locator('text=Total Sessions')).toBeVisible();
    await expect(page.locator('text=87,400')).toBeVisible();
    await expect(page.locator('text=Top Geographic Markets')).toBeVisible();

    // --- 3. Calendar View ---
    const calendarNavBtn = page.getByRole('button', { name: /Calendar/ });
    await calendarNavBtn.click();
    await expect(page.locator('h1:has-text("Interactive Calendar")')).toBeVisible();
    await expect(page.locator('text=September 2026')).toBeVisible();
    await expect(page.locator('text=v0.1.0 Release')).toBeVisible();

    // --- 4. Profile View ---
    const profileNavBtn = page.getByRole('button', { name: /Profile/ });
    await profileNavBtn.click();
    await expect(page.locator('h1:has-text("David Admin")')).toBeVisible();
    await expect(page.locator('text=Principal Systems Architect & HTMXUI Core')).toBeVisible();

    // --- 5. Forms & Elements ---
    const formsNavBtn = page.getByRole('button', { name: /Forms & Elements/ });
    await formsNavBtn.click();
    await expect(page.locator('h1:has-text("Form Elements & Layouts")')).toBeVisible();
    await expect(page.locator('text=File Upload Dropzone')).toBeVisible();

    // --- 6. Tables & Data Grid ---
    const tablesNavBtn = page.getByRole('button', { name: /Tables & Data Grid/ });
    await tablesNavBtn.click();
    await expect(page.locator('h1:has-text("Data Tables & User Records")')).toBeVisible();
    await expect(page.locator('#users-table tbody tr')).toHaveCount(4);
    await expect(page.locator('#users-table tbody tr').first()).toContainText('Sarah Connor');

    // --- 7. Settings Page ---
    const settingsNavBtn = page.getByRole('button', { name: /Settings/ });
    await settingsNavBtn.click();
    await expect(page.locator('h1:has-text("Account & Workspace Settings")')).toBeVisible();

    // --- 8. UI Elements: Alerts & Buttons ---
    const alertsNavBtn = page.getByRole('button', { name: /Alerts & Notifications/ });
    await alertsNavBtn.click();
    await expect(page.locator('h1:has-text("Alerts & Banner Badges")')).toBeVisible();

    const buttonsNavBtn = page.getByRole('button', { name: /Buttons & Badges/ });
    await buttonsNavBtn.click();
    await expect(page.locator('h1:has-text("Buttons & Badges Sandbox")')).toBeVisible();

    // --- 9. Auth Screens ---
    const signinNavBtn = page.getByRole('button', { name: /Sign In Screen/ });
    await signinNavBtn.click();
    await expect(page.locator('text=Sign in to TailAdmin')).toBeVisible();
  });

  test('3. Hypersheet (/demo/hypersheet) initializes matrix, reacts to cell selection, and commits formula', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/hypersheet`);
    await expect(page).toHaveTitle(/Hypersheet/);

    // Verify table rendered rows
    const cellA1 = page.locator('input[data-coord="A1"]');
    const cellA2 = page.locator('input[data-coord="A2"]');
    const cellB1 = page.locator('input[data-coord="B1"]');

    await expect(cellA1).toBeVisible();
    await expect(cellA1).toHaveValue('100');
    await expect(cellA2).toHaveValue('250');
    await expect(cellB1).toHaveValue('1500');

    // Click cell A2 and verify formula bar and activeCell HUD
    await cellA2.click();
    const activeCellHud = page.locator('div[hx-text="activeCell"]');
    await expect(activeCellHud).toHaveText('A2');

    const formulaInput = page.locator('#formula-input');
    await expect(formulaInput).toHaveValue('250');

    // Edit value via formula bar and press Enter
    await formulaInput.fill('7777');
    await formulaInput.press('Enter');

    await expect(cellA2).toHaveValue('7777');
  });

  test('4. Apex ERP (/demo/erp) switches tabs, loads invoices data grid, and interacts with wizard', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/erp`);
    await expect(page).toHaveTitle(/Apex Logistics ERP/);

    // Verify Executive Dashboard is initially visible
    await expect(page.locator('text=Executive Performance Overview')).toBeVisible();
    await expect(page.locator('text=$1,284,500.00')).toBeVisible();

    // Switch to Invoices Data Grid tab
    const invoicesTabBtn = page.getByRole('button', { name: /Invoices Data Grid/ });
    await invoicesTabBtn.click();

    await expect(page.getByRole('heading', { name: 'Enterprise Invoices Data Grid' })).toBeVisible();
    const gridEl = page.locator('div[hx-grid]');
    await expect(gridEl).toBeVisible();

    // Switch to Wizard tab
    const wizardTabBtn = page.getByRole('button', { name: /Create Invoice Wizard/ });
    await wizardTabBtn.click();

    await expect(page.getByRole('heading', { name: 'Create Invoice Wizard' })).toBeVisible();
    await expect(page.locator('.hx-wizard-current-step')).toHaveText('1');

    // Switch to Offline tab
    const offlineTabBtn = page.getByRole('button', { name: /Offline & Sync Hub/ });
    await offlineTabBtn.click();

    await expect(page.getByRole('heading', { name: /Offline Resilience/ })).toBeVisible();
  });

  test('5. Kosmos Universe (/demo/universe) loads 120 FPS Keplerian simulation', async ({ page }) => {
    await page.goto(`${BASE_URL}/demo/universe`);
    await expect(page).toHaveTitle(/(?:Kosmos|Cosmos)/);
    await expect(page.locator('#cosmos-canvas, canvas').first()).toBeVisible();
  });
});
