const {Router} = require('express')
const get_user_from_cookie = require('../../utils/tokenParser')
const router = Router()

router.get('/getUserAlbum', async (req, res) => {
     const user = await get_user_from_cookie(req)
     if (!user) res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))

     const { email } = user
     const sql = `SELECT r.id, v.name, v.youtube_id, v.size FROM records AS r
                  JOIN videos AS v ON v.id = video_id
                  WHERE user_id = (
                    SELECT id FROM users
                    WHERE email = '${email}'
                  )
                  ORDER BY r.date DESC`
     db.all(sql, (err, result) => {
         if (err) res.end(JSON.stringify({status: 'error', message: 'user is not logged in'}))
         res.json(result)
     })
})

module.exports = router