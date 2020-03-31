const User = require('../models/User')
const Video = require('../models/Video')
const Record = require('../models/Record')

module.exports = async function (youtube_id, name, size, email) {

    const isVideoExist = await Video.findOne({youtube_id})
    const user = await User.findOneAndUpdate({email}, {$inc: {downloads: 1}})

    if (!isVideoExist) {
        const mega_bite = parseFloat((size/(1024 * 1024)).toFixed(1))

        const video = new Video({youtube_id, name, size: mega_bite})
        const videoData = await video.save()


        const record = new Record({
            user_id: user._id,
            video_id: videoData._id
        })
        await record.save()
        return
    }

    const video_id = isVideoExist._id
    const record = new Record({
        user_id: user._id,
        video_id
    })

    record.save(err => {
        if (err && err.code !== 11000) console.log(err)
    })

}