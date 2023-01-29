

// controlleurs pour l'authentification
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
        if (!user) {
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then( doMatch => {
            if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
                console.log(err);
                res.redirect('/');
            })
            }
            return res.redirect('/login');
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
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
    .then( userDoc => {
        if(userDoc){
            return res.redirect('/signup');
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
            return res.redirect('/login');
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
