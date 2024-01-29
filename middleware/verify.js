const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

const secretKey = "texas";


// Middleware to verify JWT token
const verifyUserMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyUserMiddleware;
