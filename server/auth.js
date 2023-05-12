const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const DB = require('./dbConfig')

const router = express.Router();


// Set your secret key for signing JWT tokens
const secretKey = process.env.SECRET_KEY;


function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        // Verify and decode JWT token
        const decoded = jwt.verify(token, secretKey);

        if (req.method === 'POST') {
            req.userId = decoded.id;

        } else if (req.method === 'GET') {
            req.query.userId = decoded.id
        }
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const {data: dbUsers, error: dbError} = await DB.from("users").select("*").eq("username", username);
    if (dbError) {                      
        console.error(dbError);
        return res.sendStatus(500);
    }
    if (dbUsers.length === 0) return res.sendStatus(404).json();
    const user = dbUsers[0];
    console.log(dbUsers)
    bcrypt.compare(password, user.password, (err, match) => {
        if (err || !match) {
            console.error(err);
            return res.sendStatus(401);
        }
        if (match) {
            const token = jwt.sign({ id: user.id }, secretKey);
            res.json({ token });
        }

    })
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 15
    const salt = await bcrypt.genSalt(saltRounds)
    bcrypt.hash(password, salt || saltRounds, async (err, hash) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(hash)
        const writeToDb = await DB.from("users").insert({
            username: username,
            password: hash
        })
        if (writeToDb.error) {
            console.error(writeToDb.error)
            return res.status(400).json({ error: "User exists" });
        }
        res.status(200)
    });
});

// const generateRandomString = (length) => {
//     return crypto
//         .randomBytes(Math.ceil(length / 2))
//         .toString("hex")
//         .slice(0, length);
// };

// Example protected route that requires authentication
// router.get("/protected", verifyToken, (req, res) => {
//     res.json({
//         message: "You are authorized to access this route",
//         userId: req.userId,
//     });
// });

module.exports = {router, verifyToken};
module.exports.default = router
