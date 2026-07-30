import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/');
    
    // Wait for the landing page to load
    await page.waitForSelector('[data-testid="landing-page"]');
    
    // Verify default English text
    const titleText = await page.locator('h1').textContent();
    console.log('Default title:', titleText);
    if (titleText !== 'Civic Guardian Web Demo') {
      throw new Error(`Expected "Civic Guardian Web Demo", got "${titleText}"`);
    }
    
    // Click on a scenario to see the layout
    await page.click('button:has-text("The Scam Link")');
    
    // Wait for the layout to load
    await page.waitForSelector('select');
    
    // Verify English text in sidebar
    const sidebarTitle = await page.locator('[data-testid="explainer-sidebar"] h2').textContent();
    console.log('Sidebar title (English):', sidebarTitle);
    if (sidebarTitle !== 'User sends link') {
      throw new Error(`Expected "User sends link", got "${sidebarTitle}"`);
    }
    
    // Change language to zh-TW
    console.log('Changing language to zh-TW');
    await page.selectOption('select', 'zh-TW');
    
    // Verify Chinese text in sidebar
    // Wait a bit for React to re-render
    await page.waitForTimeout(500);
    const sidebarTitleZh = await page.locator('[data-testid="explainer-sidebar"] h2').textContent();
    console.log('Sidebar title (Chinese):', sidebarTitleZh);
    if (sidebarTitleZh !== '使用者發送連結') {
      throw new Error(`Expected "使用者發送連結", got "${sidebarTitleZh}"`);
    }
    
    // Verify Chinese text in chat bubble
    const chatBubbleText = await page.locator('.bg-line-bubble p').textContent();
    console.log('Chat bubble text:', chatBubbleText);
    // The chat bubble text is hardcoded in scenarios.js, wait, is it translated?
    // Ah, the text in scenarios.js is NOT translated. It's hardcoded English.
    // Let's check if the teachable moment is translated.
    // We need to go to step 3 to see the teachable moment.
    await page.click('button:has-text("下一步")'); // Next Step in Chinese
    await page.waitForTimeout(500);
    await page.click('button:has-text("下一步")'); // Next Step in Chinese
    await page.waitForTimeout(500);
    
    const protectYourselfText = await page.locator('.text-red-600').textContent();
    console.log('Protect Yourself text (Chinese):', protectYourselfText);
    if (protectYourselfText !== '保護自己！') {
      throw new Error(`Expected "保護自己！", got "${protectYourselfText}"`);
    }
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
