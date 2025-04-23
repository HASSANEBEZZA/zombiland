// Charger les variables d'environnement
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const authMiddleware = require('./app/authMiddleware');
const routes = require('./app/routes');
const MemoryStore = require('session-memory-store')(session);

// Initialiser l'application Express
const app = express();

// Configuration de la session
const sessionSecret = process.env.SESSION_SECRET || 'default-secret';
const isProduction = process.env.NODE_ENV === 'production';

// Création du store en mémoire (utile si tu ne veux pas de base de données)
const store = new MemoryStore();

// Middleware de session
app.use(
  session({
    store,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      maxAge: 3600000, // 1h
      sameSite: 'Strict',
    },
  })
);

// Middleware parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth
app.use(authMiddleware);

// Middleware pour les messages flash
app.use((req, res, next) => {
  res.locals.message = req.cookies.message || null;
  res.locals.error = req.cookies.error || null;
  res.clearCookie('message');
  res.clearCookie('error');
  next();
});

// Middleware utilisateur courant
app.use((req, res, next) => {
  res.locals.currentUser = req.session?.userId ? { username: req.session.username } : null;
  next();
});

// Vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur du serveur.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
