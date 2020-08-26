const mongoose = require('mongoose');

const lcpFinalSchema = mongoose.Schema({
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

module.exports = mongoose.model('lcpFinal', lcpFinalSchema);