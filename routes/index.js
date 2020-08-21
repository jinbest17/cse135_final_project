// dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/analytics');

// add router for apis here
router.get('/', (req, res) => {
    res.send("You are on home page");
});

/**
 * Get all entries in the entire browser table
 */
router.get('/browsers', (req, res) => {
    res.send("You are on posts page");
});

/**
 * Get specific entry given id
 */
router.get('/browsers/:id', (req, res) => {
    res.send(req.params.id);
});

/**
 * Add new entry with no custom id
 */
router.post('/browsers', (req, res) => {
    console.log(req.body);
});

/**
 * Add new entry with custom id
 */
router.post('/browsers', (req, res) => {
    console.log(req.body);
});

/**
 * Delete an entry given id
 */
router.delete('/browsers/:id', (req, res) => {
    console.log(req.body);
});

/**
 * Update an entry given id
 */
router.post('/browsers/:id', (req, res) => {
    console.log(req.body);
});

module.exports = router;