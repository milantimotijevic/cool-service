function setup(serverObj){
  var server = serverObj;
  var userService = require('../service/user-service');

  server.get('/users', function (req, res) {
    userService.getAllUsers(function finalizeRequest(result) {
      res.send(200, result);
    });
  });

  server.get('/users/:id', function (req, res) {
    userService.getUser(req.params.id, function finalizeRequest(result) {
      res.send(200, result);
    });
  });
  
  server.post('/users', function (req, res) {
    var userId = req.body.id;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var address = req.body.address;
    userService.registerUser(userId, firstName, lastName, address, function finalizeRequest() {
      res.send(200);
    });
  });

  server.del('/users/:id', function (req, res) {
    userService.deleteUser(req.params.id, function finalizeRequest() {
      res.send(200);
    });
  });
}

module.exports = {
  setup: setup
};