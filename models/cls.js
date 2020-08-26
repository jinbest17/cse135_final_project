const mongoose = require('mongoose');

const clsSchema = mongoose.Schema({
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
    },
    clientAddress: {
        type: String
    }

});

module.exports = mongoose.model('cls', clsSchema);