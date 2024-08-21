const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const RedisStore = require('connect-redis').default;
const redisClient = require('./app/config/redisClient');
const authMiddleware = require('./app/authMiddleware');
const sequelize = require('./app/config/database');
const dotenv = require('dotenv');
const routes = require('./app/routes'); 

dotenv.config();

const app = express();

// Middleware pour le parsing des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const sessionSecret = process.env.SESSION_SECRET || 'default-secret';

// Middleware pour la gestion des sessions avec Redis
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true,
      maxAge: 3600000, // 1 heure
      sameSite: 'Strict'
    }
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
    
  })
  .catch((err) => {
    
  });

// Gestion des erreurs
app.use((err, req, res, next) => {

 
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur du serveur. Veuillez réessayer plus tard.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Afficher la pile d'appels en mode développement
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  
});
