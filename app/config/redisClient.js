const Redis = require('redis');

// Récupérer les informations de connexion à Redis depuis les variables d'environnement
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;

// Créer l'URL de connexion à Redis (sans TLS)
let redisUrl = `redis://${redisHost}:${redisPort}`;
if (redisPassword) {
  redisUrl = `redis://:${redisPassword}@${redisHost}:${redisPort}`;
}

// Créer le client Redis sans TLS
const redisClient = Redis.createClient({
  url: redisUrl,
});

// Gérer les erreurs de connexion Redis
redisClient.on('error', (err) => console.error('Erreur de connexion Redis :', err));

// Connecter le client Redis
redisClient.connect().catch(console.error);

module.exports = redisClient;
