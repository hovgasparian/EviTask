const jwt = require("jsonwebtoken");
const User = require("../app/models/User");
const UserRoleRel = require("../app/models/User_role_rel");
const Role = require("../app/models/Role");

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Invalid token: Missing authorization header" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Invalid token: Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_WORD);

    const user = await User.findOne({
      where: { email: decoded.email },
      include: {
        model: UserRoleRel,
        as: "roles",
        include: { model: Role, as: "role" },
      },
      nest: true,
      raw: true,
    });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const { roles, ...userData } = user;
    req.user = { ...userData, role: roles.role.name };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token has expired" });
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid token", error });
    }
  }
};

module.exports = AuthMiddleware;
