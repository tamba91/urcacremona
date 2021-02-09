//display files per area downloads. da implementare in futuro su cloud storage

const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util');
const readDir = util.promisify(fs.readdir)

router.get('/', function (req, res) {

  readDir('public/uploads')
    .then(
      function (result) {
        var filePaths = [];
        result.forEach(function(filename){
          filePaths.push(`/uploads/${filename}`)
        })
        filePaths.sort(function(a, b){
          if(a.split('_-_')[1] > b.split('_-_')[1]){
            return 1;
          }

          if(b.split('_-_')[1] > a.split('_-_')[1]){
            return -1;
          }

          return 0;
        })
        res.render('downloads', { title: 'Downloads', files: filePaths })
      })
    .catch(function(err){
      console.log(err);
    })  
  
});

module.exports = router;