const express = require('express');
const router = express.Router();

//login handle
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('resgiter')
});

//register handle
router.post('/register', (req, res) => {
});
router.post('/login', (req, res) => {
});

//logout
router.get('/logout', (req, res) => {
});

const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign(
        { username: user.username, id: user.id },
        "jwtsecretplschange"
    );

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });

    try {
        const validToken = verify(accessToken, "jwtsecretplschange");
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

module.exports = { createTokens, validateToken };