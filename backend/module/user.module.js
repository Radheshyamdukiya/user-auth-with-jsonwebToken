const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,  // not "require"
  },
  collage_id: {
    type: String,
    required: true,
  },
  University:{
    type:String,
    require:true
  },
  collage:{
    type:String,
    require:true
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.methods.comparePassword = function (inputPassword) {
  return this.password === inputPassword;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
