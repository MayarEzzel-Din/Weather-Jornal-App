// Setup empty JS object to act as endpoint for all routes
projectData = {};
const PORT = 5500;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/addWeatherData', (req, res) => {
    projectData.Temprature = req.body.Temprature;
    projectData.Date = req.body.Date;
    projectData.Feeling = req.body.Feeling;
    res.json(projectData);
});

app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));