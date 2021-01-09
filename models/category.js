const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgSrc: {
        src: {
            type: String
        }
    }
});

module.exports.model('Category', categorySchema);