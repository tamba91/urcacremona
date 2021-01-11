//pagina contatti. in pug per possibile futuro sviluppo contenuti dinamici

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('contatti', { title: 'Contatti'});
})

module.exports = router;