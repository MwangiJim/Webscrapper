import cheerio from 'cheerio'
import axios from 'axios'
import express from 'express'
const app = express()

const getPostTitles = async()=>{
    try {
        const {data} = await axios.get('https://old.reddit.com/r/programming/')

        const $ = cheerio.load(data)
        const postTitles = []

        $('div > p.title > a').each((idx,element)=>{
            const postTitle = $(element).text()
            postTitles.push(postTitle)
        })

        return postTitles;
    } catch (error) {
        throw error
    }
}

app.listen(8000,()=>console.log('App is running'))

getPostTitles().then(postTitles => console.log(postTitles))