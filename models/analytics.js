const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'guest'
    }
});

module.exports = mongoose.model('User', UserSchema);