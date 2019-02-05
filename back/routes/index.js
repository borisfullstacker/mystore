var express = require('express');
var router = express.Router();
var ordersController = require ("../module/orders_controller")
var productController = require ("../module/product_controller")



router.get('/',async function(req, res, next) {
  let obj={}
  obj.orderscount= await ordersController.allOrdersCount();
  obj.productcount= await productController.allProductsCount();
  res.json(obj);
});

module.exports = router;
