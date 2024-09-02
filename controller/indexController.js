const cityAdded = require("../model/addCity");
const hotelAdded = require("../model/addHotel");
const userRequest = require("../model/userAddHotel");
const userSchema = require("../model/userRegister");
const nodemailer = require('nodemailer');
const path = require('path');

const homepage = (req,res)=>{
    res.render("homepage");
}

// User Side Started


const userRegisterForm = (req,res)=>{
    res.render("userRegister");
}
const userRegisterPost = async(req,res)=>{
    await userSchema.create(req.body);

    res.redirect("/userLoginForm");
}
const userLoginForm = (req,res)=>{
    res.render("userLogin");
}

const otp = Math.floor(Math.random()*1000000);

const sendMail = async(req,res)=>{
    const mailCheck = await userSchema.findOne({email : req.body.email})

    if(mailCheck)
        {
            
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth : {
                    user : "faizsamjani999@gmail.com",
                    pass : "fwmdpqqsfbxsopeh"
                }
            })
    
            const info = transporter.sendMail({
                from : "faizsamjani999@gmail.com",
                to : req.body.email,
                subject : "Login OTP on Zomato App",
                html : `${otp}`
            })
            
    
            res.render("otpForm");
        }
        else{
            res.render("wrongMail")
        }
}

const otpMatch = async(req,res)=>{
    const otp1 = req.body.otp1;
    const otp2 = req.body.otp2;
    const otp3 = req.body.otp3;
    const otp4 = req.body.otp4;
    const otp5 = req.body.otp5;
    const otp6 = req.body.otp6;

    const token = otp1+otp2+otp3+otp4+otp5+otp6;

    console.log(token);

    if(token == otp)
    {
        res.redirect("/index");
    }
    else
    {
        res.render("wrongOtp")
    }
}

const index = async(req,res)=>{
    await cityAdded.find({}).then((alldata)=>{
        res.render("index",{
            data : alldata
        })
    })
}
const userAddRes = async(req,res)=>{
    res.render("userAddRestaurant")
}
const userAddResPost = async(req,res)=>{

    let image = " ";

    if(req.file)
    {
        image = req.file.path
    }

    await userRequest.create({
        cityname : req.body.cityname,
        hotelname : req.body.hotelname,
        address : req.body.address,
        number : req.body.number,
        category : req.body.category,
        image : image
    }).then(()=>{
        res.redirect("back");
    })
}

const zomatoResto = async(req,res)=>{
    await hotelAdded.find({}).populate("citynameId").then((alldata)=>{
        res.render("restoZomato",{
            data : alldata
        })
    })
}



// User Side Over


// Admin Side Started

const adminLoginForm = (req,res)=>{
    res.render("adminLogin");
}
const adminLoginPost = async(req,res)=>{
    obj = {
        username : "faizsamjani999@gmail.com",
        password : "999"
    }

    const data = (req.body);

    console.log(data);
    console.log(data.username);
    console.log(data.password);
    console.log(obj);

    if(data.username == obj.username)
    {
        if(data.password == obj.password)
        {
            res.redirect("/adminPanel");
        }
        else
        {
            res.render("wrongPassword")
        }
    }
    else
    {
        res.render("userNotExit");
    }
}

const adminPanel = (req,res)=>{
    res.render("adminpanel");
}

const addCity = (req,res)=>{
    res.render("addCity")
}

const addCityPost = async(req,res)=>{
    await cityAdded.create(req.body)

    res.redirect("back")
}
const viewCity = async(req,res)=>{
    await cityAdded.find({}).then((alldata)=>{
        res.render("viewCity",{
            data : alldata
        })
    })
}
const deleteCity = async(req,res)=>{
    let id = req.query.id;

    await cityAdded.findByIdAndDelete(id).then(()=>{
        res.redirect("back");
    })
}

const addHotel = async(req,res)=>{
    await cityAdded.find({}).then((alldata)=>{
        res.render("addHotel",{
            data : alldata
        })
    })
}

const addHotelPost = async(req,res)=>{

    let image = " ";

    if(req.file)
    {
        image = req.file.path
    }

    await hotelAdded.create({
        citynameId : req.body.citynameId,
        hotelname : req.body.hotelname,
        address : req.body.address,
        number : req.body.number,
        category : req.body.category,
        image : image
    }).then(()=>{
        res.redirect("back");
    })
}
const showHotel = async(req,res)=>{
    await hotelAdded.find({}).populate("citynameId").then((alldata)=>{
        res.render("viewHotel",{
            data : alldata
        })
    })
}
const deleteHotel = async(req,res)=>{

    let id = req.query.id;

    await hotelAdded.findByIdAndDelete(id).then(()=>{
        res.redirect("back");
    })
}
const userRequestPage = async(req,res)=>{
    await userRequest.find({}).then((alldata)=>{
        res.render("userRequest",{
            data : alldata
        })
    })
}
const removeUserRequest = async(req,res)=>{

    let id = req.query.id;

    await userRequest.findByIdAndDelete(id).then(()=>{
        res.redirect("back");
    })
}

const logOut = async(req,res)=>{
    res.redirect("/");
}



// Admin Side Over


module.exports = {
    // User side Start

    homepage,
    userRegisterForm,
    userRegisterPost,
    userLoginForm,
    sendMail,
    otpMatch,
    index,
    userAddRes,
    userAddResPost,
    zomatoResto,

    // User side Over


    // Admin Side Start

    adminLoginForm,
    adminLoginPost,
    adminPanel,
    addCity,
    addCityPost,
    viewCity,
    deleteCity,
    addHotel,
    addHotelPost,
    showHotel,
    deleteHotel,
    userRequestPage,
    removeUserRequest,
    logOut
}