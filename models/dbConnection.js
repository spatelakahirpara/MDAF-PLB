var mysql= require('mysql');
var util= require('util');

const db= mysql.createConnection({
    host:'database-toolchain.cwpq9ofvce1h.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'adminadmin',
    database: 'toolchain_db',
    port:3306
});
db.connect((err)=>{
    if(err){throw err;}
    console.log('connected to the database');
});
db.query= util.promisify(db.query);
module.exports = db;  