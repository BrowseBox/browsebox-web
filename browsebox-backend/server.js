const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// let us use req.body to get form data without parsing
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);