const User = require('../module/user.module');
const mongoose = require("mongoose");

module.exports.register_user = async ({ email, collage_id,University,collage, password }) => {
    try {
        const newUser = await User.create({
            email,
            collage_id,
            University,
            collage,
            password,
        });
        console.log("User registered");
    } catch (err) {
        console.log("User not saved", err);
    }
};

