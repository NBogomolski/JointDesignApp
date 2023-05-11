const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const DB = require('./dbConfig')

const router = express.Router();


// Set your secret key for signing JWT tokens
const secretKey = process.env.SECRET_KEY;
const RANDOM_STRING_LENGTH = 20 

// Sample user object
const user = {
    id: 1,
    username: "exampleuser",
    password: "password",
};

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        // Verify and decode JWT token
        const decoded = jwt.verify(token, secretKey);
        // Set user id on request object
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}


router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password is correct
    if (username === user.username && password === user.password) {
        // Create and sign JWT token with user id
        const token = jwt.sign({ id: user.id }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, generateRandomString(RANDOM_STRING_LENGTH));
    console.log(hashedPassword);

    const userExists = await DB.from("users")
        .select("*")
        .eq("username", username);  
    console.log(userExists);

});

const generateRandomString = (length) => {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
};
// Example protected route that requires authentication
// router.get("/protected", verifyToken, (req, res) => {
//     res.json({
//         message: "You are authorized to access this route",
//         userId: req.userId,
//     });
// });

module.exports = router, {verifyToken};
