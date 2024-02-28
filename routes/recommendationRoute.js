// recommendationRoute.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const recommendationController = require('../controller/recommendationController');
const cors = require('cors');

router.use(cors());
router.get('/recommendations',authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is stored in req.user._id
    const recommendations = await recommendationController.recommendProducts(userId);
    res.status(200).json({ recommendations });
  } catch (error) {
    console.error(error); // Log the actual error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
