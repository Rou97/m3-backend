const express = require('express');
const router = express.Router();

const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

// router.get('/', isLoggedIn(), (req, res, next) => {
//     console.log('dentro');
//     res.json(req.session.currentUser);
//   });

  router.get('/', isLoggedIn(), (req, res, next) => {
    res.status(200).json({
      message: 'This is a private message'
    });
  });


module.exports = router;