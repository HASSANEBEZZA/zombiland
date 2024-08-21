// app/config/redisClient.js
const redis = require('redis');
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
