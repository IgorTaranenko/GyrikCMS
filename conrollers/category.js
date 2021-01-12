const { restart } = require("nodemon")

module.exports.getAll = (req, res) => {
    res.status(200).json({
        message: "Catogories"
    })
}