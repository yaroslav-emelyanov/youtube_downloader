const {Router} = require('express')
const get_user_from_cookie = require('../../utils/tokenParser')
const router = Router()

router.delete('/deleteRecord', async (req, res) => {
    const user = get_user_from_cookie(req)
    if (!user) res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))

    const { record_id } = req.body

    const sql = `DELETE FROM records WHERE id = ${record_id}`
    pool.query(sql)
})

module.exports = router