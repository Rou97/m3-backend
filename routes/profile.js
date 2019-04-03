const express = require('express');
const router = express.Router();

const Tuit = require('../models/Tuit');
const User = require('../models/user');
const Follow = require('../models/Follow');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), (req, res, next) => {
  res.status(200).json();
});

router.get('/search', isLoggedIn(), (req, res, next) => {
  res.status(200).json('holaaaaaaaa');
});

router.get('/follow', isLoggedIn(), (req, res, next) => {
  res.status(200).json('holaaaaaaaa');
});



router.post('/:id/follow', isLoggedIn(), async(req, res, next) => {
  const { id : idFollowing } = req.params;

  const { _id: idFollower } = req.session.currentUser;

  const followResult  = await Follow.findOne({following: idFollowing, follower: idFollower});

  console.log('followResult', followResult);

  if(!followResult) {
    const createFollow = await Follow.create({following: idFollowing, follower: idFollower});
    res.status(200).json({
      message:"create",
      follow: createFollow,
    });
  } else {
    const deleteFollow = await Follow.findOneAndDelete({following: idFollowing, follower: idFollower});
    res.status(200).json({
      message:"deleted",
      follow: deleteFollow,
    });
  }
});

router.get('/:username/followers', isLoggedIn(), async(req, res, next) => {
  const { _id } = req.session.currentUser;

  const follows = await Follow.find({follower: _id}).populate('following')
  console.log('follows',follows);

  res.status(200).json(follows);
});

router.get('/:username/line', isLoggedIn(), async(req, res, next) => {
  const { username } = req.params;
  console.log(username);

  const user = await User.findOne({username: username})
  console.log(user);



  res.status(200).json(username);
});



router.get('/:username', isLoggedIn(), async (req, res, next) => {
  const { username } = req.params;

  try {

    const user = await User.findOne({username});
    console.log(user);
    const tuitsByUser = await Tuit.find({creator:user._id});
    console.log('esto', tuitsByUser);
    
    if (!tuitsByUser.length) {
      res.status(404);
      res.json({ message: 'Tuits not found' });
      return;
    }
    res.json(tuitsByUser);
  } catch (error) {
    next(error);
  }
});

router.get('/:username/tuit', isLoggedIn(), async (req, res, next) => {
  console.log('user');
  res.status(200).json('estoy');
});


router.post('/:username', isLoggedIn(), async (req, res, next) => {
  const { info } = req.body;
  console.log('create tuit: ', info);
  if (!info) {
    res.status(400);
    res.json({ message: 'Make sure you include text' });
    return;
  }
  try {
    const { _id } = req.session.currentUser;
    const newTuit = await Tuit.create({ info, creator: _id });
    console.log('newTuit', newTuit);
    res.status(200);
    res.json(newTuit);
  } catch (error) {
    next(error);
  }
});

router.delete('/:username/:id', isLoggedIn(), async (req, res, next) => {
  const { id: idTuit } = req.params;

  try {
    const deleteTuit = await Tuit.findByIdAndDelete(idTuit);
    console.log("deleteTuit", deleteTuit);
    res.status(200);
    res.json({ tuit: deleteTuit, message: 'Tuit deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;