const express = require('express');
const bodyParser = require('body-parser');

// Import datasets
const { case1Data, case2Data, case3Data, initialData } = require("./model/data.js");

const app = express();
app.use(bodyParser.json());

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

let currentDataset = case1Data; // Default dataset

app.get('/alerts', (req, res) => {
    const anomalies = detectAnomalies(currentDataset);

    if (anomalies.length > 0) {
        res.status(200).json({
            message: 'Anomalies detected!',
            anomalies,
        });
        console.log(anomalies);
    } else {
        res.status(200).json({
            message: 'No anomalies detected.',
        });
    }
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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
