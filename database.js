// database.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'HACK#15@LOCK', // your MySQL password
    database: 'medical_consultation'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
