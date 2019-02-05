const mysql = require('promise-mysql');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'storeDB',
    connectionLimit: 10,


});



let users= {
addUser: async (obj)=>{
   let hashed= await bcrypt.hash(obj.password, saltRounds)
   var user=  {id:obj.id,name:obj.name ,lastname:obj.lastname ,email:obj.email ,password:hashed, city:obj.city, street:obj.street}
   let sql= `INSERT INTO users SET  ?`
        return pool.query(sql,[user])
        .then((result)=>{return (result);})
        .catch(err=>{throw (err)});
},

getUser: (id)=>{
    let sql = `SELECT * FROM users WHERE BINARY id=?`
      return pool.query(sql,[id])
      .then((res)=>{return res;})
      .catch(err =>{throw (err)})
}


}




module.exports= users;