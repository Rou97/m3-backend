const express = require('express');
const router = express.Router();

const Tuit = require('../models/tuit');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

  router.get('/', isLoggedIn(), (req, res, next) => {
    console.log('estoy');
    res.status(200).json();
  });

  // router.get('/:username', isLoggedIn(), (req, res, next) => {
  //   console.log('user');
  //   res.status(200).json('Hola');
  // });

  router.get('/:username', isLoggedIn(), async (req, res, next) => {
    // const { username } = req.query;
    try {
      const allTuits = await Tuit.find();
      if (!allTuits.length) {
        res.status(404);
        res.json({ message: 'Tuits not found' });
        return;
      }
      res.json(allTuits);
    } catch (error) {
      next(error);
    }
  });


  router.post('/:username', isLoggedIn(), async (req, res, next) => {
    const tuit = req.body;
    console.log(tuit);
    if (!tuit.info) {
      console.log('no entra'),
      res.status(400);
      res.json({ message: 'Make sure you include text' });
      return;
    }
    try {
      const newTuit = await Tuit.create(tuit);
      console.log('entra'),
      console.log('newTuit', newTuit);
      res.status(200);
      res.json(newTuit);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;