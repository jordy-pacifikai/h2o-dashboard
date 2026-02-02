const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  // Set localStorage to skip auto-start
  await page.evaluate(() => localStorage.setItem('h2o_guide_seen', 'true'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  console.log('1. Looking for Demarrer button...');
  const demarrerBtn = await page.locator('button:has-text("Demarrer")').first();
  const isVisible = await demarrerBtn.isVisible();
  console.log('   Button visible:', isVisible);
  
  console.log('2. Clicking Demarrer button...');
  await demarrerBtn.click();
  await page.waitForTimeout(1000);
  
  console.log('3. Checking for intro.js...');
  const tooltip = await page.$('.introjs-tooltip');
  console.log('   Tooltip found:', !!tooltip);
  
  if (tooltip) {
    console.log('\n✅ Bouton "Démarrer" lance le guide!');
  } else {
    console.log('\n❌ Le guide ne se lance pas');
  }
  
  await page.screenshot({ path: '/tmp/demarrer-test.png', fullPage: true });
  
  await browser.close();
  process.exit(0);
})();
