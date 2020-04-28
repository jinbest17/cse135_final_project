// dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// add router for apis here
router.get('/', (req, res) => {
    res.send("You are on home page");
});

router.get('/posts', (req, res) => {
    res.send("You are on posts page");
});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;