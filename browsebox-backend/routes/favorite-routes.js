/*
    Routes concerning actions such as favoriting an item, deleting a favorite or showing favorites
*/

const express = require('express');
const favoriteControllers = require('../controllers/favorites-controller');

const router = express.Router();

//add-favorite probably wrong,
router.post('/add-favorite', favoriteControllers.favoriteItem);
router.post('/delete-favorite', favoriteControllers.deleteFavorite);

module.exports = router;
