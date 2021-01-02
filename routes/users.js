const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/login/', function(req, res) {
  res.render('login', {errLoginMsg: req.flash('error')});
});

router.post('/login/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/areariservata/',
    failureRedirect: '/users/login/',
    failureFlash: 'Nome utente o password non validi'
  })(req, res, next);
})

router.get('/logout/', function(req, res){
  req.logout();
  res.redirect('/users/login/');
})

module.exports = router;
