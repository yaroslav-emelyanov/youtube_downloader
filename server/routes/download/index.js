const {Router} = require('express')
const router = Router()

const add_info_in_database =  require('../../utils/addInfoInDatabase')
const tokenParser =  require('../../utils/tokenParser')
const cyrillicToTranslit = require('cyrillic-to-translit-js')
const ytdl = require('ytdl-core')

function isCyrillic (str) {
    return /[а-я]/i.test(str);
}

router.post('/download', async (req, res) => {
    const { video_id, type } = req.body
    const url = `https://www.youtube.com/watch?v=${video_id}`
    const options = {}
    let format = 'mp4'

    if (type === 'video only') {
        options.filter = format => format.container === 'mp4' && format.qualityLabel === '720p'
    } else if (type === 'audio only') {
       options.quality = 'lowestaudio'
       format = 'mp3'
    } else options.filter = format => format.container === 'mp4' && format.qualityLabel === '360p'

    const video = ytdl(url, options)
    video.on('info', async ({title}, {contentLength}) => {
        let video_name = title

        if (isCyrillic(video_name)) {
            video_name = cyrillicToTranslit().transform(video_name);
        }
        res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${video_name}.${format}"`,
            'Content-Length': contentLength
        });
        video.pipe(res)
        const { email } = await tokenParser(req)
        add_info_in_database(video_id, title, contentLength, email)
    })
})

module.exports = router