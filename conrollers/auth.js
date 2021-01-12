const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const keys = require('../config/keys');

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
            res.status(401).json({
                message: "Неверный пароль! Попробуйте снова"
            });
        }
    } else {
        // Пользователя нет
        res.status(404).json({
            message: "Пользователь с таким email не существует."
        });
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
    });

    if (candidate) {
        // Ошибка, пользователь есть
        res.status(409).json({
            message: "Пользователь с таким email уже существует!"
        });
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
            res.status(201).json({
                message: "Пользователь создан!"
            });
        } catch {
            // Обработка ошибок
            
        }
    }
}