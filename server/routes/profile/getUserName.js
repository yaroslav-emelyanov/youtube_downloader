const {Router} = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookieparser')
const router = Router()

router.get('/getUserName', (req, res) => {

    if (!req.headers.cookie) res.end(JSON.stringify({status: 'error'}))

    const parsed = cookie.parse(req.headers.cookie)
    const token = parsed.auth
    if (!token) res.end(JSON.stringify({status: 'error'}))

    try {
        const {email} = jwt.verify(token, keys.secret)

        const sql = `SELECT name, downloads, avatar FROM users WHERE email = '${email}'`
        db.get(sql, (err, result) => {
            if (err) res.end(JSON.stringify({status: 'error'}))

            const {name, downloads, avatar} = result
            res.end(JSON.stringify({status: 'ok', user: {name, downloads, avatar}}))
        })
    } catch (e) {
        res.end(JSON.stringify({status: 'error'}))
    }
})

module.exports = router