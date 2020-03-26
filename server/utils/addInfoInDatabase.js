module.exports = async function (youtube_id, title, size, email) {
    const sql = `SELECT id FROM videos WHERE youtube_id = '${youtube_id}'`
    const promisePool = pool.promise();
    const videoExist = await promisePool.query(sql)

    // INCREMENT DOWNLOADS
    const sql1 = `UPDATE users
                  SET downloads = downloads + 1
                  WHERE email = '${email}'`
    await promisePool.query(sql1)

    if (!videoExist[0].length) {
        const mega_bite = parseFloat((size/(1024 * 1024)).toFixed(1))

        // ADD VIDEO ID
        const sql1 = `INSERT videos (youtube_id, name, size) VALUES ('${youtube_id}', '${title}', '${mega_bite}')`
        const result = await promisePool.query(sql1)
        const video_id = result[0].insertId

        // CREATE RECORD
        const sql2 = `INSERT records (user_id, video_id) 
                      VALUES ((SELECT id FROM users WHERE email = '${email}'), '${video_id}')`
        promisePool.query(sql2)

        return
    }

    const video_id = videoExist[0][0].id
    // CREATE RECORD
    const sql2 = `INSERT records (user_id, video_id) 
                      VALUES ((SELECT id FROM users WHERE email = '${email}'), '${video_id}')`
    pool.query(sql2, err => {
        if (err && err.code !== 'ER_DUP_ENTRY') console.log('error', err.code)
    })
}