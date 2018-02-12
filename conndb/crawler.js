const Koa = require('koa')
const puppeteer = require('puppeteer')

const url = `https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0`

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
})
;(async() => {
	console.log('爬虫开始')
    // const browser = await puppeteer.launch({
    // 	args: ['--no-sandbox'],
    // 	dumpio: false
    // });
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await sleep(3000)

    await page.waitForSelector('.more')

    for (let i = 0; i < 1; i++) {
    	await sleep(3000)
    	await page.click('.more')
    }

    const result = await page.evaluate(() => {
    	var $ = window.$;
    	var items = $('.list-wp .list a')
    	var links = [];
    	if (items.length > 1) {
    		items.each((index, item) => {
    			let it = $(item)
    			let doubanId = it.find('div').data('id')
    			let $text = it.find('p').clone()
    			$text.find(':nth-child(n)').remove()
    			let text = $text.text().trim()
    			let rate = Number(it.find('strong').text())
    			let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
    			links.push({
    				doubanId, text, rate, poster
    			})

    		})
    	}
    	return links

    })
    browser.close();
    // console.log(result, '豆瓣热门电影')
    process.send({result})
    process.exit(0)
})()