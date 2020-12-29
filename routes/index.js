var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res, next) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Cremona&units=metric&lang=it&appid=b734a115782cc2c4b428f09c5d0a6d63')
    .then(function(result){
      result.json()
        .then(function(data){
          console.log(data)
        })
    })
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
