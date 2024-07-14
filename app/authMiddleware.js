require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../app/models");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.locals.currentUser = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      res.locals.currentUser = null;
      return next();
    }

    try {
      const user = await User.findByPk(decodedToken.id);
      if (!user) {
        res.locals.currentUser = null;
        return next();
      }

      res.locals.currentUser = {
        id: user.id,
        username: user.username,
      };

      req.user = res.locals.currentUser;
      next();
    } catch (error) {
      res.locals.currentUser = null;
      next(error);
    }
  });
}

module.exports = authMiddleware;
