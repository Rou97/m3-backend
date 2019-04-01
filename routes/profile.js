const express = require('express');
const router = express.Router();

const Tuit = require('../models/Tuit');
const User = require('../models/user');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

  router.get('/', isLoggedIn(), (req, res, next) => {
    res.status(200).json();
  });

  router.get('/:username', isLoggedIn(), async (req, res, next) => {
    const { tuits, _id } = req.session.currentUser;
    try {
       
      // allTuits = await Tuit.find();
      // console.log('tuits', tuits);
      // console.log('allTuits', allTuits);

      if (!tuits.length) {
        res.status(404);
        res.json({ message: 'Tuits not found' });
        return;
      }
      res.json(tuits);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:username/tuit', isLoggedIn(), async (req, res, next) => {
      console.log('user');
      res.status(200).json('estoy');
  });


  router.post('/:username', isLoggedIn(), async (req, res, next) => {
    const tuit = req.body;
    if (!tuit.info) {
      res.status(400);
      res.json({ message: 'Make sure you include text' });
      return;
    }
    try {
      const { tuits, _id } = req.session.currentUser;
      const newTuit = await Tuit.create(tuit);
      console.log('newTuit', newTuit);
      const updatedUser = await User.findByIdAndUpdate(_id, { $push: { tuits: { item: newTuit._id, info: newTuit.info } } }, { new: true });
      req.session.currentUser = updatedUser;
      res.status(200);
      res.json(newTuit);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;