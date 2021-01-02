const express = require('express');
const router = express.Router();
const fs = require('fs');
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