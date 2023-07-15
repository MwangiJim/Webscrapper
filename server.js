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

app.get('/',(req,res)=>{
    res.send('Web Scapper For Old Reddit Website')
    getPostTitles().then(postTitles => res.status(200).json({status:'ok',data:postTitles}))  
})
app.listen(8000,()=>console.log('App is running'))