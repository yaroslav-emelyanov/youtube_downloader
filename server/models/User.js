const {Schema, model} = require('mongoose')

const schema = new Schema({
     name: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true,
         unique: true
     },
     password: {
        type: String,
        required: true
     },
     downloads: {
        type: Number,
        default: 0
     },
     avatar: {
        type: String,
        default: null
     },
})


module.exports = model('User', schema)