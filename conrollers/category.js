const Category = require('../models/category');
const Position = require('../models/position');
const errorHandler = require('../utils/errorHandler');
const messageHandler = require('../utils/messageHandler');

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.user.id
        });
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Category.remove({
            _id: req.params.id
        });
        await Position.remove({
            category: req.params.id
        });
        res.status(200).json(messageHandler('Категория удалена'));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async (req, res) => {
    const category = new Category({
        name: req.body.name,
        user: req.user._id,
        imgSrc: req.file ? req.file.path : ''
    });
    try {
       await category.save();
       res.status(201).json(messageHandler("Категория создана"));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async (req, res) => {
    
}