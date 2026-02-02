const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://h2o-ingenierie-dashboard.vercel.app', { waitUntil: 'networkidle' });
  
  // Clear localStorage and reload to trigger auto-start
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  // Check what step is showing
  const tooltipText = await page.$eval('.introjs-tooltiptext', el => el.innerHTML.substring(0, 200)).catch(() => 'No tooltip');
  console.log('Current tooltip:', tooltipText);
  
  // Check if helper layer is highlighting something
  const helperLayer = await page.$('.introjs-helperLayer');
  if (helperLayer) {
    const box = await helperLayer.boundingBox();
    console.log('Helper layer position:', box);
  }
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/h2o-guide-step.png', fullPage: true });
  console.log('Screenshot: /tmp/h2o-guide-step.png');
  
  // Click next a few times and check each step
  for (let i = 0; i < 6; i++) {
    const nextBtn = await page.$('.introjs-nextbutton');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      const stepText = await page.$eval('.introjs-tooltiptext', el => el.textContent?.substring(0, 50)).catch(() => 'No text');
      const targetElement = await page.$('.introjs-showElement');
      console.log(`Step ${i+2}: "${stepText}" | Element highlighted:`, !!targetElement);
    }
  }
  
  await browser.close();
})();
