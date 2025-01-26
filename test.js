const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// const initialData = [
//     ['DWLR001', 'Yamuna Bridge', 'Mathura', 'Uttar Pradesh', 'Yamuna', 27.4924, 77.6737, 400.00, 300.00, 'ACTIVE', 'WARNING'],
//     ['DWLR002', 'Howrah Bridge', 'Kolkata', 'West Bengal', 'Hooghly', 22.5865, 88.3467, 450.00, 400.00, 'ACTIVE', 'CRITICAL'],
//     ['DWLR003', 'Godavari Barrage', 'Rajahmundry', 'Andhra Pradesh', 'Godavari', 17.0043, 81.7798, 220.00, 300.00, 'FAULTY', 'NORMAL'],
//     ['DWLR004', 'Mahanadi Dam', 'Cuttack', 'Odisha', 'Mahanadi', 20.5016, 85.8668, 260.00, 250.00, 'ACTIVE', 'WARNING'],
//     ['DWLR005', 'Periyar Dam', 'Idukki', 'Kerala', 'Periyar', 9.5300, 77.1701, 150.00, 250.00, 'ACTIVE', 'NORMAL'],
//     ['DWLR006', 'Sundarbans Barrage', 'Sunderban', 'West Bengal', 'Sundarbans', 21.8503, 88.3745, 180.00, 220.00, 'ACTIVE', 'WARNING'],
//     ['DWLR007', 'Narmada Canal', 'Ankleshwar', 'Gujarat', 'Narmada', 21.6212, 73.0147, 280.00, 270.00, 'ACTIVE', 'NORMAL'],
//     ['DWLR008', 'Krishna Barrage', 'Nalgonda', 'Telangana', 'Krishna', 17.0380, 79.2436, 340.00, 320.00, 'ACTIVE', 'WARNING'],
//     ['DWLR009', 'Teesta Dam', 'Kolkata', 'West Bengal', 'Teesta', 26.1185, 88.6307, 390.00, 375.00, 'ACTIVE', 'CRITICAL'],
//     ['DWLR010', 'Mahi River Bridge', 'Vadodara', 'Gujarat', 'Mahi', 22.2907, 73.1747, 260.00, 250.00, 'ACTIVE', 'NORMAL'],
//     ['DWLR011', 'Saraswati River', 'Haryana', 'Haryana', 'Saraswati', 29.0583, 75.7741, 180.00, 160.00, 'ACTIVE', 'WARNING'],
//     ['DWLR012', 'Mekong Bridge', 'Mekong', 'Sikkim', 'Mekong', 27.2353, 88.6246, 210.00, 200.00, 'ACTIVE', 'NORMAL'],
//     ['DWLR013', 'Ganges Barrage', 'Kanpur', 'Uttar Pradesh', 'Ganges', 26.4475, 80.3307, 400.00, 390.00, 'ACTIVE', 'CRITICAL'],
//     ['DWLR014', 'Ravi River', 'Chandigarh', 'Punjab', 'Ravi', 30.7355, 76.7794, 150.00, 140.00, 'ACTIVE', 'NORMAL'],
//     ['DWLR015', 'Saraswati Dam', 'Haridwar', 'Uttarakhand', 'Saraswati', 29.9057, 78.1647, 200.00, 180.00, 'FAULTY', 'NORMAL'],
//     ['DWLR016', 'Ganga Barrage', 'Varanasi', 'Uttar Pradesh', 'Ganges', 25.3408, 83.0107, 330.00, 300.00, 'ACTIVE', 'WARNING'],
//     ['DWLR017', 'Yamuna Canal', 'Faridabad', 'Haryana', 'Yamuna', 28.4313, 77.3160, 290.00, 280.00, 'ACTIVE', 'NORMAL'],
//     ['DWLR018', 'Tungabhadra Dam', 'Hospet', 'Karnataka', 'Tungabhadra', 15.2789, 76.4009, 350.00, 340.00, 'ACTIVE', 'CRITICAL'],
//     ['DWLR019', 'Brahmaputra River', 'Guwahati', 'Assam', 'Brahmaputra', 26.1445, 91.7362, 210.00, 200.00, 'ACTIVE', 'WARNING'],
//     ['DWLR020', 'Indus River', 'Lahore', 'Punjab', 'Indus', 24.8607, 67.0011, 180.00, 170.00, 'ACTIVE', 'NORMAL']
// ];

