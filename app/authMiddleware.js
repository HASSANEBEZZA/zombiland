const jwt = require('jsonwebtoken');
const { User } = require('../app/models/User');
const redisClient = require('../app/config/redisClient');

async function authMiddleware(req, res, next) {
  // Vérifier si le token est présent dans les cookies
  const token = req.cookies.token;

  // Si aucun token n'est trouvé, définir l'utilisateur courant sur null et passer au prochain middleware
  if (!token) {
    res.locals.currentUser = null;
    return next();
  }

  // Vérifier et décoder le token JWT
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      // En cas d'erreur de vérification du token, supprimer le cookie et passer au prochain middleware
      res.clearCookie('token');
      res.locals.currentUser = null;
      return next();
    }

    try {
      let redisUser;
      try {
        // Récupérer les données de l'utilisateur depuis Redis
        const userId = String(decodedToken.id);
        redisUser = await redisClient.get(userId);
      } catch (redisErr) {
        console.error('Erreur lors de la récupération de l\'utilisateur depuis Redis:', redisErr);
        redisUser = null;
      }

      if (!redisUser) {
        // Si l'utilisateur n'est pas dans Redis, récupérer les données depuis la base de données
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
          // Mettre les données de l'utilisateur dans Redis avec une expiration de 1 heure
          await redisClient.setEx(
            String(user.id),
            3600,
            JSON.stringify(userData)
          );
          redisUser = JSON.stringify(userData);
        } catch (redisErr) {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur dans Redis:', redisErr);
        }

        res.locals.currentUser = userData;
      } else {
        // Utiliser les données de l'utilisateur stockées dans Redis
        res.locals.currentUser = JSON.parse(redisUser);
      }

      req.user = res.locals.currentUser;
      next();
    } catch (error) {
      // En cas d'erreur dans la gestion des utilisateurs, définir l'utilisateur courant sur null et passer au prochain middleware
      console.error('Erreur dans le middleware d\'authentification:', error);
      res.locals.currentUser = null;
      next(error);
    }
  });
}

module.exports = authMiddleware;
