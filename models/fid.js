const mongoose = require('mongoose');

const fidSchema = mongoose.Schema({
    data: {
        type: Number
    },
    eventProperties: {
        type: Object
    },
    navigatorInformation: {
        type: Object
    },
    vitalsScore: {
        type: String
    }

});

module.exports = mongoose.model('fid', fidSchema);