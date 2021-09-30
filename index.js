const PORT = 8000
const URL = 'https://www.theguardian.com/us'

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

axios(URL)
.then(response => {
    const rawHtml = response.data
    const $ = cheerio.load(rawHtml)
    const articles = []

    $('.fc-item__title', rawHtml).each(function() {
        const title = $(this).text()
        const uri = $(this).find('a').attr('href')
        articles.push({
            title, 
            uri
        })
    })

    console.log(articles)
})
.catch(err => console.log(err))

app.listen(PORT, () => console.log(`server is running on ${PORT}`))