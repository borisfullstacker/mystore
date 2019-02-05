const mysql = require('promise-mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'storeDB',
    connectionLimit: 10,


});

let orders= {

allOrdersCount:()=>{
    let sql= `SELECT COUNT(cartid) FROM orders`
    return pool.query(sql)
    .then((res)=>{return (res[0]["COUNT(cartid)"])})
    .catch((err)=>console.log(err));
},

getLastOrderById:(id)=>{
    let sql=`SELECT * FROM orders WHERE customerid=? ORDER BY id DESC LIMIT 1` 
    return pool.query(sql,[id])
    .then((res)=>{
        if (res.length===0) res.push({finalprice:null,purchasedate:null});
        return  res;})
    .catch((err)=>{throw err})
},

addOrder:(order)=>{
    let sql=`INSERT INTO orders SET ?` 
    return pool.query(sql,order)
    .then((res)=> {return  res;})
    .catch((err)=>{throw err})
},

getAllDeliveryDates:()=>{
    let sql=`SELECT (deliverydate) FROM orders` 
    return pool.query(sql)
    .then((res)=>{
        console.log(res);
        return  res;})
    .catch((err)=>{throw err})
},

}




module.exports= orders;