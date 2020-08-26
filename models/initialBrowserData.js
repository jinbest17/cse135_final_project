const mongoose = require('mongoose');

const browserSchema = mongoose.Schema({
    data: {
        type: Object
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

module.exports = mongoose.model('initialBrowserData', browserSchema);