const mongoose = require('mongoose');

const schema = mongoose.Schema({
    cityname : {
        type : String,
        require : true
    }
})

const cityAdded = mongoose.model("cityadded",schema);

module.exports = cityAdded;