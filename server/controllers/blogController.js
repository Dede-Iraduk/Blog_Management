
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../models/database');
const User = require('../models/User');
const Category = require('../models/Category');

const Blog = require('../models/Blog');


exports.homepage = async(req, res) => {
    try {
      const limitNumber = 4; //limit number of categories 
      const categories = await Category.find({}).limit(limitNumber);//object from the db
      const name = req.session.name;

      //retrieve the latest blog and limit them to above set number
      const latest = await Blog.find({}).sort({_id: -1}).limit(limitNumber);

      const facts = await Blog.find({ 'category': 'Facts' }).limit(limitNumber);
      const experiences = await Blog.find({ 'category': 'Experiences' }).limit(limitNumber);
      const journey = await Blog.find({ 'category': 'Journey' }).limit(limitNumber);
  
      const subjects = { latest, facts, experiences, journey};
  
      res.render('index',{ title: 'Blog - Home', categories, subjects });
     
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }

//   **
//  * GET /categories
//  * Categories 
// */

//adding category

exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categoreis', categories } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}


exports.renderRegisterUser = async(req, res) => {
  res.render('signup',{ error: null })
}



exports.registerUser = async(req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  var error = "Email already registered";
if (userExists) {
  res.render('signup', { error: error });
} else {
  // Generate a salt
const salt = await bcrypt.genSalt(10);
// Hash the password
const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {

    const user = new User({ 
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
       });

    
    await User.insertMany([user])
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('signup', { error: 'Error creating user' });
  }
};
}

  
exports.renderSignInUser = async(req, res) => {
  
  res.render('login', { message: req.flash('error') });
    
} 
exports.SignInUser = async(req, res) => {
  

    // var email = req.body.email;
   
  
    // User.findOne({ email: email }, async function(err, user) {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).send();
    //   }
  
    //   if (!user) {
    //     return res.status(404).send('User not found');
    //   }
    //   const validPassword = await bcrypt.compare(req.body.password, user.password);
    //   if (!validPassword) return res.status(400).send('Invalid email or password');
  
    //   // Login successful, set the session variable and redirect to the home page
    //   req.session.user = user;
    //   req.session.name = user.name;
    //   outer.post('/login',
     passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 
  })
// )
//       res.redirect('/');
//     });

  
    
}
exports.exploreBlogs = async(req, res) => {
  
    try {
      let blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      res.render('blog', { title: 'Facts Blog - Blog', blog} );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  } 


  exports.submitBlog = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    //res.render('submitBlog', { title: 'Facts Blog - Submit Blog' } );
    res.render('submitBlog', { title: 'Facts Blog - Submit Blog', infoErrorsObj, infoSubmitObj  } );
  }

  exports.postBlog = async(req, res) => {
    //building the image upload
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files were uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  //setting the directory
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  //????
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newBlog = new Blog({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        content: req.body.content,
        image: newImageName
      });
      
      await newBlog.save();
  
      req.flash('infoSubmit', 'Congrats, Article posted')
      res.redirect('/submit-blog');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-blog');
    }
  }

  // controllers/blogController.js



exports.deleteBlog = async (req, res) => {
  // const infoErrorsObj = req.flash('infoErrors');
  //   const infoSubmitObj = req.flash('infoSubmit');
  
  
  
  
  try {
   // console.log(req.params.id)
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);

    
    if (!deletedBlog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    // let infoSubmitObj = 'Success! Your information has been submitted.';
    // let infoErrorsObj = [{ message: 'Error: Invalid input.' }];
    // res.render('blog', {
    //   infoSubmitObj: infoSubmitObj,
    //   infoErrorsObj: infoErrorsObj
    // });
  
  // req.flash('infoSubmit', ' Article deleted')
  res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting blog' });
  }
};
;

//res.render('submitBlog', { title: 'Facts Blog - Submit Blog' } );
// res.render('submitBlog', { title: 'Facts Blog - Submit Blog', infoErrorsObj, infoSubmitObj  } )


