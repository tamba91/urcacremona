var express = require('express');
var router = express.Router();

var postController = require('../controllers/postController');
var fetch = require('node-fetch');


/* GET home page. */
router.get('/', function (req, res, next) {

  postController.getPosts()
    .then(function (posts) {
      res.render('index', { title: 'URCA sezione di Cremona', blogPosts: posts });
    })

});

router.get('/post/:postId', function (req, res, next) {
  postController.getPostById(req.params.postId)
    .then(function (post) {
      res.render('post', { title: 'Post', blogPost: post });
    })

})

router.get('/weatherdata', function (req, res) {
  fetch(`https://api.openweathermap.org/data/2.5/group?id=3177838,3171058,3171457,3169522&units=metric&lang=it&appid=${process.env.OPA_KEY}`)
    .then(function(result){
      new Promise(function(resolve, reject){
        // var dest = fs.createWriteStream('./result');
        result.body.pipe(res);

        result.body.on('end', () => resolve());
        res.on('error', reject);
      })
        .then(res.end());
      // result.json()
      // .then(function(data){
      //   res.json(data)
      // })

      
    })
})
module.exports = router;
