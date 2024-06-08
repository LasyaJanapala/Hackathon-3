// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const path = require('path');
// const db = require('./database'); // Ensure this path is correct

// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// // File upload setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const upload = multer({ storage: storage });

// // Routes
// app.get('/', (req, res) => {
//     res.render('form');
// });

// app.post('/submit', upload.fields([{ name: 'prescriptions', maxCount: 1 }, { name: 'medical_report', maxCount: 1 }, { name: 'additional_documents', maxCount: 1 }]), (req, res) => {
//     const { consultation_date, hospital_name, doctor_name, doctor_specialisation, next_consultation_date } = req.body;
//     const prescriptions = req.files['prescriptions'][0].path;
//     const medical_report = req.files['medical_report'][0].path;
//     const additional_documents = req.files['additional_documents'] ? req.files['additional_documents'][0].path : null;

//     const sql = 'INSERT INTO consultation_records (consultation_date, hospital_name, doctor_name, doctor_specialisation, prescriptions, medical_report, next_consultation_date, additional_documents) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//     const values = [consultation_date, hospital_name, doctor_name, doctor_specialisation, prescriptions, medical_report, next_consultation_date, additional_documents];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error inserting data:', err.stack);
//             res.send('Error submitting form.');
//             return;
//         }
//         res.send('Form submitted successfully!');
//     });
// });

// // Start server
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });


//code2

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const app = express();

// Set up the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'HACK#15@LOCK',
    database: 'medical_consultation'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// File upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Serve the form
app.get('/', (req, res) => {
    res.render('form');
});

// Handle form submission
app.post('/submit', upload.fields([
    { name: 'prescriptions', maxCount: 1 },
    { name: 'medical_report', maxCount: 1 },
    { name: 'additional_documents', maxCount: 1 }
]), (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    const { consultation_date, hospital_name, doctor_name, doctor_specialisation, next_consultation_date } = req.body;
    const prescriptions = req.files['prescriptions'] ? req.files['prescriptions'][0].path : null;
    const medical_report = req.files['medical_report'] ? req.files['medical_report'][0].path : null;
    const additional_documents = req.files['additional_documents'] ? req.files['additional_documents'][0].path : null;

    const sql = 'INSERT INTO consultation_records (consultation_date, hospital_name, doctor_name, doctor_specialisation, prescriptions, medical_report, next_consultation_date, additional_documents) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [consultation_date, hospital_name, doctor_name, doctor_specialisation, prescriptions, medical_report, next_consultation_date, additional_documents];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.stack);
            res.send('Error submitting form.');
            return;
        }
        res.send('Form submitted successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
