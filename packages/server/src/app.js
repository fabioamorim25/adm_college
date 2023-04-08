const express = require ('express');
const app = express();





require('./app/routes/index')(app);




module.exports = app;