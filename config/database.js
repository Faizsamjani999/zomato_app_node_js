const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Zomato-App");

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("MongoDB Connected...");
})

module.exports = db;