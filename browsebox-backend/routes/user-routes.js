/*
    Routes concerning user actions, such as login in, out, delete, update account, etc.
*/

const express = require('express');
const userControllers = require('../controllers/user-controllers');

const router = express.Router();

// TODO: can change the URL later to match fron end
router.post('/add-user', userControllers.makeUser);
router.post('/delete-user', userControllers.deleteUser);

module.exports = router;