const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Post = require('../models/post');
let middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    try {
        const token = req.headers.authorization.replace('Bearer', '');
        const decodedToken = jwt.verify(token, 'bidule_password_should_be_longer');
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    } catch (error) {
        res.status(401).json({message: 'You are not authenticated!'});
    }
};

module.exports = middlewareObj;

