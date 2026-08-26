import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Extract components from the demos.ts file dynamically
const demosContent = fs.readFileSync(path.join(process.cwd(), 'demos.ts'), 'utf8');
const componentsMatches = Array.from(demosContent.matchAll(/"([^"]+)":\s*`/g));
const COMPONENTS = componentsMatches.map(m => m[1]);

// Components where scaling doesn't logically apply
const NO_SCALE_UI = [
  "badge", "chip", "icon", "indicator", "kbd", "link", "tag", // Inline micro components
  "checkbox", "radio-group", "switch", "slider", "input-otp", // Fixed-size form controls
  "dialog", "drawer", "sheet", "modal", "context-menu", "hover-card", "tooltip", "popover" // Fixed viewport overlays
];

test.describe('HTMXUI Component Gallery Tests', () => {
  for (const slug of COMPONENTS) {
    test(`Component: ${slug}`, async ({ page }) => {
      await page.goto(`/docs/components/${slug}`);

      // Verify the preview panel loaded
      const preview = page.locator('#preview-panel');
      await expect(preview).toBeVisible();

      // Take a screenshot of the default state
      await preview.screenshot({ path: `tests/screenshots/${slug}-default.png` });

      // Test ScaleUI if applicable
      if (!NO_SCALE_UI.includes(slug)) {
        const toggle = page.getByRole('checkbox', { name: 'Test Component Resizing (scaleui="1")' });
        if (await toggle.isVisible()) {
          // Enable ScaleUI
          await toggle.check();
          
          // Verify that at least one element inside preview-content gets the scaleui attribute
          const scaleTarget = page.locator('#preview-content [scaleui="1"]').first();
          await expect(scaleTarget).toBeVisible();

          // Optionally, take a screenshot of the resizable state
          await preview.screenshot({ path: `tests/screenshots/${slug}-scaleui-enabled.png` });
          
          // Disable ScaleUI
          await toggle.uncheck();
          await expect(page.locator('#preview-content [scaleui="1"]')).toHaveCount(0);
        }
      }
    });
  }
});
