// Importation des types de données (DataTypes) nécessaires depuis Sequelize
const { DataTypes } = require('sequelize');

// Importation de l'instance Sequelize configurée pour interagir avec la base de données
const sequelize = require('../config/database.js');

// Définition du modèle "User" en utilisant Sequelize
// Ce modèle représente la table "users" dans la base de données
const User = sequelize.define('User', {
  // Définition de la colonne "username"
  username: {
    type: DataTypes.STRING,  // Le type de données est une chaîne de caractères (VARCHAR)
    allowNull: false,        // Cette colonne ne peut pas être nulle (obligatoire)
    unique: true,            // Les valeurs de cette colonne doivent être uniques dans la table (pas de doublons)
  },
  // Définition de la colonne "email"
  email: {
    type: DataTypes.STRING,  // Le type de données est une chaîne de caractères (VARCHAR)
    allowNull: false,        // Cette colonne ne peut pas être nulle (obligatoire)
    unique: true,            // Les valeurs de cette colonne doivent être uniques dans la table (pas de doublons)
  },
  // Définition de la colonne "password"
  password: {
    type: DataTypes.STRING,  // Le type de données est une chaîne de caractères (VARCHAR)
    allowNull: false,        // Cette colonne ne peut pas être nulle (obligatoire)
  },
  // Définition de la colonne "confirmationToken" pour stocker le jeton de confirmation d'inscription
  confirmationToken: {
    type: DataTypes.STRING,  // Le type de données est une chaîne de caractères (VARCHAR)
    allowNull: true,         // Cette colonne peut être nulle (optionnelle)
  },
  // Définition de la colonne "confirmed" pour indiquer si l'utilisateur a confirmé son email
  confirmed: {
    type: DataTypes.BOOLEAN, // Le type de données est un booléen (true/false)
    defaultValue: false,     // Par défaut, l'utilisateur n'est pas confirmé
  },
  // Définition de la colonne "resetToken" pour stocker un jeton de réinitialisation de mot de passe
  resetToken: {
    type: DataTypes.STRING,  // Le type de données est une chaîne de caractères (VARCHAR)
    allowNull: true,         // Cette colonne peut être nulle (optionnelle)
  },
  // Définition de la colonne "resetTokenExpiration" pour stocker l'expiration du jeton de réinitialisation
  resetTokenExpiration: {
    type: DataTypes.DATE,    // Le type de données est une date (timestamp)
    allowNull: true,         // Cette colonne peut être nulle (optionnelle)
  },
  // Définition de la colonne "createdAt" pour stocker la date de création de l'enregistrement
  createdAt: {
    type: DataTypes.DATE,    // Le type de données est une date (timestamp)
    defaultValue: DataTypes.NOW, // Par défaut, la valeur sera la date et l'heure actuelles au moment de l'insertion
  },
}, {
  // Configuration supplémentaire du modèle
  tableName: 'users',        // Nom de la table dans la base de données (par défaut Sequelize utilise le pluriel)
  timestamps: false,         // Désactive la gestion automatique des colonnes "createdAt" et "updatedAt" par Sequelize
});

// Exportation du modèle "User" pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = User;
