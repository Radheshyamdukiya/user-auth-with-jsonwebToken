const express=require('express');
const {authtoken}=require('../middleware/auth')
const route=express.Router();


route.get('/show-profile',authtoken,(req,res)=>{
    const user=req.user;
    res.render('profile',{user});
})

module.exports=route;