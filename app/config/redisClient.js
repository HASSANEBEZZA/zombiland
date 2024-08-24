// app/config/redisClient.js
const Redis = require('redis');
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';
const redisPassword = process.env.REDIS_PASSWORD || '';

// Construire l'URL Redis en fonction des paramètres
let redisUrl = `redis://${redisHost}:${redisPort}`;
if (redisPassword) {
  redisUrl = `redis://:${redisPassword}@${redisHost}:${redisPort}`;
}

// Création du client Redis avec TLS activé
const redisClient = Redis.createClient({
  url: redisUrl,
  socket: {
    tls: true, // Activer TLS pour une connexion sécurisée
    rejectUnauthorized: false // Pour les tests; mettre à true en production avec des certificats valides
  }
});

// Gestion des erreurs de connexion Redis
redisClient.on('error', (err) => console.error('Erreur de connexion Redis :', err));

// Connexion à Redis
redisClient.connect().catch(console.error);

module.exports = redisClient;
