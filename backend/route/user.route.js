const express = require('express');
const user = require("../controller/user.controller");
const route = express.Router();
route.post('/register', user.register)
route.post('/login', user.login)

module.exports = route; 
