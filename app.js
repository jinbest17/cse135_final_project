const express = require('express');
const mongoose = require('mongoose')
require("dotenv/config")
const app = express();
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./controllers/passport-config')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

initializePassport(passport);

// app.use(bodyParser.json());
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.set('trust proxy', true);
// import routes
const routes = require('./routes');
app.use('/', routes);

//db connection
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to db");
}).catch((error) => {
    console.log(error);
});


app.listen(5000, () => console.log('Server started'));