const mysql = require('promise-mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'storeDB',
    connectionLimit: 10,

});

let cart= {

getCartByUserId:(id)=>{

    let sql= `SELECT * FROM cart WHERE customerid=? AND active=1 LIMIT 1`
    return pool.query(sql,[id])
    .then((res)=>{
     if (res.length===0) res.push({id:null});
     return (res)
    }).catch((err)=>{throw (err)});
},


getReceiptByCartId:(id)=>{

    var sql = `SELECT cartitem.productid, product.name, cartitem.quantity, cartitem.price, product.picture FROM cartitem 
               INNER JOIN  product ON cartitem.productid= product.id 
               WHERE cartitem.cartid=? `
               
    return pool.query(sql,[id])
    .then((res)=>{ if( res.length===0) res=null;
        
       return res;
    }).catch((err)=>{throw (err)});
},

getCartTotalPrice:(id)=>{
    let sql= `SELECT SUM(price) FROM cartitem WHERE cartid=?`
    return pool.query(sql,[id])
    .then((res)=>{return (res[0]['SUM(price)'])})
    .catch((err)=>{throw (err)});
},

openNewCart:(data)=>{
    obj={
        cartdate:data.cartdate,
        customerid:data.customerid,
    }

    let sql =`INSERT INTO cart SET ?`
    return pool.query(sql,obj)
    .then((res)=>{return res})
    .catch((err)=>{throw (err)});
},

closeCartActivity:(id)=>{

    obj=[
        {active:0},id
    ]
    
    let sql =`UPDATE cart SET ? WHERE  id = ? AND active=1`
    return pool.query(sql,obj)
    .then((res)=>{return res})
    .catch((err)=>{throw (err)});
},




}


module.exports= cart;