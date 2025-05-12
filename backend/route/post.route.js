const express = require('express');
const new_post=require('../controller/post.controller')
const post=require('../module/post.module');
const route=express.Router();
const { authtoken } = require('../middleware/auth');
route.get('/create-post',(req,res)=>{
    res.render("post");
})

route.post('/create-post',authtoken,new_post.create_post);
route.get('/show-post',authtoken,async(req,res)=>{
    
    const  posts= await post.find();

    res.render("show_post",{posts});
})
route.get('/show-mypost',authtoken,async(req,res)=>{
    const user=req.user;
    
    const posts=await post.find({username:user.collage_id});
    res.render("show_mypost" ,{posts});
})
route.get('/delete-post/:id',authtoken,async(req,res)=>{
    const {id}=req.params;
   await post.findByIdAndDelete(id)
    .then(()=>{
        console.log(" data is  deleted")
    })
   .catch((err)=>{
    console.log("data is not deleted");
   })
    res.redirect("/user/show-mypost");
})
module.exports=route;