/*
    Routes concerning sales actions, add an item, delete an item.
*/

const express = require('express');
const saleControllers = require('../controllers/sale-controllers');

const router = express.Router();

router.post('/sale', saleControllers.getSaleById);
router.post('/add-sale', saleControllers.makeSale);
router.post('/delete-sale', saleControllers.deleteSale);
router.post('/get-sales', saleControllers.searchUserSale);
router.post('/search-sale', saleControllers.searchSale);
router.post('/update-sale', saleControllers.updateSale);
router.post('/get-sale-date', saleControllers.getSaleByDate);
router.post('/get-sale-price', saleControllers.getSaleByCheapest);
router.post('/get-sale-filter', saleControllers.getSaleByFilters);

router.post('/get-filters', saleControllers.getFilters);
router.post('/set-filters', saleControllers.setFilters);
router.post('/remove-filters', saleControllers.removeFilters);

module.exports = router;