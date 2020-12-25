var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/login/', function(req, res, next) {
  res.render('login', {errLoginMsg: req.flash('error')});
});

router.post('/login/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/areariservata/',
    failureRedirect: '/users/login/',
    failureFlash: 'Nome utente o password non validi'
  })(req, res, next);
})


router.get('/logout/', function(req, res, next){
  req.logout();
  res.redirect('/users/login/');
})

router.get('/cool/', function(req, res, next){
  res.send("You're so users cool");
})



module.exports = router;
