const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_WORD);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyTokenMiddleware;
