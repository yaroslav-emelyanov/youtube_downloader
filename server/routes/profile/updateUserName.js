const {Router} = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookieparser')
const router = Router()

router.put('/updateUserName', (req, res) => {

    if (!req.headers.cookie) res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))

    const parsed = cookie.parse(req.headers.cookie)
    const token = parsed.auth
    if (!token) res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))

    const {email} = jwt.verify(token, keys.secret)
    const {name} = req.body

    const sql = `UPDATE users SET name = '${name}' WHERE email = '${email}'`
    db.run(sql, err => {
        if (err) res.end(JSON.stringify({status: 'error', message: 'Name was not updated'}))
        else res.end(JSON.stringify({status: 'ok', message: `Name has been updated on ${name}`}))
    })
})

module.exports = router