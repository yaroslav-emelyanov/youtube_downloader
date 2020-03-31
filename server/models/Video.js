const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    youtube_id: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: Number,
        required: true
    }
})


module.exports = model('Video', schema)