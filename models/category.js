const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    imgSrc: {
        type: String,
        default: ''
    }
});

module.exports = model('categories', categorySchema);