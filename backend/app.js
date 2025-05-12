const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const db = require('./db/user');
db();
const app = express();
app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const user_route = require('./route/user.route');
const post_route=require('./route/post.route');
const profile_route=require('./route/profile.route');
app.use('/user', user_route); 
app.use('/user',post_route);
app.use('/user',profile_route);

module.exports = app;
