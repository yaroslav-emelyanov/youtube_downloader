const {Router} = require('express')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', '..', '..', 'static', 'img')
const get_user_from_cookie = require('../../utils/tokenParser')
const image_scanner = require('../../utils/imageScanner')
const router = Router()


function get_info_DB(sql) {
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) reject(undefined)
            resolve(row)
        })
    })
}

router.post('/setAvatar', async (req, res) => {
    const user = await get_user_from_cookie(req)
    if (!user) res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))
    if (!req.files) res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))
    if (req.files.size/1024 > 50) res.end(JSON.stringify({status: 'error', message: 'file size should not exceed 50 kb'}))

    const sql = `SELECT avatar from users WHERE email = '${user.email}'`
    const response = await get_info_DB(sql)
    const { avatar } = response

    !avatar
        ? await image_scanner(filePath)
        : fs.unlinkSync(path.join(filePath, avatar))

    const {md5, mimetype, mv} = req.files.image
    const type = mimetype.split('/')[1]
    const fileName = md5 + '.' + type
    await mv(path.join(filePath, fileName))

    const sql1 = `UPDATE users SET avatar = '${fileName}' WHERE email = '${user.email}'`
    await db.run(sql1)
    res.end(JSON.stringify({status: 'ok', message: 'Avatar updated'}))
})

module.exports = router