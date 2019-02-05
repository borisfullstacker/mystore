var mysql = require('promise-mysql')

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password'
}).then(con=>{connection=con})
  .catch((err)=>{throw (err)});

var db = {
createDB:() => {
            let sql = `CREATE DATABASE IF NOT EXISTS storeDB`
            return connection.query(sql)
            .then(res=>{
                connection.query("USE storeDB")
                return(res);
            }
            ).catch(err=>{
                throw(err);
            });
 
},
users: () => {
        let values=[
        ["12345","Admin","Admin","a","aronson.boris@gmail.com","$2b$10$qS0TB/p5frpi1gaBrU1tPeLat4W7j2wemJb12HLL2ZRjP8CLDM8Pu","kefarsaba","moshe dayan","1"],
        ["123456788","tzippy","aronson","b","tz.boris@gmail.com","$2b$10$qS0TB/p5frpi1gaBrU1tPeLat4W7j2wemJb12HLL2ZRjP8CLDM8Pu","kefar","he dayan","0"],
        ["123456787","piloni","almoni","c","z.x@gmail.com","$2b$10$qS0TB/p5frpi1gaBrU1tPeLat4W7j2wemJb12HLL2ZRjP8CLDM8Pu","saba","moshe day","0"],
        ["123456786","boris","aronson","d","aronson.boris@gmail.com","$2b$10$qS0TB/p5frpi1gaBrU1tPeLat4W7j2wemJb12HLL2ZRjP8CLDM8Pu","ka","moshn","0"],
        ["1234","a","a","d","aronson.boris@gmail.com","$2b$10$qS0TB/p5frpi1gaBrU1tPeLat4W7j2wemJb12HLL2ZRjP8CLDM8Pu","ka","moshn","0"]

    ]
    

        let sql=`CREATE TABLE IF NOT EXISTS users (
            id VARCHAR (15) NOT NULL ,
            name VARCHAR (50) NULL,
            lastname VARCHAR (50) NULL,
            username VARCHAR(50) NULL,
            email VARCHAR (50) NULL,
            password VARCHAR(100) NULL,
            city VARCHAR (50) NULL,
            street VARCHAR (50) NULL,
            admin BOOLEAN NULL default 0,
            PRIMARY KEY (id)
        )`
        return connection.query(sql).then(()=>{ 
            let sql=`INSERT INTO users(id,name,lastname,username,email,password,city,street,admin) VALUES ?`
            connection.query(sql,[values],(err,result)=>{
                if (err) console.log(err) 
                return(result); 
            });         
        })     
        .catch((err)=>{
            throw(err)
        });
 },
category:()=>{
        values=[
        ["Dairy"],["Vegetables and Fruits"],["Meat and Fish"],["Beverages"],["Alcoholic Beverages"]
        ]

        let sql=`CREATE TABLE IF NOT EXISTS category (
            id INT NOT NULL  AUTO_INCREMENT,
            name VARCHAR (50) NULL,
            PRIMARY KEY (id)
        )`
        return  connection.query(sql).then(()=>{
          let sql=`INSERT INTO category(name) VALUES ?`
            connection.query(sql,[values],(err,result)=>{
                if (err) console.log (err);
                return result;
            })
        }).catch((err)=>{
             throw(err)
        });


},
product:()=>{

    values=[
        ["Milk",1 , 4.5,"http://localhost:3000/images/productimages/milk.jpg"],
        ["Red Apple",2 , 2.5,"http://localhost:3000/images/productimages/apple1.jpg"],
        ["Green Apple",2 , 3.5,"http://localhost:3000/images/productimages/apple2.jpg"],
        ["Beef",3 , 24,"http://localhost:3000/images/productimages/beef.jpg"],
        ["Salmon",3 , 32,"http://localhost:3000/images/productimages/salmon.jpg"],
        ["Coke",4 , 3.5,"http://localhost:3000/images/productimages/coke.jpg"],
        ["Water",4 , 2.5,"http://localhost:3000/images/productimages/water.jpg"],
        ["Whiskey",5 , 42,"http://localhost:3000/images/productimages/whiskey.jpg"]
    ];

        let sql=`CREATE TABLE IF NOT EXISTS product(
             id INT NOT NULL AUTO_INCREMENT ,
             name VARCHAR (50) NULL,
             categoryid INT,
             price INT (10) NULL,
             picture VARCHAR (100) NULL,
             PRIMARY KEY (id),
             FOREIGN KEY (categoryid) REFERENCES category(id)
        )`

        return connection.query(sql).then(()=>{
            let sql=`INSERT INTO product(name, categoryid, price, picture) VALUES ?`
            connection.query(sql,[values],(err,result)=>{
                  if (err )console.log(err);
                  return result;
            });
        }).catch((err)=>{ 
           throw(err);
        })
},

cart:()=>{
    values=[
        ["12345","2019/02/20 10:10:00",1],
        ["123456788","2019/03/20 21:00:00",1]
    ];
        
        let sql=`CREATE TABLE IF NOT EXISTS cart (
           id INT NOT NULL AUTO_INCREMENT,
           customerid VARCHAR (15) NOT NULL,
           cartdate DATETIME NULL,
           active BOOLEAN DEFAULT true,
           PRIMARY KEY(id),
           FOREIGN KEY (customerid) REFERENCES users(id)
        )`
        return connection.query(sql).then(()=>{

            let sql=`INSERT INTO cart(customerid,cartdate,active) VALUES ?`
            connection.query(sql,[values],(err,result)=>{
               if (err) console.log(err);
               return result;
            });
        }).catch((err)=>{
            throw(err);
        })
},
cartItem:()=>{
   values=[
       [2,1,4,18],
       [2,2,2,5]
   ]


      let sql=`CREATE TABLE IF NOT EXISTS cartitem(
            id INT NOT NULL AUTO_INCREMENT,
            cartid INT,
            productid INT,
            quantity INT (5) NULL,
            price INT (20) NULL,
            PRIMARY KEY (id),  
            FOREIGN KEY (cartid) REFERENCES cart(id),
            FOREIGN KEY (productid) REFERENCES product(id)

      )`
      return connection.query(sql).then((res)=>{
          let sql=`INSERT INTO cartitem(cartid, productid, quantity, price) VALUES ?`
          connection.query(sql,[values],(err,result)=>{
              if (err) console.log(err)
              return result;
          })
            return(res);
        }).catch((err)=>{
            throw(err);
        })
},
order:()=>{
 values=[
     ["1234",1,23,"kefarsaba","moshe dayan","2019/02/23 10:10:00","2019/02/20 10:10:00","1234"],
     ["1234",2,23,"kefar","he dayan","2019/02/25 08:10:00","2019/03/20 21:00:00","1232"]
 ]
            let sql=`CREATE TABLE IF NOT EXISTS orders(
                id INT NOT NULL AUTO_INCREMENT,
                customerid VARCHAR (15) NULL,
                cartid INT (15) NULL,
                finalprice INT (10) NULL,
                city VARCHAR (50) NULL,
                street VARCHAR (50) NULL,
                deliverydate DATETIME NULL,
                purchasedate DATETIME NULL, 
                card VARCHAR (4) NULL,
                PRIMARY KEY(id)          
            )`        
        return connection.query(sql).then(()=>{
          let sql=`INSERT INTO orders (customerid,cartid,finalprice,city,street,deliverydate,purchasedate,card) VALUES ?`
            connection.query(sql,[values],(err,result)=>{
                    if (err) console.log(err);
                    return result;

            })
        }).catch((err)=>{     
             throw(err);
        })
},
endConnection:()=>{
        return connection.end().catch(err=> {throw err})
}
 
}



module.exports = db