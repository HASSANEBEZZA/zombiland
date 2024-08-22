// On importe le module Sequelize
const { Sequelize } = require("sequelize");
// On importe le module dotenv pour la gestion des variables d'environnement
const dotenv = require("dotenv");

// Charger les variables d'environnement à partir d'un fichier .env
dotenv.config();

// Création d'une instance Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
 
  dialect: "postgres",
  protocol: "postgres",
  logging: false
 
});

// Export de notre client sequelize
module.exports = sequelize;
