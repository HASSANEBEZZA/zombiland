const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connexion à MongoDB réussie !');
}).catch((err) => {
  console.error('Impossible de se connecter à MongoDB:', err);
});

module.exports = mongoose;
