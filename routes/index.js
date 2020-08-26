// dependencies
const express = require('express');
const router = express.Router();
const browser = require('../models/initialBrowserData');

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
    res.status(201);
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
router.put('/browsers/:id', (req, res) => {
    console.log(req.body);
});

module.exports = router;