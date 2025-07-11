const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

conn.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
        return;
    }
    // console.log('Database connected successfully');
});

module.exports = conn;
