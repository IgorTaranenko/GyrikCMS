const { Schema, model } = require('mongoose');

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    units: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = model('positions', positionSchema)
