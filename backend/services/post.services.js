const post=require('../module/post.module');
module.exports.save_post=async({title,describe,username})=>{
   const save_post=new post({
      title,
      describe,
      username,
   })
try{
   await save_post.save()
    console.log("data saved")
}
   catch(err){
    console.log('data not saved')
    console.log(err);
   }
}