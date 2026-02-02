const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  // Check what's visible
  const overlay = await page.$('.introjs-overlay');
  const tooltip = await page.$('.introjs-tooltip');
  const nextBtn = await page.$('.introjs-nextbutton');
  
  console.log('Overlay:', !!overlay);
  console.log('Tooltip:', !!tooltip);
  console.log('Next button:', !!nextBtn);
  
  if (tooltip) {
    const tooltipBox = await tooltip.boundingBox();
    console.log('Tooltip position:', tooltipBox);
  }
  
  // Get all intro.js elements
  const introElements = await page.$$eval('[class*="introjs"]', els => els.map(e => e.className));
  console.log('Intro elements:', introElements.length, introElements.slice(0, 5));
  
  await page.screenshot({ path: '/tmp/guide-debug.png', fullPage: true });
  console.log('\nScreenshot: /tmp/guide-debug.png');
  
  await browser.close();
  process.exit(0);
})();
