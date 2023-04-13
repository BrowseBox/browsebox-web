/*
    Routes concerning actions such as favoriting an item, deleting a favorite or showing favorites
*/

const express = require('express');
const favoriteControllers = require('../controllers/favorites-controller');

const router = express.Router();

//add-favorite probably wrong,
router.post('/add-favorite', favoriteControllers.favoriteItem);
router.post('/remove-favorite', favoriteControllers.deleteFavorite);
router.post('/get-favorites', favoriteControllers.getFavorites);

module.exports = router;