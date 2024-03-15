
var mysql = require('mysql2');
var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,

  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "cdrfile",

});
pool.getConnection((err,conn) => {
  if(err) console.log(err)
  console.log("MySQL :::connected")
})

module.exports = pool;
