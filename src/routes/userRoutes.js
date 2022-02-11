const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchUser")
require("dotenv").config();

const JWT_SECRET = "meetst@nofmcu"
// const JWT_SECRET = process.env.JWT_SECRET

//ROUTE 1 : Create a user using POST req "/auth/createUser" (Auth not required, login not required.)
router.post("/createUser", [
    // name must be at least 3 chars long
    body('name', "Enter a valid name with minimum 3 characters ").isLength({ min: 3 }),
    // email must be an email type
    body('email', "Enter a valid E-Mail").isEmail(),
    // password must be at least 5 chars long
    body('password', 'Enter a valid password with minimum 5 charachters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    // if errors.isEmpty() is false [i.e. error present] then it'll invert to TRUE and it'll send error message
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        securedPassword = await bcrypt.hash(req.body.password, salt)
        // Making user of mongoose model "User" and checking whether the email exists in the model which is been sent by the req.body by client
        // its a promise so will await for it to resolve
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            //  if such user with same email exist in the DB model then return error
            return res.status(400).json({ success, error: 'Sorry, a user with this email already exists. Please use a different email.' })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        })
        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(authToken);
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }

})

//ROUTE 2 : Login a uesr using POST req "/auth/login" (Auth not required, login not required.)
router.post('/login', [
    // Only check if email if valid or not
    body('email', "Enter a valid E-Mail").isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if errors.isEmpty() is false [i.e. error present] then it'll invert to TRUE and it'll send error message
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Using de-structuring, getting out the pw and email from req.body
    const { email, password } = req.body;
    try {
        // finding the destructerd email from the User model and storing it in user variable.
        let user = await User.findOne({ email });
        if (!user) {
            // if email doesn't exists in DB then give this error.
            return res.status(400).json({ success, error: "Please try to log in with correct credentials." })
        }

        // comparing the entered pw with the pw stored in db(user.password)... bcrypt.compare does all the internal hashing
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to log in with correct credentials." });
        }

        // if credentials are correct : Send userID with a signature as an JWT
        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
})

//ROUTE 3 : Get logged in user details using POST req "/auth/getUser" (login required.)
// fetchuser is the middleware 
router.get('/getUser', fetchuser, async (req, res) => {
    try {
        // getting userId from the request header using middleware `fetchuser.js`
        userId = req.user.id;
        // getting a user from User model by using it's Id and selecting everything except pw
        const user = await User.findById(userId).select("-password")
        // Will send the user we needed from the token provided in the header.
        res.send(user)
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
})

//ROUTE 4 :Logout
// fetchuser is the middleware means login is required
router.get('/logout', fetchuser, async (req, res) => {
    try {

        // ------------- directly do `localStorage.removeItem("token");` on the frontend as token is stored in local storage------------------------------

        // let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
        // let randomIndex = Math.floor((Math.random() * 10) + 1);
        // let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);

        // // now just concat the hashed random number to the end of the token
        // console.log("Token before", req.token);
        // req.token = req.token + hashedRandomNumberToAppend;
        // console.log("Token after", req.token);
        // res.setHeader("auth-token", req.token)
        // res.removeHeader("auth-token")
        return res.status(200).json('Logged out');
    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
})

//ROUTE 5 : Updating User details (login required.)
// fetchuser is the middleware 
router.patch('/updateUser', fetchuser, async (req, res) => {
    try {
        // getting userId from the request header using middleware `fetchuser.js`
        const userId = req.user.id;
        const { name, address } = req.body;

        const updatedUser = {}
        if (address) { updatedUser.address = address };
        if (name) { updatedUser.name = name };

        // getting a user from User model by using it's Id and selecting everything except pw
        let existingUser = await User.findById(userId).select("-password")

        existingUser = await User.findByIdAndUpdate(userId, { $set: updatedUser }, { new: true })
        console.log(updatedUser);

        res.json({
            "Success": "User has been updated successfully",
            "updatedUser": updatedUser
        })

    }
    catch (error) {
        console.error("Error :", error.message)
        res.status(500).send("Internal server error occured.")
    }
})



module.exports = router