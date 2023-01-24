const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes')

const app = express();

// let us use req.body to get form data without parsing
app.use(bodyParser.urlencoded({ extended: false }));

// use routes
app.use(userRoutes);

app.listen(3000);