const mysql = require('promise-mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'storeDB',
    connectionLimit: 10,

});

let items= {
// get products id's by cart id. 
productItemsById:(id)=>{
    let sql=`SELECT productid FROM cartitem WHERE cartid=?` 
    return pool.query(sql,[id])
    .then((res)=>{return res;})
    .catch((err)=>{throw err})
},

addProduct:(data)=>{
    obj={
        cartid: data.cartid,
        productid: data.productid,
        quantity: data.quantity,
        price: data.price
    }
    let sql=`INSERT INTO cartitem SET ?` 
    return pool.query(sql,obj)
    .then((res)=>{return res;})
    .catch((err)=>{throw err})
},

updateProduct:(data)=>{

    obj=[{
        quantity: data.quantity,
        price: data.price
    },data.cartid,data.productid
   ]
   console.log(obj);

    let sql=`UPDATE cartitem SET ? WHERE cartid=? AND productid=?` 
    return pool.query(sql,obj)
    .then((res)=>{return res;})
    .catch((err)=>{throw err})
},

deleteProductById:(obj)=>{
    console.log(obj.cartid , obj.productid)
    let item= [obj.cartid , obj.productid]
    let sql=`DELETE FROM cartitem WHERE cartid=? AND productid=?`
    return pool.query(sql,item)
    .then((res)=>{return res})
    .catch((err)=>{throw err});
},

deleteAllProductsByCartId:(id)=>{
    let sql=`DELETE FROM cartitem WHERE cartid=?`
    return pool.query(sql,[id])
    .then((res)=>{return res})
    .catch((err)=>{throw err});

}



}




module.exports= items;