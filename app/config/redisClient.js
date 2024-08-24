const Redis = require('redis');
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';
const redisPassword = process.env.REDIS_PASSWORD || '';

let redisUrl = `redis://`;

if (redisPassword) {
  redisUrl += `:${redisPassword}@`;
}

redisUrl += `${redisHost}:${redisPort}`;

const redisClient = Redis.createClient({
  url: redisUrl,
  socket: {
    tls: true, // Active l'utilisation de TLS
    rejectUnauthorized: false // Pour les tests; mettre à true en production avec des certificats valides
  }
});

redisClient.on('error', (err) => console.error('Erreur de connexion Redis :', err));
redisClient.connect().catch(console.error);
