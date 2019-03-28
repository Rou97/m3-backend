const express = require('express');
const router = express.Router();

const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

  router.get('/', isLoggedIn(), (req, res, next) => {
    console.log('estoy');
    res.status(200).json();
  });

  router.get('/:username', isLoggedIn(), (req, res, next) => {
    console.log('user');
    res.status(200).json();
  });


module.exports = router;