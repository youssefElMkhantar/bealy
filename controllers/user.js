require('dotenv').config();

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// controlleurs pour l'authentification
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
        if (!user) {
            return res.json({redirectLogin: true, message: "user not found"});
        }
        bcrypt.compare(password, user.password)
        .then( doMatch => {
            if (doMatch) {
                return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
                    return res.json({accessToken: token, redirectHome: true});
                })
            }
            return res.json({redirectLogin: true, message: "password is not correct"})
        })
        .catch( err => {
            console.log(err);
        })
        })
        .catch(err => console.log(err));
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then( userDoc => {
        if(userDoc){
            return res.json({redirectSignup: true});
        }
        return bcrypt.hash(password, 12)
        .then( hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
            })
            return user.save();
        })
        .then( result => {
            return res.json({redirectLogin: true});
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
}
