const mysql = require('promise-mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'storeDB',
    connectionLimit: 10,

});

let product= {

allProductsCount:()=>{
  let sql= `SELECT COUNT(id) FROM product`
  return pool.query(sql)
  .then((res)=>{return (res[0]["COUNT(id)"])})
  .catch((err)=>console.log(err));
},

getAllProducts:()=>{
  let sql = `SELECT * FROM product`
  return pool.query(sql)
  .then((res)=>{return res})
  .catch((err)=>{throw err})
},

getProductByName:(name)=>{
  let sql=`SELECT * FROM product WHERE name LIKE '%${name}%'` 
  return pool.query(sql)
  .then((res)=>{return res})
  .catch((err)=>{
    if (err.sqlState=== 4200) throw 1
    throw err})
},

getProductByCategoryId:(id)=>{
  let sql=`SELECT * FROM product WHERE categoryid = ?`
  return pool.query(sql,[id])
  .then((res)=>{return res})
  .catch((err)=>{if (err) throw err})
},


//admun

addProduct:(obj)=>{
  let sql=`INSERT INTO product SET ?`
  return pool.query(sql,obj)
  .then((res)=>{return res})
  .catch((err)=>console.log(err))
},

editProduct:(product,id)=>{

let obj=[product,id]

  let sql=`UPDATE product SET ? WHERE id=?`
  return pool.query(sql,obj)
  .then((res)=>{return res})
  .catch((err)=>{throw (err)})
}
}




module.exports= product;
