const express = require('express')
const bodyParser = require('body-parser')
const fileUpload  = require('express-fileupload')
global.keys = require('./keys')
const app = express()
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('server/database.db');

const registrationRouter = require('./routes/auth/registration')
const loginRouter = require('./routes/auth/login')
const getUserNameRouter = require('./routes/profile/getUserName')
const updateUserNameRouter = require('./routes/profile/updateUserName')
const setAvatarRouter = require('./routes/profile/serAvatar')
const downloadRouter = require('./routes/download')
const getUserAlbumRouter = require('./routes/album')
const deleteRecordRouter = require('./routes/album/deleteRecord')


app.use(fileUpload())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/server', registrationRouter)
app.use('/server', loginRouter)

app.use('/server', getUserNameRouter)
app.use('/server', updateUserNameRouter)

app.use('/server', setAvatarRouter)

app.use('/server', downloadRouter)
app.use('/server', getUserAlbumRouter)
app.use('/server', deleteRecordRouter)

module.exports = app