const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5173');
    await page.waitForSelector('[data-testid="chat-ui"]', { timeout: 5000 });
    console.log('SUCCESS: Chat UI rendered correctly.');
  } catch (error) {
    console.error('FAILED: Chat UI not found.', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();