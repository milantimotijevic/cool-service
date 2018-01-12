var restify = require('restify');
var restifyPlugins = restify.plugins;

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(3001, function () {
	console.log("Server is listening...");
});

var userRest = require('./rest/user-rest');
userRest.setup(server);

var productRest = require('./rest/product-rest');
productRest.setup(server);

