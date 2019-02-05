var express = require('express');
var router = express.Router();
var schema= require ('../model/sqlSchema')




router.get('/create',async function(req, res, next) {

    try{
      await schema.createDB().then(()=>{console.log("storedb created");})
      await schema.users().then(()=>{console.log("users table created")})
      await schema.category().then(()=>{console.log("category table creted")})
      await schema.product().then(()=>{console.log("product table created")})
      await schema.cart().then(()=>{console.log("cart table created")})
      await schema.cartItem().then(()=>{console.log("cart item table created")})
      await schema.order().then(()=>{console.log("orders table created")})
      await schema.endConnection().then(()=>{res.send("done");console.log("done!\nhappy coding")});
    }
    
    catch(err){
        console.log("in catch ",err);
         schema.endConnection();
    }
    });
    

 module.exports = router;