const puppeteer = require('puppeteer');
const path = require('path')

async function getPic() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  await page.screenshot({path: path.resolve(__dirname,'./baidu.png')});

  await browser.close();
}

getPic();