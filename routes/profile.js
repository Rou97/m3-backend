const express = require('express');
const router = express.Router();

const Tuit = require('../models/tuit');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

  router.get('/', isLoggedIn(), (req, res, next) => {
    console.log('estoy');
    res.status(200).json();
  });

  router.get('/:username', isLoggedIn(), (req, res, next) => {
    console.log('user');
    res.status(200).json('Hola');
  });

  router.post('/:username', isLoggedIn(), async (req, res, next) => {
    console.log(req.body);
    const tuit = req.body;
    console.log('entra');
    if (!tuit.info) {
      res.status(400);
      res.json({ message: 'Make sure you include text' });
      return;
    }
    try {
      const newTuit = await Tuit.create(tuit);
      res.status(200);
      res.json(newTuit);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;