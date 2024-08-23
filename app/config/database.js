// On importe le module Sequelize
const { Sequelize } = require("sequelize");
// On importe le module dotenv pour la gestion des variables d'environnement
const dotenv = require("dotenv");

// Charger les variables d'environnement à partir d'un fichier .env
dotenv.config();

// Création d'une instance Sequelize en utilisant les variables d'environnement individuelles
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false
});

// Test de connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Export de notre client sequelize
module.exports = sequelize;
