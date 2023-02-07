const express = require('express');
const userRoutes = require('./routes/user-routes')
const cors = require('cors')

const app = express();

// let us use req.body to get form data without parsing
app.use(cors())
app.use(express.json()); 

// use routes
app.use(userRoutes);

app.listen(3001);