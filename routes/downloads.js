var express = require('express');
var router = express.Router();
var fs = require('fs');
const util = require('util');
const readDir = util.promisify(fs.readdir)

router.get('/', function (req, res, next) {

  readDir('public/uploads')
    .then(
      function (result) {
        var filePaths = [];
        result.forEach(function(filename){
          filePaths.push(`/uploads/${filename}`)
        })
        res.render('downloads', { title: 'Downloads', files: filePaths })
      })
    .catch(function(err){
      console.log(err);
    })  
  
});

module.exports = router;