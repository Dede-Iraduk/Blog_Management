const express = require('express');
const mongoose = require('mongoose');


const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

const fileUpload = require('express-fileupload');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const authController = require('./server/controllers/authController');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//read url bodies
app.use(express.static('public')); //setting the public(images,...) as static
app.use(expressLayouts);

app.use(cookieParser('myBlog'));
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'miasecret',
    resave: false, 
    saveUninitialized: false}));
    app.use(flash())
    app.use(fileUpload())
    
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authController);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/blogRoutes.js')

app.use('/', routes);
app.listen(port, ()=> console.log(`Listening to port ${port}`));

