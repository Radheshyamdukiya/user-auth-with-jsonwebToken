
const User=require('../module/user.module')
const jwt = require('jsonwebtoken');
const secret="radh@123"
function setuser(user){
    if(!user)
    {
        return res.send("user not found");
    }
return jwt.sign({
    id:user.id,
    collage_id:user.collage_id
},secret);
}

async function authtoken(req,res,next)
{  
    const token=req.cookies.token;
    if(!token){
        console.log('token not found');

    }
    const verfy=jwt.verify(token,secret);
    const user =await User.findById(verfy.id);
 if(!user)
 {
    return res.send("user not found please re login");
 }
 req.user=user;
 next();

}
module.exports={
    setuser,
    authtoken,
};