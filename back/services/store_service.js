
var ordersController= require ('../module/orders_controller')
var cartController= require ('../module/cart_controller')


module.exports={

getInitialUserData:async(id,user)=>{

// returns an object containing current user information and cart status
try{
    let  lastorder=  await ordersController.getLastOrderById(id)
    let  opencart=   await cartController.getCartByUserId(id)
    let  receipt=    await cartController.getReceiptByCartId(opencart[0].id)
    let  price=      await cartController.getCartTotalPrice(opencart[0].id)

   
    let userdetails={
        id:user[0].id,
        name:user[0].name,
        lastname:user[0].lastname,
        address:{city:user[0].city, street:user[0].street},
        lastorder:{finalprice:lastorder[0].finalprice, purchasedate:lastorder[0].purchasedate},
    }



    let cartdetails={
        id:opencart[0].id,
        active:opencart[0].active,
        dateopened:opencart[0].cartdate,
        receipt:receipt,
        totalprice:price,
    }
           


    return {admin:user[0].admin ,userdetails, cartdetails};          
}
catch(err){
    console.log(err)
}


}
}


