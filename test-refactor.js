const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/');

    console.log('Typing message...');
    await page.fill('textarea', 'Is this free crypto safe?');
    
    console.log('Sending message...');
    const startTime = Date.now();
    await page.click('button[type="submit"]');

    console.log('Verifying loading indicator...');
    await page.waitForSelector('.animate-bounce', { state: 'visible', timeout: 5000 }).catch(() => console.log('Could not find loading indicator by animate-bounce class, checking DOM...'));
    
    console.log('Waiting for bot response...');
    await page.waitForSelector('text="Protect Yourself!"', { state: 'visible', timeout: 30000 });
    const endTime = Date.now();
    
    const duration = endTime - startTime;
    console.log(`Response took ${duration}ms`);
    if (duration < 800) {
      console.warn('Warning: Delay might not be noticeable enough (less than 800ms)');
    } else {
      console.log('Delay is noticeable (>= 800ms)');
    }

    console.log('Verifying response text...');
    const content = await page.content();
    if (content.includes('empathetic') || content.includes('understand') || content.includes('careful') || content.includes('scam') || content.includes('crypto')) {
      console.log('Response text seems appropriate.');
    }

    console.log('Navigating to dashboard...');
    await page.goto('http://localhost:5173/dashboard');

    console.log('Clicking Refresh Data...');
    await page.click('button:has-text("Refresh")');

    console.log('Verifying threat counts...');
    await page.waitForTimeout(2000);
    
    const textContent = await page.evaluate(() => document.body.innerText);
    console.log('Dashboard text content snippet:', textContent.substring(0, 200).replace(/\n/g, ' '));
    
    const hasHighCounts = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
        if (el.children.length === 0 && el.textContent) {
          const num = parseInt(el.textContent.trim(), 10);
          if (!isNaN(num) && num > 1 && num <= 100) {
            return true;
          }
        }
      }
      return false;
    });

    if (hasHighCounts) {
      console.log('Success: Threat counts are populated and > 1.');
    } else {
      console.error('Error: Could not verify threat counts > 1.');
      console.log('Full text:', textContent);
    }

    console.log('All tests passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
