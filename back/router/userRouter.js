const express = require('express');
const { registerUser, login,upload } = require('../controller/usercontroller');
const { protect } = require('../middleware/authMiddleware');
const {Up}=require("../model/uploadModel")

const { User } = require('../model/userModel');
const router = express.Router();

router.post('/register',  registerUser);
router.post('/login', login);
router.post('/upload',protect,upload)

router.get('/uploads', protect, async (req, res) => {
  try {
      
      const uploads = await Up.find({
          batch: req.user.batch,
          department: req.user.department
      }).populate('user', 'firstName');
      
      res.json(uploads);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
router.get('/profile', protect, (req, res) => {
    res.json(req.user);
});
router.post('/uploads/:id/like', protect, async (req, res) => {
  try {
      const upload = await Up.findById(req.params.id);

      if (!upload) {
          return res.status(404).json({ message: 'Upload not found' });
      }

      // Check if the user has already liked this upload
      if (upload.likedBy.includes(req.user._id)) {
          return res.status(400).json({ message: 'You have already liked this post' });
      }

      // Add the user's ID to the likedBy array and increment the points
      upload.likedBy.push(req.user._id);
      upload.points += 1;

      await upload.save();
      const user = await User.findById(upload.user);

      if (user) {
          user.point += 1; // Add 1 point for each like
          await user.save();
      }

      res.json({ points: upload.points });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



router.get('/ranking', protect, async (req, res) => {
    try {
        const users = await User.find().sort({ point: -1 }).select('firstName department batch totalPoints');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
