var express = require('express');
var router = express.Router();
var productController = require ("../module/product_controller")

//admin

router.post('/admin',async function (req,res){
    
try{   

    let result= await productController.addProduct(req.body)
    res.json(result);
}

catch(err){
    console.log(err)
}


});

router.put('/admin/:id',async function (req,res){
    try{   

        let result= await productController.editProduct(req.body,req.params.id)
        res.json(result);
    }
    catch(err){
        console.log(err)
    }    
});
    


module.exports = router;
