const path = require('path')
const fs = require('fs')

module.exports = function  (images_dir) {
    return new Promise(async resolve => {
        const images = fs.readdirSync(images_dir)
        if (images.length > 3) {
            const images_sort = images.map(name => ({
                name,
                time: fs.statSync(images_dir + '/' + name).birthtime.getTime()
            }))
                .sort((a,b) => a.time - b.time)
            const image = images_sort[0].name
            fs.unlinkSync(path.join(images_dir, image))
            const poolPromise = pool.promise()
            const sql = `UPDATE users SET avatar = NULL 
                         WHERE id = (
                           SELECT x.id FROM (
                               SELECT id FROM users WHERE avatar = '${image}'
                           ) AS x
                         )`
            const response = await poolPromise.query(sql)
            console.log(response)
        }
        resolve()
    })
}
