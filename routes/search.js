const express = require('express');
const router = express.Router();

const Tuit = require('../models/Tuit');
const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

    router.get('/', isLoggedIn(), async (req, res, next) => {


        const userFound = await User.find({username:req.query.user})
        res.status(200).json(userFound);
    });

  
module.exports = router;