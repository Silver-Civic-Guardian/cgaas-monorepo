const { chromium } = require('playwright');
const { spawn } = require('child_process');

(async () => {
  // Start local server
  const server = spawn('python3', ['-m', 'http.server', '8080', '-d', 'cloudflare-dist']);
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 1000));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to hub...');
    await page.goto('http://localhost:8080');

    console.log('Verifying language dropdown is set to en...');
    const hubLang = await page.$eval('#language-select', el => el.value);
    if (hubLang !== 'en') throw new Error(`Expected hub language to be en, got ${hubLang}`);

    console.log('Clicking Interactive Web Demo button...');
    await page.click('[data-i18n="navDemo"]');

    console.log('Waiting for demo to load...');
    await page.waitForURL('http://localhost:8080/demo/index.html');

    console.log('Verifying demo title is English...');
    // Wait for the title to be set by i18n
    await page.waitForFunction(() => {
      const el = document.querySelector('h1');
      return el && el.textContent.includes('Civic Guardian');
    }, { timeout: 5000 });
    
    const demoTitle = await page.locator('h1').first().textContent();
    console.log('Demo title:', demoTitle);
    if (!demoTitle.includes('Civic Guardian Web Demo')) {
      throw new Error(`Expected demo title to include 'Civic Guardian Web Demo', got '${demoTitle}'`);
    }

    console.log('Changing demo language to zh-TW...');
    // The language select in the demo doesn't have an ID, but it's the first select
    await page.locator('select').first().selectOption('zh-TW');

    console.log('Verifying demo title changes to Chinese...');
    await page.waitForFunction(() => {
      const el = document.querySelector('h1');
      return el && el.textContent.includes('網頁展示');
    }, { timeout: 5000 });

    console.log('Going back to hub...');
    await page.goBack();

    console.log('Verifying hub language is now zh-TW...');
    
    await page.waitForFunction(() => {
      const el = document.querySelector('#language-select');
      return el && el.value === 'zh-TW';
    }, { timeout: 5000 });

    console.log('Integration test passed successfully!');
    process.exitCode = 0;
  } catch (error) {
    console.error('Test failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.kill();
  }
})();
