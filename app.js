const express = require('express');
const port = 9999;
const app = express();
const path = require('path');
const database = require('./config/database');
const userSchema = require('./model/userRegister');
const cityAdded = require('./model/addCity');

app.use(express.urlencoded());

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.use("/upload",express.static(path.join(__dirname,"upload")));


app.use(require('./routes/route'));

app.listen(port,()=>{
    console.log("Server Started At -" + port);
})