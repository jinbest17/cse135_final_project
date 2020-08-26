const mongoose = require('mongoose');

const fcpSchema = mongoose.Schema({
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
    },
    timestamp: {
        type: Number
    }

});

module.exports = mongoose.model('fcp', fcpSchema);