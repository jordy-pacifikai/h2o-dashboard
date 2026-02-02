const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('https://h2o-ingenierie-dashboard.vercel.app', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  const overlay = await page.$('.introjs-overlay');
  const tooltip = await page.$('.introjs-tooltip');
  const nextBtn = await page.$('.introjs-nextbutton');
  
  console.log('✓ Overlay:', !!overlay);
  console.log('✓ Tooltip:', !!tooltip);
  console.log('✓ Next button:', !!nextBtn);
  
  if (overlay && tooltip && nextBtn) {
    console.log('\n✅ GUIDE FONCTIONNE sur https://h2o-ingenierie-dashboard.vercel.app');
  }
  
  await page.screenshot({ path: '/tmp/h2o-guide-final.png', fullPage: true });
  console.log('\nScreenshot: /tmp/h2o-guide-final.png');
  
  await browser.close();
})();
