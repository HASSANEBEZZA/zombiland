const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sequelize = require("./app/config/database.js");
const path = require("path");
const authMiddleware = require("./app/authMiddleware.js");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuration de express-session
const sessionSecret = process.env.SESSION_SECRET;

app.use(
  session({
    secret: sessionSecret, // Utilise la clé secrète de l'environnement
    resave: false,
    saveUninitialized: true,
  })
);
// Vue moteur
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

app.use(express.static("public"));

// Utilisation du middleware authMiddleware pour vérifier l'authentification
app.use(authMiddleware);

// Routes
const routes = require("./app/routes.js");
app.use("/", routes);

// Connexion à la base de données
sequelize
  .authenticate()
  .then(() => {})
  .catch((err) => {});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {});
