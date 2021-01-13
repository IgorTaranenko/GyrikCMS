const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        default: ''
    }
});

module.exports = model('categories', categorySchema);