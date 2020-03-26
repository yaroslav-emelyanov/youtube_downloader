const {Router} = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookieparser')
const router = Router()

router.put('/updateUserName', (req, res) => {

    if (!req.headers.cookie) res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))

    const parsed = cookie.parse(req.headers.cookie)
    const token = parsed.auth
    if (!token) res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))

    try {
        const {email} = jwt.verify(token, keys.secret)
        const {name} = req.body

        const sql = `UPDATE users SET name = '${name}' WHERE email = '${email}'`
        pool.query(sql, err => {
            if (err) res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))
            res.end(JSON.stringify({status: 'ok', message: `Name has been updated on ${name}`}))
        })
    } catch (e) {
        res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))
    }
})

module.exports = router