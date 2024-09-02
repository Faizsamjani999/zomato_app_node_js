const mongoose = require('mongoose');

const schema = mongoose.Schema({
    fullname : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    }
})

const userSchema = mongoose.model("userSchema",schema);

module.exports = userSchema;