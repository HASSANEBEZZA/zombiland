const redis = require('redis');

// Définir les variables Redis à partir des variables d'environnement
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';
const redisPassword = process.env.REDIS_PASSWORD || '';

// Configuration de Redis sans TLS
const redisClient = redis.createClient({
  url: `redis://:${redisPassword}@${redisHost}:${redisPort}`
});

redisClient.on('error', (err) => {
  console.error('Erreur de connexion Redis :', err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Connecté à Redis avec succès');
  } catch (err) {
    console.error('Erreur lors de la connexion à Redis:', err);
  }
})();

module.exports = redisClient;
