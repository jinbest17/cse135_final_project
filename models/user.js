const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
});

module.exports = mongoose.model('userAuth', userSchema);