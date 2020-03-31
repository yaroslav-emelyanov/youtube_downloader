const {Router} = require('express')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', '..', '..', 'static', 'img')
const get_user_from_cookie = require('../../utils/tokenParser')
const image_scanner = require('../../utils/imageScanner')
const router = Router()

const User = require('../../models/User')


router.post('/setAvatar', async (req, res) => {
    const user = await get_user_from_cookie(req)

    let isError = true

    if (!user && isError) isError = false
    if (!req.files && isError) isError = false
    if (req.files.size/1024 > 50 && isError) isError = false

    if (!isError) {
        res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))
        return
    }

    const {email} = user
    const isUserExist = await User.findOne({email})

    if (!isUserExist) {
        res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))
        return
    }

    const { avatar, _id } = isUserExist

    !avatar
        ? await image_scanner(filePath)
        : fs.unlinkSync(path.join(filePath, avatar))

    const {md5, mimetype, mv} = req.files.image
    const type = mimetype.split('/')[1]
    const fileName = md5 + '.' + type
    await mv(path.join(filePath, fileName))


    try {
        await User.findByIdAndUpdate(_id, {avatar: fileName})
        res.end(JSON.stringify({status: 'ok', message: 'Avatar updated'}))
    } catch (e) {
        res.end(JSON.stringify({status: 'error', message: 'Avatar not updated'}))
    }
})

module.exports = router