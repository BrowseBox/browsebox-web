const express = require('express');
const userRoutes = require('./routes/user-routes')
const saleRoutes = require('./routes/sale-routes')
const cors = require('cors')

const app = express();

// let us use req.body to get form data without parsing
app.use(cors())
app.use(express.json()); 

// use routes
app.use(userRoutes);
app.use(saleRoutes);

app.listen(3001);