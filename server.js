import cheerio from 'cheerio'
import axios from 'axios'

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

getPostTitles().then(postTitles => console.log(postTitles))