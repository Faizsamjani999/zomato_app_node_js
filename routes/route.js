const express = require('express');

const route = express.Router();

const indexController = require('../controller/indexController');

route.get("/",indexController.homepage);

// Multer Process Started

const multer = require('multer');

const storage = multer.diskStorage({
    destination : ((req,res,cb)=>{
        cb(null,"upload/")
    }),
    filename : ((req,file,cb)=>{
        cb(null,file.originalname)
    })
})

const upload = multer({storage : storage}).single("image");


// Multer Process Over

// User Side Start

route.get("/userRegisterForm",indexController.userRegisterForm);

route.post("/userRegisterPost",indexController.userRegisterPost);

route.get("/userLoginForm",indexController.userLoginForm);

route.post("/sendOtpForm",indexController.sendMail);

route.post("/otpMatch",indexController.otpMatch);

route.get("/index",indexController.index)

route.get("/userAddRestaurant",indexController.userAddRes);

route.post("/userAddResPost",upload,indexController.userAddResPost);

route.get("/zomatoResto",indexController.zomatoResto);

// User Side Over

// Admin Side Start

route.get("/adminLoginForm",indexController.adminLoginForm);

route.post("/adminLoginPost",indexController.adminLoginPost);

route.get("/adminPanel",indexController.adminPanel)

route.get("/addCity",indexController.addCity);

route.post("/addCityPost",indexController.addCityPost)

route.get("/viewCity",indexController.viewCity);

route.get("/deleteCity",indexController.deleteCity);

route.get("/addHotel",indexController.addHotel);

route.post("/addHotelPost",upload,indexController.addHotelPost);

route.get("/showHotel",indexController.showHotel);

route.get("/deleteHotel",indexController.deleteHotel);

route.get("/userRequest",indexController.userRequestPage);

route.get("/doneAndRemove",indexController.removeUserRequest);

route.get("/log-out",indexController.logOut);


// Admin Side Over

module.exports = route;