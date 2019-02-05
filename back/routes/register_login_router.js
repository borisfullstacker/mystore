var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var userController= require ('../module/users_controller')
var service= require ('../services/store_service')
var cartController= require('../module/cart_controller')

router.post('/login', async function (req, res, next) { 
let id=req.body.id
let password=req.body.password 

try{
    await userController.getUser(id).then(async (user)=>{ 
    if (user.length===0) throw 1;  //breaks  scope 

    let match=await bcrypt.compare(password, user[0].password)
    if (!match) throw 1  //breaks  scope

    let result = await service.getInitialUserData(id,user) // returns an object containing current user information and cart status     
             
    //session
    req.session.user=user;
    //
    res.json({res:result})
          
    })
} 
catch(err){
      if (err===1){
        res.json({err:"I.D or Password are incorrect"})
      }else{
        res.json({err:"Something went wrong please try again"})
      }
}
});

//user id validation
router.post('/validateid', async function (req, res, next) { 
   await userController.getUser(req.body.id).then((user)=>{   
        if (user.length!==0){
            res.json({res:"I.D is already in use"})
        }else{
            res.json({res:'ok'})
        }    
    })
});


//sends user data 
router.get('/userdata', async function(req,res,next){
if (req.session.user) {
    let id= req.session.user[0].id
    let user= req.session.user
    let result = await service.getInitialUserData(id,user)
    res.json({res:result})
} else {
    res.json({user:'notlogged'});
}

});


//auth validation
router.get('/authguard', async function(req, res){
    if (req.session.user){
        res.json({res:true})
    }else{
        res.json({res:false})

    }
});


// registiration
router.post('/register', async function(req,res,next){
 try{ 
    await userController.addUser(req.body)
    .then(()=>{res.json({res:"ok"});})
 }
 catch(err){
    switch(err.sqlState){
         case ("22001"):
           res.json({err:"I.D is too long"})
           break;
         case ("23000"):
           res.json({err:"I.D is already in use"})
           break;

      }
    }
});


router.get('/logout', function (req, res) {
    req.session.destroy((err)=> {
      if(err) console.log(err);
        res.json({logout:true});
    })
  });

      // function name(obj){
    //     console.log(obj);
    //     var {name, lastname}= obj
    //
  





module.exports = router;
