var redisClient = require('../config/redis-config');

function getUser(id, callback) {
		redisClient.hgetall("user:" + id , function(err, obj) {
		callback(obj);
	});
}

function getAllUsers(callback){
	redisClient.smembers("users", function(err, usernames) {
		fetchAllUsers(usernames, callback);
	});
}

function fetchAllUsers(usernames, callbackParam){
	var users = [];
	if(usernames.length < 1) {
      callbackParam("NOTHING TO SHOW");
	}
	for(var i = 0; i < usernames.length; i++) {
		var callback;
		if(i === usernames.length - 1) {
          callback = callbackParam;
		}
		extractUser(users, usernames[i], callback);
	}
}

function extractUser(users, username, callback){
	redisClient.hgetall(username, function(err, obj) {
		obj.id = username.replace('user:', '');
		users.push(obj);
		if(callback){
			callback(users);
		}
	});
}

function registerUser(userId, firstName, lastName, address, callback){
	userId = "user:" + userId;
	redisClient.hmset(userId, ["firstname", firstName, "lastname", lastName, "address", address]);
	redisClient.sadd("users", userId);
	callback();
}

function deleteUser(id, callback) {
	id = "user:" + id;
	redisClient.del(id);
	redisClient.srem("users", id);
	callback();
}

module.exports = {
	getUser: getUser,
	getAllUsers: getAllUsers,
	registerUser: registerUser,
	deleteUser: deleteUser
}


