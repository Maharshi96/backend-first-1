var mysql = require('mysql');

//Database connection
var mysqlConnectionObject = mysql.createConnection({
    host : 'mydb.c9gvhf7gjlib.us-east-2.rds.amazonaws.com',
    user : 'root',
    password : 'root12345',
    database : 'asn',
    multipleStatements : 'true',
})

mysqlConnectionObject.connect((err)=>{
    if(err){
        throw err;
        // console.log("not connected")
    }
    else{
        console.log("connected")
    }
})

module.exports = mysqlConnectionObject;