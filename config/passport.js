const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'felhasznalonev' }, (felhasznalonev, password, done) => {
        //Match user
        User.findOne({
            felhasznalonev: felhasznalonev
        }).then(user => {
            if (!user) {
                return done(null, false, { message: 'Helytelen felhasználónév' })
            }

            //Match password
            bcrypt.compare(password, user.jelszo, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Helytelen jelszó' });
                }
            });
        });
    }));

    //Session settings(keep user logged in)

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}