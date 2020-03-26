const jwt = require('jsonwebtoken')
const cookie = require('cookieparser')
const keys = require('../keys')

module.exports =  async function get_user_from_cookie (req) {
    if (!req.headers.cookie) return

    if (req.headers.cookie) {
        const parsed = cookie.parse(req.headers.cookie)
        const token = parsed.auth
        if (!token) return

        const cookieDecoded = await new Promise(resolve => {
            jwt.verify(token, keys.secret, (err, decode) =>{
                if (err) {
                    resolve(null)
                } else {
                    resolve(decode)
                }
            })
        })
        if (!cookieDecoded) return

        return cookieDecoded
    }
}