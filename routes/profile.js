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

  
  res.status(200).json(follows);
});

router.get('/line/:username', isLoggedIn(), async(req, res, next) => {
  const { _id } = req.session.currentUser;
  
  try {
    const follows = await Follow.find({follower: _id}).populate('following')
    const followedUsers = follows.reduce((acc,follow)=>acc.concat({ creator: follow.following._id.toString()}),[]);
    const tuitsToShow = await Tuit.find({ $or: followedUsers}).populate('creator');
    console.log(tuitsToShow);
    res.status(200).json(tuitsToShow);
    
  } catch (error) {
    console.log(error);
    next(error);
  }
});



router.get('/:username', isLoggedIn(), async (req, res, next) => {
  const { username } = req.params;

  try {

    const user = await User.findOne({username});
    const tuitsByUser = await Tuit.find({creator:user._id});
    
    if (tuitsByUser.length===0) {
      res.status(200);
      res.json({ message: 'Tuits not found' });
      return;
    }
    res.status(200);
    res.json(tuitsByUser);
    return;
  } catch (error) {
    next(error);
  }
});

router.get('/:username/tuit', isLoggedIn(), async (req, res, next) => {

  res.status(200).json('estoy');
});


router.post('/:username', isLoggedIn(), async (req, res, next) => {
  const { info } = req.body;

  if (!info) {
    res.status(400);
    res.json({ message: 'Make sure you include text' });
    return;
  }
  try {
    const { _id } = req.session.currentUser;
    const newTuit = await Tuit.create({ info, creator: _id });

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

    res.status(200);
    res.json({ tuit: deleteTuit, message: 'Tuit deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;