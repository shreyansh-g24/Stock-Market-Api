// Handling Routes: User.js //

// importing modules
var express = require('express');
var router = express.Router();

// requiring user controller
let userController = require("./../controllers/userController");
// requiring auth util
let {authenticate} = require("./../utils/auth");

/**
 * Handled Routes:
 *  => /users
 *    => /new : creating new user
 *    => /login : logging in
 */
router.post('/signup', userController.signupUser);
router.post("/login", userController.login);

// exporting router
module.exports = router;
