const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  const title = await page.title();
  const h1Text = await page.textContent('h1');
  console.log('Title:', title);
  console.log('H1:', h1Text);
  if (h1Text.includes('Civic Guardian Web Demo')) {
    console.log('Verification passed!');
  } else {
    console.error('Verification failed!');
    process.exit(1);
  }
  await browser.close();
})();
