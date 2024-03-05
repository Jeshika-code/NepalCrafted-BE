
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModels');

// const authMiddleware = async (req, res, next) => {
//   const token = req.header('Authorization') ;

//   // Check if not token
//   if (!token) {
//     return res.status(401).json({ message: 'Authorization denied, no token' });
//   }
//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Find user by token payload
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;
// Middleware to authenticate user
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Authorization denied, token not provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Authorization denied, invalid token' });
//   }
// };

// module.exports = authMiddleware;
// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// Middleware to authenticate user using JWT token stored in cookies
const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve JWT token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database using token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach authenticated user to request object
    req.user = user;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;


