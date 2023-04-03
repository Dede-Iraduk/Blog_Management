const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const passport = require('passport');
const authController = require('../controllers/authController');

/**
 * App Routes 
*/
//structure of the route, ....nameof the controller, specific controller
router.get('/',blogController.homepage)
// router.get('/login', blogController.signInUser);
router.get('/categories', blogController.exploreCategories);
router.get('/signup', blogController.renderRegisterUser);
router.post('/signup', blogController.registerUser);
router.get('/login', blogController.renderSignInUser);
router.post('/login', blogController.SignInUser);
router.get('/delete-blog/:id', blogController.deleteBlog);
//router.get('/blogs/:id', blogController.deleteBlog);







router.get('/blog/:id', blogController.exploreBlogs);
router.get('/submit-blog', blogController.submitBlog);
router.post('/submit-blog', blogController.postBlog);
// router.get('/delete-blog', blogController.deleteBlog);
// router.delete('/delete-blog', blogController.deleteBlog);

module.exports = router;