const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import datasets
const { case1Data, case2Data, case3Data, initialData } = require("./model/data.js");

const app = express();
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Function to detect anomalies
function detectAnomalies(data) {
    const anomalies = [];
    data.forEach(row => {
        const [id, name, location, state, river, lat, lng, currentLevel, threshold, status, alert] = row;

        if (currentLevel > threshold) {
            anomalies.push({
                id,
                name,
                location,
                state,
                river,
                threshold,
                currentLevel,
                alert,
                message: 'Current level exceeds threshold!',
            });
        }
    });
    return anomalies;
}

app.get('/map', (req, res) => {
    res.render('../Map/mapLibre.ejs', { MAP_API_KEY: process.env.MAP_API_KEY }); 
});

// Default dataset
let currentDataset = case1Data; 

app.get('/alerts', (req, res) => {
    const anomalies = detectAnomalies(currentDataset);
    console.log("MAP_API_KEY:", process.env.MAP_API_KEY);

    res.render('./test.ejs', {
        message: anomalies.length > 0 ? 'Anomalies detected!' : 'No anomalies detected.',
        anomalies,
        currentDataset,
        MAP_API_KEY: process.env.MAP_API_KEY,
    });
});

app.post('/switch-dataset', (req, res) => {
    const { dataset } = req.body;

    switch (dataset) {
        case '1':
            currentDataset = case1Data;
            break;
        case '2':
            currentDataset = case2Data;
            break;
        case '3':
            currentDataset = case3Data;
            break;
        case '4':
            currentDataset = initialData;
            break;
        default:
            return res.status(400).json({
                message: 'Invalid dataset name.',
            });
    }

    res.status(200).json({
        message: `Dataset switched to ${dataset}`,
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});