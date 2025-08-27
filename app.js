const express = require('express');
const bodyParser = require('body-parser');
const homeRoute = require('./src/routes/home');
const stringinatorRoute = require('./src/routes/stringinator');


const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());


app.use('/', homeRoute);
app.use('/', stringinatorRoute);


// Start server
app.listen(port, () => {
    console.log(`Stringinator service listening at http://localhost:${port}`);
});
