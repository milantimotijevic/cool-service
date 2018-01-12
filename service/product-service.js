var redisClient = require('../config/redis-config');

function getProduct(id, callback) {
  redisClient.hgetall("product:" + id, function(err, obj) {
    callback(obj);
  });
}

function getAllProducts(callback) {
  redisClient.smembers("products", function(err, productNames) {
    fetchAllProducts(productNames, callback);
  });
}

function fetchAllProducts(productNames, callbackParam) {
  var products = [];
  if(productNames.length < 1) {
    callbackParam("NOTHING TO SHOW");
  }
  for(var i = 0; i < productNames.length; i++) {
    var callback;
    if(i === productNames.length - 1) {
      callback = callbackParam;
    }
    extractProduct(products, productNames[i], callback);
  }
}

function extractProduct(products, productName, callback) {
  redisClient.hgetall(productName, function(err, obj) {
    obj.id = productName.replace('product:', '');
    products.push(obj);
    if(callback) {
      callback(products);
    }
  });
}

function registerProduct(productId, name, description, price, callback) {
  productId = "product:" + productId;
  redisClient.hmset(productId, ['name', name, 'description', description, 'price', price]);
  redisClient.sadd("products", productId);
  callback();
}

function deleteProduct(productId, callback) {
  productId = "product:" + productId;
  redisClient.del(productId);
  redisClient.srem("products", productId);
  callback();
}

module.exports = {
  getProduct: getProduct,
  getAllProducts: getAllProducts,
  registerProduct: registerProduct,
  deleteProduct: deleteProduct
};