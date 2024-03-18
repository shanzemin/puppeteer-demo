const puppeteer = require('puppeteer')

const util = new (require('../util/index'))()
const config = require('../config/config')

/**
 * 根据token进入到推特页面并点赞
 */
async function main({ url }) {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    // 窗口自适应
    defaultViewport: null,
    // devtools: true,
    args: ['--disable-auto-fill']
  })
  const page = await browser.newPage()
  await page.setCookie({
    name: 'auth_token',
    value: config.token,
    url
  })
  await page.goto(url, { waitUntil: 'domcontentloaded' })

  // 点赞
  await page.waitForSelector('div[data-testid="like"]')
  const like = await page.$('div[data-testid="like"]')
  await like.click()
}

main({
  url: 'https://twitter.com/samzm0909/status/1769606412676878645'
})
