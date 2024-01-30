const RoleMiddleware = (...roles) => async (req, res, next) => {
    try {
         if (!roles.length) return next();
         const { user: { role } } = req;
         const permissionAllowed = roles.includes(role);
         if (!permissionAllowed) {
            req.permissionAllowed = false;
            return res.status(403).json({ message: "Forbidden: Action", error });
         }
         req.permissionAllowed = true;
        return next()
    } catch (error) {
        return res
        .status(403)
        .json({ message: "Forbidden: Action", error });
    }
};

module.exports = RoleMiddleware;
