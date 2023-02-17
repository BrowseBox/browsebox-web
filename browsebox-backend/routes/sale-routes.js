/*
    Routes concerning sales actions, add an item, delete an item.
*/

const express = require('express');
const saleControllers = require('../controllers/sale-controllers');

const router = express.Router();

// TODO: can change the URL later to match fron end
router.post('/add-sale', saleControllers.makeSale);

module.exports = router;