const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const postController = require('../controllers/postController');
const eventController = require('../controllers/eventController');


/* GET home page. */
router.get('/', function (req, res) {
  var arrPromises = [];
  arrPromises.push(postController.getPosts());
  arrPromises.push(eventController.getEventsAscendingDateFromToday());
  Promise.all(arrPromises)
    .then(function (arr) {
      res.render('index', { title: 'URCA sezione di Cremona', blogPosts: arr[0], events: arr[1] });
    })
});

router.get('/post/:postId', function (req, res) {
  postController.getPostById(req.params.postId)
    .then(function (post) {
      res.render('post', { title: 'Post', blogPost: post });
    })

})

router.get('/weatherdata', function (req, res) {
  fetch(`https://api.openweathermap.org/data/2.5/group?id=3177838,3171058,3171457,3169522&units=metric&lang=it&appid=${process.env.OWM_KEY}`)
    .then(function (result) {
      new Promise(function (resolve, reject) {
        result.body.pipe(res);

        result.body.on('end', () => resolve());
        res.on('error', reject);
      })
        .then(res.end());
    })
    .catch(function(err){
      throw new Error('/weatherdata error');
    })
})

module.exports = router;
