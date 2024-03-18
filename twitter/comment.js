const puppeteer = require('puppeteer')

const { timeout } = new (require('../util/index'))()
const config = require('../config/config')

/**
 * 推文评论
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

  // 评论
  await page.waitForSelector('div[data-testid="tweetTextarea_0"]')
  const comment = await page.$('div[data-testid="tweetTextarea_0"]')
  await comment.focus()
  const text = `1. 今天天气不错\r2. 挺风和日丽的\r3. 我们下午没有课\r4. 真是挺爽的`
  await comment.type(text)

  // 点击回复按钮
  await page.waitForSelector('div[data-testid="tweetButtonInline"]')
  const btn = await page.$('div[data-testid="tweetButtonInline"]')
  await btn.click()
}

main({
  url: 'https://twitter.com/samzm0909/status/1769606412676878645'
})
