const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router()

const User = require('../../models/User')

router.post('/registration', async (req, res) => {
    const { name , email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const password_hash = bcrypt.hashSync(password, salt)
    const user = new User({name, email, password: password_hash})
    user.save(err => {
        if (err) {
            if (err.code === 11000) res.end(JSON.stringify({status: 'error', message: 'This user already exists'}))
            else res.end(JSON.stringify({status: 'error', message: 'Server error'}))
        } else {
            const token = jwt.sign({ email, date: Date.now()}, keys.secret);
            res.cookie('auth', token, {maxAge: 60 * 60 * 1000})
            res.end(JSON.stringify({status: 'ok', message: 'User was created'}))
        }
    })
})

module.exports = router