const Redis = require('redis');
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';
const redisPassword = process.env.REDIS_PASSWORD || '';

// Construire l'URL Redis avec le protocole non-TLS
let redisUrl = `redis://${redisHost}:${redisPort}`;
if (redisPassword) {
  redisUrl = `redis://:${redisPassword}@${redisHost}:${redisPort}`;
}

// Créer le client Redis sans TLS
const redisClient = Redis.createClient({
  url: redisUrl
});

// Gérer les erreurs de connexion Redis
redisClient.on('error', (err) => console.error('Erreur de connexion Redis :', err));

// Connexion à Redis
redisClient.connect().catch(console.error);

module.exports = redisClient;
