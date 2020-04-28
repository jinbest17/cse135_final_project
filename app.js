const express = require('express');
const mongoose = require('mongoose')
require("dotenv/config")
const app = express();

// import routes
const routes = require('./routes');

app.use('/', routes);
// db connection
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to db");
}).catch((error) => {
    console.log(error);
});


app.listen(3000);