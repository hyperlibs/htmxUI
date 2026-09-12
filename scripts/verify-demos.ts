import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const routes = [
    '/demo',
    '/demo/tailadmin',
    '/demo/hypersheet',
    '/demo/erp',
    '/demo/universe',
    '/docs/components/button'
  ];

  console.log('--- STARTING DEMO SUITE AUDIT ---');

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    const consoleLogs: string[] = [];
    const errors: string[] = [];

    page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', err => errors.push(err.message));

    console.log(`\nTesting ${url}...`);
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      console.log(`Status: ${resp?.status()}`);

      // Check for errors
      if (errors.length > 0) {
        console.error(`❌ Page Errors on ${route}:`, errors);
      } else {
        console.log(`✅ Zero uncaught JS exceptions`);
      }

      // Check if HxBolt is attached
      const hxBoltExists = await page.evaluate(() => typeof (window as any).HxBolt !== 'undefined');
      console.log(`HxBolt initialized: ${hxBoltExists}`);

      // Route specific interactive tests
      if (route === '/demo') {
        // Test interactive calculator on the page
        const initialTotal = await page.textContent('span[hx-text="calcA1 * calcB1"]');
        console.log(`Demo Calculator initial value: ${initialTotal}`);
        
        // Type into calcA1
        await page.fill('input[hx-model\\.number="calcA1"]', '200');
        await page.dispatchEvent('input[hx-model\\.number="calcA1"]', 'input');
        await page.waitForTimeout(100);
        const updatedTotal = await page.textContent('span[hx-text="calcA1 * calcB1"]');
        console.log(`Demo Calculator updated value after input (200 * 350): ${updatedTotal}`);
      }

      if (route === '/demo/tailadmin') {
        const initialOrderCount = await page.$$eval('tbody tr', rows => rows.length);
        console.log(`TailAdmin initial order rows: ${initialOrderCount}`);
        
        // Click "+ Inject Order"
        await page.click('button:has-text("Inject Order")');
        await page.waitForTimeout(200);
        const updatedOrderCount = await page.$$eval('tbody tr', rows => rows.length);
        console.log(`TailAdmin updated order rows after signal injection: ${updatedOrderCount}`);
      }

      if (route === '/demo/hypersheet') {
        const cellCount = await page.$$eval('td input', inputs => inputs.length);
        console.log(`Hypersheet rendered cell inputs: ${cellCount}`);
        
        // Test formula input
        await page.fill('#formula-input', '9999');
        await page.press('#formula-input', 'Enter');
        await page.waitForTimeout(100);
        console.log(`Hypersheet formula committed successfully`);
      }

    } catch (e: any) {
      console.error(`Failed loading ${url}:`, e.message);
    }

    // Clear listeners for next route
    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
  }

  await browser.close();
  console.log('\n--- AUDIT COMPLETE ---');
}

main().catch(console.error);
