const {Router} = require('express')
const get_user_from_cookie = require('../../utils/tokenParser')
const router = Router()

const Record = require('../../models/Record')

router.delete('/deleteRecord', async (req, res) => {
    const user = get_user_from_cookie(req)
    if (!user) res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))

    const { record_id } = req.body
    await Record.findOneAndDelete({_id: record_id})
})

module.exports = router