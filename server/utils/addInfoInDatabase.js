function get_info_DB(sql) {
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) reject(undefined)
            resolve(row)
        })
    })
}


module.exports = async function (youtube_id, title, size, email) {
    const sql = `SELECT id FROM videos WHERE youtube_id = '${youtube_id}'`
    //const promisePool = pool.promise();
    const videoExist = await get_info_DB(sql)
    // INCREMENT DOWNLOADS
    const sql1 = `UPDATE users
                  SET downloads = downloads + 1
                  WHERE email = '${email}'`
    await db.run(sql1)

    if (!videoExist) {
        const mega_bite = parseFloat((size/(1024 * 1024)).toFixed(1))

        // ADD VIDEO ID
        const sql1 = `INSERT INTO videos (youtube_id, name, size) VALUES ('${youtube_id}', '${title}', ${mega_bite})`
        await db.run(sql1)
        const sql2 = `SELECT id FROM videos WHERE youtube_id = '${youtube_id}'`
        const {id} = await get_info_DB(sql2)
        // CREATE RECORD
        const sql3 = `INSERT INTO records (user_id, video_id) 
                      VALUES ((SELECT id FROM users WHERE email = '${email}'), '${id}')`
        db.run(sql3)

    } else {
        const video_id = videoExist.id
        // CREATE RECORD
        const sql2 = `INSERT INTO records (user_id, video_id) 
                  VALUES ((SELECT id FROM users WHERE email = '${email}'), '${video_id}')`
        db.run(sql2, err => {
            if (err && err.code !== 'SQLITE_CONSTRAINT') console.log('error', err.code)
        })
    }
}