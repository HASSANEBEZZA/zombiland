const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charger les variables d'environnement

// Créer une instance de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432, // Utiliser le port 5432 par défaut si non spécifié
  dialect: 'postgres', // Utiliser PostgreSQL
  logging: false // Désactiver les logs SQL dans la console
});

// Fonction pour tester la connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate(); // Vérifier la connexion
    console.log('Connexion à la base de données PostgreSQL réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
    process.exit(1); // Quitter le processus en cas d'erreur de connexion
  }
};

// Tester la connexion au démarrage
testConnection();

// Exporter Sequelize pour utilisation dans d'autres modules
module.exports = sequelize;