const case1Data = [
    ['DWLR001', 'Yamuna Bridge', 'Mathura', 'Uttar Pradesh', 'Yamuna', 27.4924, 77.6737, 420.00, 300.00, 'ACTIVE', 'CRITICAL'], // Water level exceeds the threshold
    ['DWLR002', 'Howrah Bridge', 'Kolkata', 'West Bengal', 'Hooghly', 22.5865, 88.3467, 480.00, 400.00, 'ACTIVE', 'CRITICAL'], // Severe water level rise
    ['DWLR003', 'Godavari Barrage', 'Rajahmundry', 'Andhra Pradesh', 'Godavari', 17.0043, 81.7798, 220.00, 300.00, 'FAULTY', 'NORMAL'] // Faulty but no change in water level
];
const case2Data = [
    ['DWLR004', 'Mahanadi Dam', 'Cuttack', 'Odisha', 'Mahanadi', 20.5016, 85.8668, 250.00, 250.00, 'ACTIVE', 'NORMAL'], // Warning cleared, normalized water level
    ['DWLR005', 'Periyar Dam', 'Idukki', 'Kerala', 'Periyar', 9.5300, 77.1701, 140.00, 250.00, 'ACTIVE', 'NORMAL'], // Water level dropped below threshold
    ['DWLR006', 'Sundarbans Barrage', 'Sunderban', 'West Bengal', 'Sundarbans', 21.8503, 88.3745, 200.00, 220.00, 'ACTIVE', 'NORMAL'] // Warning status cleared
];
const case3Data = [
    ['DWLR007', 'Narmada Canal', 'Ankleshwar', 'Gujarat', 'Narmada', 21.6212, 73.0147, 300.00, 270.00, 'FAULTY', 'CRITICAL'], // Faulty sensor with critical water level
    ['DWLR008', 'Krishna Barrage', 'Nalgonda', 'Telangana', 'Krishna', 17.0380, 79.2436, 340.00, 320.00, 'FAULTY', 'WARNING'], // Faulty with high water level
    ['DWLR009', 'Teesta Dam', 'Kolkata', 'West Bengal', 'Teesta', 26.1185, 88.6307, 390.00, 375.00, 'FAULTY', 'CRITICAL'] // Faulty with critical warning
];

function detectAnomalies(data) {
    const anomalies = [];
    data.forEach(row => {
        const [id, name, location, state, river, lat, lng, currentLevel,threshold ,status, alert] = row;

        if ( currentLevel > threshold ) {
            anomalies.push({
                id,
                name,
                location,
                state,
                river,
                threshold,
                currentLevel,
                alert,
                message: currentLevel > threshold
                    ? 'Current level exceeds threshold!'
                    : 'Critical alert detected!',
            });
        }
    });
    return anomalies;
}

app.get('/alerts', (req, res) => {
    // const anomalies = detectAnomalies(initialData);
    // const anomalies = detectAnomalies(case1Data);
    // const anomalies = detectAnomalies(case2Data);
    const anomalies = detectAnomalies(case3Data);

    if (anomalies.length > 0) {
        res.status(200).json({
            message: 'Anomalies detected!',
            anomalies,
        });
    } else {
        res.status(200).json({
            message: 'No anomalies detected.',
        });
    }
});

// Start the server in your CLI using node --watch test.js
const PORT = 3000;
app.listen(PORT, () => {
    // access the output in http://localhost:3000/alerts
    console.log(`Server running at http://localhost:${PORT}`);
});
