const mongoose = require('mongoose');

const schema = mongoose.Schema({
    citynameId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "cityadded"
    },
    hotelname : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    number : {
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})

const hotelAdded = mongoose.model("hoteladded",schema);

module.exports = hotelAdded;