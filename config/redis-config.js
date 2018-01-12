var redis = require('redis');
var redisClient = redis.createClient();

redisClient.on('connect', function() {
	console.log('Connected to Redis...');
});

module.exports = redisClient;