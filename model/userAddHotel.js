const mongoose = require('mongoose');

const schema = mongoose.Schema({
    cityname : {
        type : String,
        require : true
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
    userCategory : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})

const userRequest = mongoose.model("userrequest",schema);

module.exports = userRequest;