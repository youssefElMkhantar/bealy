const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();


// routes pour l'authentification
router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/logout', userController.logout);

module.exports = router;