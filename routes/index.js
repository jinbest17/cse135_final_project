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
const navigationTiming = require('../models/navigationTiming');
const networkInformation = require('../models/networkInformation');
const storageEstimate = require('../models/storageEstimate');
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
    res.json(res.result);
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
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
        await res.result.remove();
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
    
      browser.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    res.result = result;
    next();
}

// cls route

/**
 * Get all entries in the entire browser table
 */
router.get('/cls', async (req, res) => {
    try {
        const data = await cls.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/cls/:id', getcls, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/cls', async (req, res) => {
    const newEntry = new cls({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/cls/:id', getcls, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/cls/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      cls.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getcls(req, res, next) {
    let result;
    try {
        result = await cls.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}

// clsFinal route

/**
 * Get all entries in the entire browser table
 */
router.get('/clsFinal', async (req, res) => {
    try {
        const data = await clsFinal.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/clsFinal/:id', getclsFinal, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/clsFinal', async (req, res) => {
    const newEntry = new clsFinal({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/clsFinal/:id', getclsFinal, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/clsFinal/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      clsFinal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getclsFinal(req, res, next) {
    let result;
    try {
        result = await clsFinal.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}

// fcp route

/**
 * Get all entries in the entire browser table
 */
router.get('/fcp', async (req, res) => {
    try {
        const data = await fcp.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/fcp/:id', getfcp, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/fcp', async (req, res) => {
    const newEntry = new fcp({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/fcp/:id', getfcp, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/fcp/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      fcp.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getfcp(req, res, next) {
    let result;
    try {
        result = await fcp.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}



// fid route

/**
 * Get all entries in the entire browser table
 */
router.get('/fid', async (req, res) => {
    try {
        const data = await fid.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/fid/:id', getfid, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/fid', async (req, res) => {
    const newEntry = new fid({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/fid/:id', getfid, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/fid/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      fid.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getfid(req, res, next) {
    let result;
    try {
        result = await fid.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}


// fp route

/**
 * Get all entries in the entire browser table
 */
router.get('/fp', async (req, res) => {
    try {
        const data = await fp.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/fp/:id', getfp, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/fp', async (req, res) => {
    const newEntry = new fp({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/fp/:id', getfp, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/fp/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      fp.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getfp(req, res, next) {
    let result;
    try {
        result = await fp.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}


// lcp route

/**
 * Get all entries in the entire browser table
 */
router.get('/lcp', async (req, res) => {
    try {
        const data = await lcp.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/lcp/:id', getlcp, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/lcp', async (req, res) => {
    const newEntry = new lcp({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/lcp/:id', getlcp, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/lcp/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      lcp.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getlcp(req, res, next) {
    let result;
    try {
        result = await lcp.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}



// lcpFinal route

/**
 * Get all entries in the entire browser table
 */
router.get('/lcpFinal', async (req, res) => {
    try {
        const data = await lcpFinal.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/lcpFinal/:id', getlcpFinal, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/lcpFinal', async (req, res) => {
    const newEntry = new lcpFinal({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/lcpFinal/:id', getlcpFinal, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/lcpFinal/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      lcpFinal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getlcpFinal(req, res, next) {
    let result;
    try {
        result = await lcpFinal.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}

// navigationTiming route

/**
 * Get all entries in the entire browser table
 */
router.get('/navigationTiming', async (req, res) => {
    try {
        const data = await navigationTiming.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/navigationTiming/:id', getnavigationTiming, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/navigationTiming', async (req, res) => {
    const newEntry = new navigationTiming({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/navigationTiming/:id', getnavigationTiming, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/navigationTiming/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      navigationTiming.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getnavigationTiming(req, res, next) {
    let result;
    try {
        result = await navigationTiming.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}

// networkInformation route

/**
 * Get all entries in the entire browser table
 */
router.get('/networkInformation', async (req, res) => {
    try {
        const data = await networkInformation.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/networkInformation/:id', getnetworkInformation, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/networkInformation', async (req, res) => {
    const newEntry = new networkInformation({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/networkInformation/:id', getnetworkInformation, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/networkInformation/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      networkInformation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getnetworkInformation(req, res, next) {
    let result;
    try {
        result = await networkInformation.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}

// storageEstimate route

/**
 * Get all entries in the entire browser table
 */
router.get('/storageEstimate', async (req, res) => {
    try {
        const data = await storageEstimate.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/storageEstimate/:id', getstorageEstimate, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/storageEstimate', async (req, res) => {
    const newEntry = new storageEstimate({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/storageEstimate/:id', getstorageEstimate, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/storageEstimate/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      storageEstimate.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function getstorageEstimate(req, res, next) {
    let result;
    try {
        result = await storageEstimate.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}

// tbt route

/**
 * Get all entries in the entire browser table
 */
router.get('/tbt', async (req, res) => {
    try {
        const data = await tbt.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Get specific entry given id
 */
router.get('/tbt/:id', gettbt, async (req, res) => {
    res.json(res.result);
});

/**
 * Add new entry with no custom id
 */
router.post('/tbt', async (req, res) => {
    const newEntry = new tbt({
        data: req.body.data,
        eventProperties: req.body.eventProperties,
        navigatorInformation: req.body.navigatorInformation,
        vitalsScore: req.body.vitalsScore,
        timestamp: req.body.timestamp,
        clientAddress: req.ip
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
router.delete('/tbt/:id', gettbt, async (req, res) => {
    try {
        await res.result.remove();
        res.json({message: 'deleted given entry'});
    } catch {
        res.status(500).json({message: err.message});
    }
});

/**
 * Update an entry given id
 */
router.put('/tbt/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      tbt.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

async function gettbt(req, res, next) {
    let result;
    try {
        result = await tbt.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}
module.exports = router;