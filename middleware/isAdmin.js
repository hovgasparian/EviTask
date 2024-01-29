const RoleMiddleware =
  (...roles) =>
  async (req, res, next) => {
    const { role } = req;
    try {
      if (role == "Admin") {
        const permissionAllowed = roles.includes(role);
        if (!permissionAllowed) {
          req.permissionAllowed = false;
          throw new ServiceError({
            message: "Forbidden action",
            statusCode: statusCodes.FORBIDDEN,
          });
        }
        req.permissionAllowed = true;
      }
    } catch (err) {
      next(err);
    }
    return next();
  };

module.exports = RoleMiddleware;
