var express = require('express');
var router = express.Router();
var categoryController= require ('../module/category_controller')
var productController = require ('../module/product_controller')
var cartController = require ('../module/cart_controller')
var cartItemController= require ('../module/cart_item_controller')
var usersController= require('../module/users_controller')
var ordersController= require('../module/orders_controller')


//get category list
router.get('/store/categories',async function(req, res) {
    try{
       let categorylist= await categoryController.getCategoryList()
        res.json({categorylist})
    }
    catch(err){
        console.log("in catch ",err);
    }
});

//get product list by category id
router.get('/store/categories/:id',async function(req,res){
    try{
        let products= await productController.getProductByCategoryId(req.params.id);
        res.json({products})
    }
    catch(err){
      console.log("in catch ",err);
    }
});
  
// get all products list
router.get('/store/cart', async function(req,res){
    try{
        let products= await productController.getAllProducts();
        res.json({products})
    }
    catch(err){
        console.log("in catch ",err);
    }

});

// get product by name
router.get('/store/:name', async function(req,res){
    try{
        let products= await productController.getProductByName(req.params.name);
        res.json({products})
    }
    catch(err){
    switch(err){
        case(1):
         res.json("");
         break;
         }
      console.log("in catch ",err);

    }
});


//cart


//receipt data
router.get(`/store/receipt/:id`, async function(req, res){
   try{ 
    let  receipt= await cartController.getReceiptByCartId(req.params.id)
    let  price= await cartController.getCartTotalPrice(req.params.id)
    res.json({receipt:receipt,price:price})
    }
    catch(err){
          console.log(err)
    }
});

//open new cart
router.post(`/store/cart`,async function(req,res){
 try{
     let cart = await cartController.getCartByUserId(req.body.customerid)
     if (cart[0].id!==null) throw 1
     let result= await cartController.openNewCart(req.body);  
     console.log(result);
     res.json(result)
 }
 catch(err){
    if (1) {
        console.log("user already has a cart");
        res.json({})
    } 
    console.log(err);
 }
});

//close cart
router.put(`/store/cart/close`,async function(req,res){
    try{
       let result= await cartController.closeCartActivity(req.body.customerid);
       res.json(result);
    }catch(err){
        console.log("in catch", err);
    }
});

//cart items

//adds item to cart by user id and cart id
router.post(`/store/cartitem`,async function(req,res){
    try{
       let result= await cartItemController.addProduct(req.body);
       res.json(result);
    }catch(err){
        console.log("in catch", err);
    }
});

//delete all products from cart
router.delete(`/store/cartitem/:id/all`, async function (req,res){
    try{
        let result= await cartItemController.deleteAllProductsByCartId(req.params.id)
        res.json(result);
    }catch(err){
        console.log("in catch", err);
    }
});

// delete cart item by id
router.delete(`/store/cartitem/:cartid/:productid`, async function (req,res){
   try{
       let result= await cartItemController.deleteProductById(req.params)
       res.json(result);
   }catch(err){
    console.log("in catch", err);
}
 

});

// updates an existing item
router.put(`/store/cartitem/`, async function (req,res){
    console.log(req.body);
   try{
      let result= await cartItemController.updateProduct(req.body);
      res.json(result);
      console.log(result);
   }catch(err){
     console.log(err)
   }
});

//user 

router.post(`/store/user`, async function (req,res){
    console.log(req.body.id)
try{
    let result= await usersController.getUser(req.body.id)
    res.json(result);
}catch(err){

     console.log(err);
 }
});

// add payment to orders.

router.post(`/store/order`, async function (req,res){
try{
    let result= await ordersController.addOrder(req.body)
    let x=await cartController.closeCartActivity(req.body.cartid)
    console.log(x);
    res.json(result);
}catch(err){
    console.log("in catch: ", err)
    res.json({err:"something went wrong please try again"})
}
});




//get all delivery dates from orders table
router.get(`/deliverydates`, async function(req, res){
    try{ 
     let  result= await ordersController.getAllDeliveryDates()
     res.json(result)
     }
     catch(err){
       console.log(err)
     }
 });
 





 module.exports = router;