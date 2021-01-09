const { Schema, model } = require('mongoose');

const positionSchema = new Schema({
    category: {
        ref: 'Category',
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

module.exports.model('Position', positionSchema);
