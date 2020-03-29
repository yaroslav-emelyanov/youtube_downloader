const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router()

router.post('/login', (req, res) => {
   const { email, password } = req.body
    const sql = `SELECT password FROM users WHERE email = '${email}'`
    db.get(sql, (err, result) => {
        if (err) console.log('err', err)
        if(!result) {
            res.json({status: 'error', message: 'User is not found'})
        } else {
            const password_hash = result.password
            const isPasswordCorrected = bcrypt.compareSync(password, password_hash)
            if (!isPasswordCorrected) {
                res.json({status: 'error', message: 'The username or password is incorrect'})
            } else {
                const token = jwt.sign({ email, date: Date.now()}, keys.secret);
                res.cookie('auth', token, {maxAge: 60 * 60 * 1000})
                res.json({status: 'ok', message: 'Login successful'})
            }
        }
    })
})

module.exports = router