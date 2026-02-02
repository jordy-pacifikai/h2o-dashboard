const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('https://h2o-ingenierie-dashboard.vercel.app', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.setItem('h2o_guide_seen', 'true'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  // Test bouton Démarrer
  const demarrerBtn = await page.locator('button:has-text("Demarrer")').first();
  await demarrerBtn.click();
  await page.waitForTimeout(1000);
  
  const tooltip = await page.$('.introjs-tooltip');
  if (tooltip) {
    console.log('✅ Bouton "Démarrer" fonctionne sur https://h2o-ingenierie-dashboard.vercel.app');
  }
  
  await browser.close();
})();
