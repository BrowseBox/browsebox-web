const express = require('express');
const userRoutes = require('./routes/user-routes')
const saleRoutes = require('./routes/sale-routes')
const reviewRoutes = require('./routes/review-routes')
const favoriteRoutes = require('./routes/favorite-routes')
const cors = require('cors')

const app = express();

// let us use req.body to get form data without parsing
app.use(cors())
app.use(express.json());

// use routes
app.use(userRoutes);
app.use(saleRoutes);
app.use(reviewRoutes);
app.use(favoriteRoutes);

app.listen(3001);
