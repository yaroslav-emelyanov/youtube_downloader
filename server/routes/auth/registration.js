const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router()

router.post('/registration', (req, res) => {
    const { name , email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const password_hash = bcrypt.hashSync(password, salt)
    const sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password_hash}')`
    pool.query(sql, err => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') res.json({status: 'error', message: 'This user already exists'})
            else res.end({status: 'error', message: 'Server error'})
        } else {
            const token = jwt.sign({ email, date: Date.now()}, keys.secret);
            res.cookie('auth', token, {maxAge: 60 * 60 * 1000})
            res.json({status: 'ok', message: 'User was created'})
        }
    })
})

module.exports = router