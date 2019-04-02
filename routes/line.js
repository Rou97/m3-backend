const express = require('express');
const router = express.Router();

const Tuit = require('../models/Tuit');
const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), (req, res, next) => {
    res.status(200).json();
});

module.exports = router;