// dependencies
const express = require('express');
const router = express.Router();
const userAuth = require('../models/user');
const bcrypt = require('bcrypt');
const initializePassport = require('../controllers/passport-config');
const passport = require('passport');
const path = require('path');

// add router for apis here

router.get('/', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin) {
        res.render('index-admin.ejs', {name: req.user.name});
    } else {
        res.render('index.ejs', {name: req.user.name});
    }

});

router.get('/login', (req, res) => {
    res.render('login.ejs')
});

// router.get('/register', (req, res) => {
//     res.render('register.ejs');
// });

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/register', async (req, res) => {

    //try hash password
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new userAuth({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: 'viewer'
        });
        const savedEntry = await newUser.save();
        console.log(savedEntry);
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }


});

router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/users', checkAuthenticated, (req, res) => {
    if(req.user.isAdmin == true) {
        res.sendFile(path.join(__dirname, '../views/users.html'));
    } else {
        res.status(401).json({message: "You are not authorized to access this page"});
    }

})

// router for CRUD API
router.get('/api', checkAPIAuthenticated, async (req, res) => {
    try {
        const data = await userAuth.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

/**
 * Add new entry with no custom id
 */
router.post('/api', checkAPIAuthenticated, async (req, res) => {
    //try hash password
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new userAuth({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: false
        });
        const savedEntry = await newUser.save();
        console.log(savedEntry);
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

/**
 * Delete an entry given id
 */
router.delete('/api/:id', checkAPIAuthenticated,getUserAuthData, async (req, res) => {
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
router.put('/api/:id', checkAPIAuthenticated,(req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      userAuth.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
});


/**
 * Partial update
 */
router.patch('/api/:id', checkAPIAuthenticated, getUserAuthData, async (req, res) => {
    if (req.body.username != null) {
      res.result.username = req.body.username
    }
    if (req.body.email != null) {
      res.result.email = req.body.email
    }
    if (req.body.isAdmin == "true") {
        res.result.isAdmin = true;
    }
    if (req.body.isAdmin == "false") {
        res.result.isAdmin = false;
    }
    try {
      const updatedSubscriber = await res.result.save()
      res.json(updatedSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

async function getUserAuthData(req, res, next) {
    let result;
    try {
        result = await userAuth.findById(req.params.id);
        if(result == null) {
            return res.status(404).json({message: 'Cannot find document associated with given id.'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.result = result;
    next();
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/login');
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next();
}

function checkAPIAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.status(401).json({message: "You are not authenticated"})
}

module.exports = router;