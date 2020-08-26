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
const tbt = require('../models/tbt');

// add router for apis here

router.get('/', (req, res) => {
    res.send("This is the REST API home directory");
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
router.get('/initialBrowserData/:id', getInitialBrowserData, async (req, res) => {
    res.json(res.data);
});

/**
 * Add new entry with no custom id
 */
router.post('/initialBrowserData', async (req, res) => {
    const newEntry = new browser({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp
    });
    try {
       const savedEntry = await newEntry.save();
       res.status(201).json(savedEntry); 
    } catch {
        res.status(400).json({message: err.message});
    }
});


/**
 * Delete an entry given id
 */
router.delete('/initialBrowserData/:id', getInitialBrowserData, async (req, res) => {
    try {
        await res.data.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/initialBrowserData/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
});

async function getInitialBrowserData(req, res, next) {
    let result;
    try {
        result = await browser.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.data = data;
    next();
}

module.exports = router;