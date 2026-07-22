const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/');
    
    console.log('Waiting for chat input...');
    await page.waitForSelector('textarea[placeholder="Aa"]');
    
    console.log('Typing message...');
    await page.fill('textarea[placeholder="Aa"]', 'Is this free crypto safe?');
    
    console.log('Clicking send...');
    await page.click('button[type="submit"]');
    
    console.log('Waiting for loading indicator...');
    const startTime = Date.now();
    
    console.log('Waiting for bot response...');
    // Wait for the teachable moment card to appear.
    await page.waitForSelector('text=Protect Yourself!', { timeout: 30000 });
    
    const endTime = Date.now();
    console.log(`Response received in ${endTime - startTime}ms`);
    
    console.log('Teachable Moment UI found!');
    
    console.log('Navigating to /dashboard...');
    await page.goto('http://localhost:5173/dashboard');
    
    console.log('Clicking Refresh...');
    await page.click('button:has-text("Refresh")');
    
    console.log('Waiting for data to load...');
    await page.waitForTimeout(1000);
    
    console.log('Checking threat counts...');
    const dashboardText = await page.textContent('main');
    console.log('Dashboard Text:', dashboardText.replace(/\s+/g, ' ').substring(0, 500));
    
    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
