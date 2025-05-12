const user_services = require('../services/user.services')
const User = require('../module/user.module');
const path = require('path');
const {setuser}=require('../middleware/auth')

module.exports.register = async (req, res) => {
    const { email, collage_id, password ,University,collage} = req.body;
  
    if (!email || !collage_id || !password || !University || !collage) {
        return res.send("Error: All fields are required");
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("User already exists");
        }

        await user_services.register_user({ email, collage_id,University,collage, password });

        // Redirect to login page or send the login HTML
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    } catch (err) {
        console.error("Registration failed:", err);
        res.status(500).send("Server error");
    }
};

const jwt = require('jsonwebtoken');



module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(400).send("Invalid credentials");
    }
   const token=setuser(user);

    res.cookie('token', token, { httpOnly: true });
    res.render('main');
};


