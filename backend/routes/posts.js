const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');
const middleware = require('../middleware/index');
const extractFile = require('../middleware/upload');

// get all the post
router.get('/', PostController.getAllPosts);

// create new post
router.post('/', middleware.isLoggedIn, extractFile, PostController.createPost);

// edit a post
router.put('/:id', middleware.isLoggedIn, extractFile, PostController.editPost);

// When edithing post get the value from db
router.get('/:id', middleware.isLoggedIn, PostController.getEditedPostValue);

// delete a post
router.delete('/:id', middleware.isLoggedIn, PostController.deletePost);

module.exports = router;
