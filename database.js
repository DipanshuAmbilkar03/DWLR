const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require('path');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'pbl_data',
    password: 'cg06gh6385',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// let q1 = "INSERT INTO demo (station_id, recorded_at, water_level, status, notes) VALUES ?";
// let data1 = [
//     [101, '2025-01-20 08:00:00', 5.2, 'normal', 'Steady water level'],
//     [102, '2025-01-20 08:15:00', 7.8, 'warning', 'Close to critical level'],
//     [103, '2025-01-20 08:30:00', 9.5, 'critical', 'Immediate attention required'],
//     [104, '2025-01-20 08:45:00', 4.5, 'normal', null],
//     [105, '2025-01-20 09:00:00', 6.0, 'warning', 'Rainfall observed in nearby area']
// ];

let q2 = `INSERT INTO water_level_analysis (sl_no, state_ut, number_of_wells_analysed, number_rise_0_2_m, percentage_rise_0_2_m, number_rise_2_4_m, percentage_rise_2_4_m, number_rise_4_m, percentage_rise_4_m, number_fall_0_2_m, percentage_fall_0_2_m, number_fall_2_4_m, percentage_fall_2_4_m, number_fall_4_m, percentage_fall_4_m, number_rise, percentage_rise, number_fall, percentage_fall, number_wells_showing_no_change, percentage_wells_showing_no_change) VALUES ?`;
let data2 = [
    [1, "Andaman and Nicobar", 99, 70, 70.7, 2, 2, 0, 0, 26, 26.3, 0, 0, 0, 0, 72, 72.7, 26, 26.3, 1, 1],
    [2, "Andhra Pradesh", 662, 335, 50.6, 91, 13.7, 65, 9.8, 157, 23.7, 11, 1.7, 3, 0.5, 491, 74.2, 171, 25.8, 0, 0],
    [3, "Arunachal Pradesh", 9, 1, 11.1, 0, 0, 0, 0, 7, 77.8, 1, 11.1, 0, 0, 1, 11.1, 8, 88.9, 0, 0],
    [4, "Assam", 163, 84, 51.5, 2, 1.2, 1, 0.6, 72, 44.2, 2, 1.2, 2, 1.2, 87, 53.4, 76, 46.6, 0, 0],
    [5, "Bihar", 638, 291, 45.6, 19, 3, 4, 0.6, 279, 43.7, 36, 5.6, 9, 1.4, 314, 49.2, 324, 50.8, 0, 0],
    [6, "Chandigarh", 14, 4, 28.6, 1, 7.1, 0, 0, 5, 35.7, 2, 14.3, 2, 14.3, 5, 35.7, 9, 64.3, 0, 0],
    [7, "Chhattisgarh", 757, 386, 51, 86, 11.4, 20, 2.6, 214, 28.3, 36, 4.8, 14, 1.8, 492, 65, 264, 34.9, 1, 0.1],
    [8, "Dadra and Nagar Haveli", 15, 9, 60, 0, 0, 0, 0, 5, 33.3, 1, 6.7, 0, 0, 9, 60, 6, 40, 0, 0],
    [9, "Daman and Diu", 7, 4, 57.1, 0, 0, 0, 0, 3, 42.9, 0, 0, 0, 0, 4, 57.1, 3, 42.9, 0, 0],
    [10, "Delhi", 84, 31, 36.9, 11, 13.1, 18, 21.4, 12, 14.3, 6, 7.1, 6, 7.1, 60, 71.4, 24, 28.6, 0, 0]
];

app.get("/", async (req, res) => {
    try {
        pool.query(q2, [data2], (err) => {
            if (err) throw err;
            console.log("Data inserted into water_level_analysis table");
        });

        pool.query(`SELECT COUNT(*) AS count FROM water_level_analysis`, (err, results) => {
            if (err) throw err;
            res.render("home.ejs", { count: results[0].count });
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred!");
    }
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
