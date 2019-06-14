// User controller

// importing modules
let User = require("./../models/User");

// exporting functions
module.exports = {

  // authenticates jwt
  authenticateJWT: function (req, res, next) {
    let token = req.header("x-auth");

    User.findByToken(token)
      .then(user => {
        if (user) req.auth = { success: true, user };
        else if (!user) req.auth = { success: false, err: "Unable to find a user with a matching ID" };
        next();
      })
      .catch(err => {
        res.json({ success: false, err });
      });
  },

  // adds bookmark
  addBookmark: function (req, res, next) {
    let bookmark = req.body;
    let bookmarksArr = null;
    if (bookmark.bookmarkType === "Crypto-Currency") bookmarksArr = "bookmarks_cc";

    User.findById(req.auth.user._id, (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(404).json({ success: false, err: "Unable to update bookmark", bookmark });
      else if (user) {
        let bookmarks = null;

        // checking if the bookmark for the target unit already exists
        if (user[bookmarksArr].filter(b => b.bookmarkType === bookmark.bookmarkType).length !== 0) {
          bookmarks = user[bookmarksArr].map(b => b.ticker === bookmark.ticker ? bookmark : b);
        }
        else {
          bookmarks = user[bookmarksArr];
          bookmarks.push(bookmark);
        }

        // updating the target bookmarks array
        User.findByIdAndUpdate({ _id: req.auth.user._id }, { [bookmarksArr]: bookmarks }, { new: true }, (err, updatedUser) => {
          if (err) return next(err);
          if (!user) return res.status(404).json({ success: false, err: "Unable to update bookmark", bookmark });
          else if (user) return res.status(200).json({ success: true, bookmark });
        });
      }
    });
  },

  // signs up new user
  signupUser: function (req, res, next) {
    let userInfo = req.body;
    // checking if email is already registered
    User.find({ email: userInfo.email }, (err, userEmail) => {
      if (err) return next(err);
      if (userEmail.length !== 0) return res.json({ success: false, err: "Email is already registered!", user: userEmail[0] });

      // checking if the username is already registered
      User.find({ username: userInfo.username }, (err, userUsername) => {
        if (err) return next(err);
        if (userUsername.length !== 0) return res.json({ success: false, err: "Username is already registered!", user: userUsername[0] });
        // creating new user
        User.create(userInfo, (err, userNew) => {
          if (err) return next(err);
          return res.json({ success: true, user: userNew });
        });
      });
    });
  },

  // logs user in
  login: function (req, res, next) {
    let userLogin = req.body;
    User.find({ username: userLogin.username }, (err, user) => {

      // Handling errors
      if (err) return next(err);
      if (user.length === 0) return res.json({ success: false, err: "Username not matched" });
      if (user[0].password !== userLogin.password) return res.json({ success: false, err: "Password Incorrect" });
      if (user[0].password === userLogin.password) {
        let token = user[0].generateAuthToken();
        return res.json({ success: true, token, user: user[0] });
      };
    });
  },

};
