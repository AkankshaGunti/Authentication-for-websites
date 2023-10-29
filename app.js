//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const bcrypt = require('bcrypt');
const saltrounds=10;

const app  = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded ({extended:true}) );

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser :true });

const userSchema =new mongoose.Schema({
    email : String,
    password : String
});

const secret = process.env.SECRET;
userSchema.plugin(encrypt , {secret:secret, encryptedFields:['password']});
const User = new mongoose.model('User', userSchema);


app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/register",(req,res)=>{
    res.render("register");
})


app.get("/login",(req,res)=>{
    res.render("login");
})


app.get("/logout",(req,res)=>{
    res.render("home");
})

app.get("/submit",(req,res)=>{
    res.render("submit");
})

app.post("/register",(req,res)=>{

    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        const newUser = new User({
            email : req.body.username,
            password : hash
           });
           newUser.save().then(function () {
            res.render("secrets");
          })
          .catch(function (err) {
            console.log(err);
          });
    });

    
    
    
})

app.post("/login",(req,res)=>{
    User.findOne({email: req.body.username})
    .then(function(foundOne){
        if (foundOne) {
            bcrypt.compare(req.body.password, foundOne.password, function(err, result) {
                if(result === true){
                    res.render("secrets")
                }
            });
        } 
    })
    .catch(function(err){
        console.log(err);
    })
})


app.post("/submit" ,(req,res)=>{
    res.send("Your secret has been successfully sent");
})


app.listen(3000, ()=>{
    console.log("server started on port 3000");
})