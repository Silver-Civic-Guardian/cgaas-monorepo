const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://localhost:5174/');
    await page.goto('http://localhost:5174/');
    
    await page.waitForSelector('text=The Scam Link');
    
    console.log('Clicking "The Scam Link"');
    await page.click('text=The Scam Link');
    
    let backToMenuVisible = false;
    while (!backToMenuVisible) {
      try {
        const backToMenu = await page.$('text=Back to Menu');
        if (backToMenu && await backToMenu.isVisible()) {
          backToMenuVisible = true;
          break;
        }
        
        const nextStep = await page.$('text=Next Step');
        if (nextStep && await nextStep.isVisible()) {
          console.log('Clicking "Next Step"');
          await nextStep.click();
          await page.waitForTimeout(500);
        } else {
          throw new Error('Neither "Next Step" nor "Back to Menu" found');
        }
      } catch (e) {
        console.error(e);
        break;
      }
    }
    
    console.log('Clicking "Back to Menu"');
    await page.click('text=Back to Menu');
    
    await page.waitForSelector('text=The Admin Dashboard');
    
    console.log('Clicking "The Admin Dashboard"');
    await page.click('text=The Admin Dashboard');
    
    backToMenuVisible = false;
    while (!backToMenuVisible) {
      try {
        const backToMenu = await page.$('text=Back to Menu');
        if (backToMenu && await backToMenu.isVisible()) {
          backToMenuVisible = true;
          break;
        }
        
        const nextStep = await page.$('text=Next Step');
        if (nextStep && await nextStep.isVisible()) {
          console.log('Clicking "Next Step"');
          await nextStep.click();
          await page.waitForTimeout(500);
        } else {
          throw new Error('Neither "Next Step" nor "Back to Menu" found');
        }
      } catch (e) {
        console.error(e);
        break;
      }
    }
    
    console.log('Clicking "Back to Menu"');
    await page.click('text=Back to Menu');
    
    console.log('Test passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
