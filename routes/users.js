// Handling Routes: User.js //

// importing modules
var express = require('express');
var router = express.Router();

// requiring user controller
let userController = require("./../controllers/userController");

/**
 * Handled Routes:
 *  => /users
 *    => /new : creating new user
 *    => /login : logging in
 */
router.post('/new', userController.signupUser);
router.post("/login", userController.login);

// exporting router
module.exports = router;
