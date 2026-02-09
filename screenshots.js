const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// List of pages to screenshot
const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'pricing', path: '/pricing' },
  { name: 'resources', path: '/resources' },
  { name: 'programs', path: '/programs' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
  { name: 'mentor-directory', path: '/mentor-directory' },
  { name: 'startup-directory', path: '/startup-directory' },
  { name: 'login', path: '/login' },
  { name: 'signup', path: '/signup' }
];

const baseUrl = 'https://nailab.lovable.app';
const screenshotsDir = './screenshots';

async function takeScreenshots() {
  console.log('Starting screenshot capture...');
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080'
    ]
  });

  try {
    for (const page of pages) {
      console.log(`Capturing screenshot for: ${page.name}`);
      
      // Create page instance
      const pageInstance = await browser.newPage();
      
      // Set viewport to desktop size
      await pageInstance.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
      });

      // Navigate to the page
      const url = baseUrl + page.path;
      await pageInstance.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Wait a bit more for any dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create directory if it doesn't exist
      const pageDir = path.join(screenshotsDir, page.name);
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }

      // Take desktop screenshot
      const screenshotPath = path.join(pageDir, `${page.name}-desktop.png`);
      await pageInstance.screenshot({
        path: screenshotPath,
        fullPage: true,
        type: 'png'
      });

      console.log(`✓ Saved: ${screenshotPath}`);
      
      await pageInstance.close();
    }
  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
  
  console.log('Screenshot capture completed!');
}

takeScreenshots().catch(console.error);