const mongoose=require('mongoose');

const post_schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    describe:{
        type:String,
        require:true
    },
    username:{
      type:String,
      require:true,
    }
})
const post=new mongoose.model('post',post_schema);
module.exports=post;