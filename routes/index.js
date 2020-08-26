// dependencies
const express = require('express');
const router = express.Router();
const browser = require('../models/initialBrowserData');
const cls = require('../models/cls');
const clsFinal = require('../models/clsFinal');
const fcp = require('../models/fcp');
const fid = require('../models/fid');
const fp = require('../models/fp');
const lcp = require('../models/lcp');
const lcpFinal = require('../models/lcpFinal');
const navTiming = require('../models/navigationTiming');
const networkInfo = require('../models/networkInformation');
const storEstimate = require('../models/storageEstimate');
const tbt = require('../models/tb');

// add router for apis here

router.get('/', (req, res) => {
    res.send("You are on home page");
});

/**
 * Get all entries in the entire browser table
 */
router.get('/initialBrowserData', async (req, res) => {
    try {
        const data = await browser.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/initialBrowserData/:id', async (req, res) => {
    try {
        const data = await browser.findById(id);
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Add new entry with no custom id
 */
router.post('/initialBrowserData', async (req, res) => {
    const newEntry = new browser({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore
    });
    try {
       const savedEntry = await newEntry.save();
       res.status(201).json(savedEntry); 
    } catch {
        res.status(400).json({message: err.message});
    }
});

/**
 * Add new entry with custom id
 */
router.post('/initialBrowserData', (req, res) => {
    console.log(req.body);
});

/**
 * Delete an entry given id
 */
router.delete('/initialBrowserData/:id', (req, res) => {
    console.log(req.body);
});

/**
 * Update an entry given id
 */
router.put('/initialBrowserData/:id', (req, res) => {
    console.log(req.body);
});

module.exports = router;