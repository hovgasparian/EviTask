const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. Token is missing." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_WORD);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token." });
//   }
// };

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
