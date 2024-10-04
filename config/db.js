const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL database:', err);
        return;
    }
    console.log('Connected to the MySQL database successfully!');
});

module.exports = db;