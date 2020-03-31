const {Router} = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookieparser')
const router = Router()

const User = require('../../models/User')

router.put('/updateUserName', async (req, res) => {

    if (!req.headers.cookie) {
        res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))
        return
    }

    const parsed = cookie.parse(req.headers.cookie)
    const token = parsed.auth
    if (!token) {
        res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))
        return
    }

    try {
        const {email} = jwt.verify(token, keys.secret)
        const {name} = req.body
        await User.findOneAndUpdate({email}, {name})

        res.end(JSON.stringify({status: 'ok', message: `Name has been updated on - ${name}`}))
    } catch (e) {
        res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))
    }
})

module.exports = router