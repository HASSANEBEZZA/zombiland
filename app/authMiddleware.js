
const jwt = require('jsonwebtoken');
const { User } = require('../app/models/User');
const redisClient = require('../app/config/redisClient');

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.locals.currentUser = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      res.clearCookie('token');
      res.locals.currentUser = null;
      return next();
    }

    try {
      let redisUser;
      try {
        const userId = String(decodedToken.id);
        redisUser = await redisClient.get(userId);
      } catch (redisErr) {
       
        redisUser = null;
      }

      if (!redisUser) {
        const user = await User.findByPk(decodedToken.id);
        if (!user) {
          res.locals.currentUser = null;
          return next();
        }

        try {
          const userData = {
            id: user.id,
            username: user.username,
          };
          await redisClient.setEx(
            String(user.id),
            3600,
            JSON.stringify(userData)
          );
          redisUser = JSON.stringify(userData);
        } catch (redisErr) {
          
        }

        res.locals.currentUser = userData;
      } else {
        res.locals.currentUser = JSON.parse(redisUser);
      }

      req.user = res.locals.currentUser;
      next();
    } catch (error) {
      
      res.locals.currentUser = null;
      next(error);
    }
  });
}

module.exports = authMiddleware;
