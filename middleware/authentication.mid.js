const jwt = require("jsonwebtoken")
require('dotenv').config()

const authentication = (req, res, next) => {

    if (req.body.email == "admin@gmail.com" && req.body.password == "admin") {
        next();
    } else {
        res.send("Please login first")
    };
}

module.exports = { authentication }