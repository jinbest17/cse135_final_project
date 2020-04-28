// dependencies
const express = require('express');
const router = express.Router();


// add router for apis here
router.get('/', (req, res) => {
    res.send("You are on home page");
});

router.get('/posts', (req, res) => {
    res.send("You are on posts page");
});

module.exports = router;