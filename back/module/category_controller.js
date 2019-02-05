mysql= require ('promise-mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'storeDB',
    connectionLimit: 10,

});

let category={
    getCategoryList:()=>{
         let sql=`SELECT * FROM category`
         return pool.query(sql)
         .then((res)=>{return res})
         .catch((err)=>{throw (err)})
    }

}


module.exports=category;