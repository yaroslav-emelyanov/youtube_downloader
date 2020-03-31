const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router()

const User = require('../../models/User')

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if (!user) {
        res.end(JSON.stringify({status: 'error', message: 'The username or password is incorrect'}))
        return
    }

    const password_hash = user.password
    const isPasswordCorrected = bcrypt.compareSync(password, password_hash)
    if (!isPasswordCorrected) {
          res.end(JSON.stringify({status: 'error', message: 'The username or password is incorrect'}))
          return
    }

    const token = jwt.sign({ email, date: Date.now()}, keys.secret);
    res.cookie('auth', token, {maxAge: 60 * 60 * 1000})
    res.end(JSON.stringify({status: 'ok', message: 'Login successful'}))
})

module.exports = router