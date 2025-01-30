const mysql = require("mysql2/promise");
const express = require("express");
const path = require("path");
const app = express();
const dotenv = require('dotenv').config();

// connection 
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "pbl_data",
    password: process.env.SQL_PASS,
    waitForConnections: true,
    queueLimit: 0,
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Initial data to insert 
const initialData = [
    ['DWLR001', 'Yamuna Bridge', 'Mathura', 'Uttar Pradesh', 'Yamuna', 27.4924, 77.6737, 320.00, 300.00, 'ACTIVE', 'WARNING'],
    ['DWLR002', 'Howrah Bridge', 'Kolkata', 'West Bengal', 'Hooghly', 22.5865, 88.3467, 450.00, 400.00, 'ACTIVE', 'CRITICAL'],
    ['DWLR003', 'Godavari Barrage', 'Rajahmundry', 'Andhra Pradesh', 'Godavari', 17.0043, 81.7798, 220.00, 300.00, 'FAULTY', 'NORMAL'],
    ['DWLR004', 'Mahanadi Dam', 'Cuttack', 'Odisha', 'Mahanadi', 20.5016, 85.8668, 260.00, 250.00, 'ACTIVE', 'WARNING'],
    ['DWLR005', 'Periyar Dam', 'Idukki', 'Kerala', 'Periyar', 9.5300, 77.1701, 150.00, 250.00, 'ACTIVE', 'NORMAL'],
    ['DWLR006', 'Sundarbans Barrage', 'Sunderban', 'West Bengal', 'Sundarbans', 21.8503, 88.3745, 180.00, 220.00, 'ACTIVE', 'WARNING'],
    ['DWLR007', 'Narmada Canal', 'Ankleshwar', 'Gujarat', 'Narmada', 21.6212, 73.0147, 280.00, 270.00, 'ACTIVE', 'NORMAL'],
    ['DWLR008', 'Krishna Barrage', 'Nalgonda', 'Telangana', 'Krishna', 17.0380, 79.2436, 340.00, 320.00, 'ACTIVE', 'WARNING'],
    ['DWLR009', 'Teesta Dam', 'Kolkata', 'West Bengal', 'Teesta', 26.1185, 88.6307, 390.00, 375.00, 'ACTIVE', 'CRITICAL'],
    ['DWLR010', 'Mahi River Bridge', 'Vadodara', 'Gujarat', 'Mahi', 22.2907, 73.1747, 260.00, 250.00, 'ACTIVE', 'NORMAL'],
    ['DWLR011', 'Saraswati River', 'Haryana', 'Haryana', 'Saraswati', 29.0583, 75.7741, 180.00, 160.00, 'ACTIVE', 'WARNING'],
    ['DWLR012', 'Mekong Bridge', 'Mekong', 'Sikkim', 'Mekong', 27.2353, 88.6246, 210.00, 200.00, 'ACTIVE', 'NORMAL'],
    ['DWLR013', 'Ganges Barrage', 'Kanpur', 'Uttar Pradesh', 'Ganges', 26.4475, 80.3307, 400.00, 390.00, 'ACTIVE', 'CRITICAL'],
    ['DWLR014', 'Ravi River', 'Chandigarh', 'Punjab', 'Ravi', 30.7355, 76.7794, 150.00, 140.00, 'ACTIVE', 'NORMAL'],
    ['DWLR015', 'Saraswati Dam', 'Haridwar', 'Uttarakhand', 'Saraswati', 29.9057, 78.1647, 200.00, 180.00, 'FAULTY', 'NORMAL'],
    ['DWLR016', 'Ganga Barrage', 'Varanasi', 'Uttar Pradesh', 'Ganges', 25.3408, 83.0107, 330.00, 300.00, 'ACTIVE', 'WARNING'],
    ['DWLR017', 'Yamuna Canal', 'Faridabad', 'Haryana', 'Yamuna', 28.4313, 77.3160, 290.00, 280.00, 'ACTIVE', 'NORMAL'],
    ['DWLR018', 'Tungabhadra Dam', 'Hospet', 'Karnataka', 'Tungabhadra', 15.2789, 76.4009, 350.00, 340.00, 'ACTIVE', 'CRITICAL'],
    ['DWLR019', 'Brahmaputra River', 'Guwahati', 'Assam', 'Brahmaputra', 26.1445, 91.7362, 210.00, 200.00, 'ACTIVE', 'WARNING'],
    ['DWLR020', 'Indus River', 'Lahore', 'Punjab', 'Indus', 24.8607, 67.0011, 180.00, 170.00, 'ACTIVE', 'NORMAL']
];

const query = `INSERT INTO gwl 
        (device_id, location_name, district, state, river_name, latitude, longitude, water_level, normal_range, device_status, alert_level) 
        VALUES ?
    `;


// this is the first data insertion function
const insertInitialData = async () => {
    try {
        await pool.query(query, [initialData]);
        console.log("Initial data inserted into water_level_analysis table");
    } catch (err) {
        console.error("Error inserting data:", err.message);
    }
};


app.get("/", async (req, res) => {
    try {
        const [devices] = await pool.query("SELECT * FROM gwl");
        console.log(devices);
        res.render("home.ejs", { devices });
    } catch (err) {
        console.error("Error retrieving data:", err.message);
        res.status(500).send("Error retrieving data.");
    }
});

app.listen(8080, async () => {
    console.log("Listening on port 8080");
    // uncomment this to insert data again but delete the previous data first form the SQL database
    // await insertInitialData();
});

