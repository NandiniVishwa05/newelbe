const mysql = require("mysql2");
const dotenv = require("dotenv")
dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth: true,
    port: process.env.DB_PORT
})
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(process.env.DB_USER);
        
        console.log("Db Connected Successfully");
    }
})

module.exports = db;