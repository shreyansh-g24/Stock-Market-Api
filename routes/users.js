// Handling Routes: User.js //

// importing modules
var express = require('express');
var router = express.Router();

// requiring user controller
let userController = require("./../controllers/userController");
// requiring auth util
let { authenticate } = require("./../utils/auth");

/**
 * Handled Routes:
 *  => /users
 *    => /new : creating new user
 *    => /login : logging in
 *    => /bookmarks/update : adds/updates/removes bookmark
 *    => /bookmarks : returns all bookmarks of the user
 *    => /update/password : updates password
 *    => /delete : deletes user
 */
router.post('/signup', userController.signupUser);
router.post("/login", userController.login);
router.post("/update/password", userController.authenticateJWT, userController.changePassword);
router.post("/delete", userController.authenticateJWT, userController.deleteUser);
router.post("/bookmarks/update", userController.authenticateJWT, userController.parseBookmark, (req, res, next) => {
  req.body.data.isBookmarked ? userController.addBookmark(req, res, next) : userController.removeBookmark(req, res, next);
});
router.get("/bookmarks", userController.authenticateJWT, userController.returnBookmarks);

// exporting router
module.exports = router;
