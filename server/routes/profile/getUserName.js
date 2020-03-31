const {Router} = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookieparser')
const router = Router()

const User = require('../../models/User')

router.get('/getUserName', async (req, res) => {

    if (!req.headers.cookie) {
        res.end(JSON.stringify({status: 'error', message: 'User not registered'}))
        return
    }

    const parsed = cookie.parse(req.headers.cookie)
    const token = parsed.auth
    if (!token) {
        res.end(JSON.stringify({status: 'error', message: 'User not registered'}))
        return
    }

    try {
        const {email} = jwt.verify(token, keys.secret)

        const user = await User.findOne({email})

        if (!user) {
            res.end(JSON.stringify({status: 'error', message: 'User not registered'}))
            return
        }

        const {name, downloads, avatar} = user
        res.end(JSON.stringify({status: 'ok', user: {name, downloads, avatar}}))
    } catch (e) {
        res.end(JSON.stringify({status: 'error', message: 'User not registered'}))
    }
})

module.exports = router