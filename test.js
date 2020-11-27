const puppeteer=require('puppeteer')
const youtubeSearch=require('yt-search')

// Sample URL
// https://www.youtube.com/embed/6tKjV-rZcXk?modestbranding=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=IsBInsOj8TY
// const videoController=launchVideo()
let browser=null
let page=null


const launchBrowser=async(urlToRun)=>{
    browser=await puppeteer.launch({headless:false,args: ['--start-fullscreen'],defaultViewport:null})
    page=await browser.newPage()
    await page.goto(urlToRun);
    await playVideo()
}

const playVideo=async()=>{
    await page.evaluate(()=>{
        const videoTab=document.querySelector("video")
        videoTab.play()
    })
}

const searchTextVideo=async(songText)=>{
    const fullScreenQuery=`?modestbranding=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=IsBInsOj8TY`
    const result=await youtubeSearch(songText)
    const firstFindVideoId=result.videos[0].videoId
    const fullScreenUrl=`https://www.youtube.com/embed/${firstFindVideoId}${fullScreenQuery}`
    launchBrowser(fullScreenUrl)
}

searchTextVideo('englishman in newyork')

setTimeout(async()=>{
    await page.evaluate(()=>{
        const videoTab=document.querySelector("video")
        videoTab.pause()
    })
},20000)