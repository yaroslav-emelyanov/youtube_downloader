const {Router} = require('express')
const get_user_from_cookie = require('../../utils/tokenParser')
const router = Router()

const User = require('../../models/User')
const Record = require('../../models/Record')

router.get('/getUserAlbum', async (req, res) => {
     const user = await get_user_from_cookie(req)
     if (!user) {
         res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))
         return
     }
     const { email } = user
     const userInfo = await User.findOne({email})
     const userRecords = await Record.find({user_id: userInfo._id})
         .sort({date: -1})
         .populate('video_id')
         .select('-user_id -date')
     const records = userRecords.map(({ _id, video_id: { youtube_id, name, size } }) => ({id: _id, youtube_id, name, size}))
     res.end(JSON.stringify(records))
})

module.exports = router