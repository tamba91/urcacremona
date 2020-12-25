const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
            User.findOne({Email : email})
                .then(function (user) {
                    if (!user) {
                        return done(null, false, { message: 'Email non registrata' })
                    }
                    if (bcrypt.compareSync(password, user.Password)) {
                        return done(null, user)
                    }
                    else{
                        return done(null, false, {message: 'Password non corretta' })
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })
    passport.deserializeUser(function (id, done) {
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
}