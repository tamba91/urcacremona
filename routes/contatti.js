var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('contatti', { title: 'Contatti'});
})

module.exports = router;