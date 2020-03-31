const {Schema, model, isValidObjectId} = require('mongoose')

const schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    video_id: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

schema.index({user_id: 1, video_id: 1}, {unique: true})

module.exports = model('Record', schema)