const Post = require('../models/post');

exports.getAllPosts = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPost;
    if (pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    postQuery.find()
      .then(documents => {
        fetchedPost = documents;
        return Post.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          message: 'Posts fetched succesfully!',
          posts: fetchedPost,
          maxPosts: count
        });
      });
  }

  exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      author: req.userData.userId
    });
    post.save().
      then(createdPost => {
          res.status(200).json({
          message: 'Post added successfully!',
          post: {
            ...createdPost,
            id: createdPost._id,
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Creating a post failed!'
        });
      });
  }

  exports.editPost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId
    });
    Post.updateOne({ _id: req.params.id, author: req.userData.userId }, post)
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Update successful!' });
        } else {
          res.status(401).json({ message: 'Not authorize to do that!' });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Couldn\'t update post!'
        });
      });
  }

  exports.getEditedPostValue = (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({message: 'Post not found!'});
        };
      })
      .catch(error => {
        res.status(500).json({
          message: 'Fetched post failed!'
        });
      });
  }

  exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, author: req.userData.userId })
      .then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: 'Delete successful!' });
        } else {
          res.status(401).json({ message: 'Not authorize to do that!' });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Failed to delete post!'
        });
      });
  }