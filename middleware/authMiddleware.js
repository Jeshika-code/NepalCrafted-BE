
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization') ;

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token' });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user by token payload
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;


