//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');


const app  = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded ({extended:true}) );
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
  }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser :true });

const userSchema =new mongoose.Schema({
    email : String,
    password : String
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User', userSchema);
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    req.logout(function(err) {
        if (err)
          return next(err); 
        });
    res.render("home");
})

app.get("/submit",(req,res)=>{
    res.render("submit");
})

app.get("/secrets",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("secrets");
    }
    else{
        res.redirect("/login");
    }
})
app.post("/register",(req,res)=>{
    User.register({username:req.body.username} , req.body.password,function(err,user){
        if(err){
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            });
        }
    });
  
});

app.post("/login",(req,res)=>{
   
    const user = new User({
        username : req.body.username,
        password : req.body.password
    })

    req.logIn(user,function(err){
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            });
        }
    })
})


app.post("/submit" ,(req,res)=>{
    res.send("Your secret has been successfully sent");
})


app.listen(3000, ()=>{
    console.log("server started on port 3000");
})