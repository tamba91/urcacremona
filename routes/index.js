var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController')


/* GET home page. */
router.get('/', function (req, res, next) {
  postController.getPosts()
    .then(function (posts) {
      res.render('index', { title: 'URCA sezione di Cremona', blogPosts: posts });
    })

});

router.get('/post/:postId', function (req, res, next) {
  postController.getPostById(req.params.postId)
    .then(function(post){
      res.render('post', { title: 'Post', blogPost: post});
    })
  
})

module.exports = router;
