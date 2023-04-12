/*
    Routes concerning actions such as favoriting an item, deleting a favorite or showing favorites
*/

const express = require('express');
const favoriteControllers = require('../controllers/favorite-controller');

const router = express.Router();

//add-favorite probably wrong,
router.post('/add-favorite', favoriteControllers.favoriteItem);