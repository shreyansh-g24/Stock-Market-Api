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
 *    => /bookmarks/update : adds new bookmark
 */
router.post('/signup', userController.signupUser);
router.post("/login", userController.login);
router.post("/bookmarks/update", userController.authenticateJWT, userController.parseBookmark, (req, res, next) => {
  req.body.data.isBookmarked ? userController.addBookmark(req, res, next) : userController.removeBookmark(req, res, next);
});

// exporting router
module.exports = router;
