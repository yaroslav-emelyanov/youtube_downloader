const express = require('express')
const bodyParser = require('body-parser')
const fileUpload  = require('express-fileupload')
global.keys = require('./keys')
const app = express()

require('dotenv').config()

const mongoose = require('mongoose');
const URI = process.env.MONGO_DB_URI
async function start() {
    await mongoose.connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
}

start()

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