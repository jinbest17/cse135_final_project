const express = require('express');
const mongoose = require('mongoose')
require("dotenv/config")
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.json());

app.set('trust proxy', true);
// import routes
const routes = require('./routes');
app.use('/', routes);

app.use(express.json());
// db connection
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to db");
}).catch((error) => {
    console.log(error);
});


app.listen(5000, () => console.log('Server started'));