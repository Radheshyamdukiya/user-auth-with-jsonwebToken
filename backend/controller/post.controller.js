const post=require('../services/post.services')

module.exports.create_post=async(req,res)=>{
    const {title,describe}=req.body;
    const user=req.user;
       if(!user)
   {
    res.send('real user is not find please re_login');
   }
    const username=user.collage_id;


   if(!title || !title.trim() ||  !describe || !describe.trim())
   {
    return  res.send("all fields are required or cannot be empty");
   }


   await post.save_post({title,describe,username});
   console.log(username);
  res.send("data saved");
    
}