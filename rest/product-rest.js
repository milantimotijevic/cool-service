function setup(serverObj) {
  var server = serverObj;
  var productService = require('../service/product-service');

  server.get('/products', function(req, res) {
    productService.getAllProducts(function finalizeRequest(result) {
      res.send(200, result);
    })
  });

  server.get('/products/:id', function(req, res) {
    productService.getProduct(req.params.id, function finalizeRequest(result) {
      res.send(200, result);
    });
  });

  server.post('/products', function(req, res) {
    var productId = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    productService.registerProduct(productId, name, description, price, function finalizeRequest() {
      res.send(200);
    });
  });

  server.del('/products/:id', function(req, res) {
    productService.deleteProduct(req.params.id, function finalizeRequest() {
      res.send(200);
    });
  });
}

module.exports = {
  setup: setup
};