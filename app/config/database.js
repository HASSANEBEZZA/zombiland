const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,           // Nom de la base de données
    process.env.DB_USER,           // Nom d'utilisateur
    process.env.DB_PASSWORD,       // Mot de passe
    {
        host: process.env.DB_HOST, // Hôte de la base de données
        port: process.env.DB_PORT, // Port de la base de données
        dialect: 'postgres',       // Type de base de données
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => {
       
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

module.exports = sequelize;
