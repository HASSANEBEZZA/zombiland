const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const authMiddleware = require('./app/authMiddleware');
const sequelize = require('./app/config/database');
const dotenv = require('dotenv');
const routes = require('./app/routes');
const redisStore = require('./app/config/redisStore'); // Utilisez le store Redis configuré

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware pour le parsing des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuration de la session
const sessionSecret = process.env.SESSION_SECRET || 'default-secret';
const isProduction = process.env.NODE_ENV === 'production';

app.use(
  session({
    store: redisStore,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction, // Assurez-vous que l'application utilise HTTPS en production
      httpOnly: true,
      maxAge: 3600000, // 1 heure
      sameSite: 'Strict',
    },
  })
);

// Middleware d'authentification
app.use(authMiddleware);

// Middleware pour gérer les messages flash
app.use((req, res, next) => {
  res.locals.message = req.cookies.message || null;
  res.locals.error = req.cookies.error || null;

  // Supprimer les messages flash des cookies après les avoir transférés
  res.clearCookie('message');
  res.clearCookie('error');
  next();
});

// Middleware pour afficher les données de la session
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('Session non initialisée'));
  }
  next();
});

// Middleware pour ajouter les données de l'utilisateur courant aux vues
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId ? { username: req.session.username } : null;
  next();
});

// Configuration du moteur de vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Utiliser le fichier de routes
app.use('/', routes);

// Authentification de la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie !');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Log l'erreur pour le débogage

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur du serveur. Veuillez réessayer plus tard.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Afficher la pile d'appels en mode développement
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
