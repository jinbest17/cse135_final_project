const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'viewer']
    }
});

module.exports = mongoose.model('userAuth', userSchema);