const User = require('../models/user');

module.exports.login = async (req, res) => {
    console.log(req.body.email);
    res.status(200).json({
        message: {
            email: req.body.email,
            password: req.body.password
        }
    });
}