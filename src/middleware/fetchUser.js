const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET
// console.log(JWT_SECRET);

// req, res, next takes a middleware and at the end next() func which will be called which is that async func of `/getUser` in `authorization.js`
const fetchUser = (req, res, next) => {

    // Get the user from the JWT and add it to the `req` object of this middleware func.

    // getting token from the header named "auth-token" of the request 
    const token = req.header("auth-token")
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token." })
    }
    try {
        // verifying token with the secret
        const data = jwt.verify(token, JWT_SECRET);
        // sending the user.id(whole info) removed from "token" after verification into the req.user object from data.user
        req.user = data.user;

        req.token = token;

        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token." })
    }
}

module.exports = fetchUser; 