const jwt = require('jsonwebtoken');
const { User } = require('../app/models/User');

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
      // Récupérer les données de l'utilisateur directement depuis la base de données
      const user = await User.findByPk(decodedToken.id);
      if (!user) {
        res.locals.currentUser = null;
        return next();
      }

      // Définir les données de l'utilisateur pour la session en cours
      const userData = {
        id: user.id,
        username: user.username,
      };
      res.locals.currentUser = userData;
      req.user = userData;
      next();
    } catch (error) {
      // En cas d'erreur dans la gestion des utilisateurs, définir l'utilisateur courant sur null et passer au prochain middleware
      console.error('Erreur dans le middleware d\'authentification:', error);
      res.locals.currentUser = null;
      next(error); // Passe l'erreur au middleware de gestion des erreurs
    }
  });
}

module.exports = authMiddleware;
