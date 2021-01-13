const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const keys = require('../config/keys');
const messageHandler = require('../utils/messageHandler');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        // Пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = JWT.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json(messageHandler("Неверный пароль! Попробуйте снова"));
        }
    } else {
        // Пользователя нет
        res.status(404).json(messageHandler("Пользователь с таким email не существует!"));
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
    });

    if (candidate) {
        // Ошибка, пользователь есть
        res.status(409).json(messageHandler("Пользователь с таким email уже существует!"));
    } else {
        // success
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json(messageHandler("Пользователь создан!"));
        } catch (e) {
            // Обработка ошибок
            errorHandler(res, e);
        }
    }
}