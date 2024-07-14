const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

// Définition du modèle User
const User = sequelize.define("User", {
  // Champ username pour stocker le nom d'utilisateur
  username: {
    type: DataTypes.STRING, // Type de données : chaîne de caractères
    allowNull: false, // Ne peut pas être null
    unique: true, // Doit être unique dans la table
  },
  // Champ email pour stocker l'adresse e-mail
  email: {
    type: DataTypes.STRING, // Type de données : chaîne de caractères
    allowNull: false, // Ne peut pas être null
    unique: true, // Doit être unique dans la table
  },
  // Champ password pour stocker le mot de passe
  password: {
    type: DataTypes.STRING, // Type de données : chaîne de caractères
    allowNull: false, // Ne peut pas être null
  },
  // Champ created_at pour enregistrer la date et l'heure de création de l'utilisateur
  created_at: {
    type: DataTypes.DATE, // Type de données : date/heure
    defaultValue: DataTypes.NOW, // Valeur par défaut : date et heure actuelles au moment de l'insertion
  },
});

// Export de modèle User
module.exports = User;
