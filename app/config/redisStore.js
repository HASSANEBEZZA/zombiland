const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redisClient = require('./redisClient');

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'sess:'
});

module.exports = redisStore;
