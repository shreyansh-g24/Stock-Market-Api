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

  // checks bookmark for update: whether it's to be removed or added/updated
  parseBookmark: (req, res, next) => {

    // extracting bookmark
    let bookmark = req.body.data.bookmark;

    // parses bookmark data
    req.body.data.bookmark = {
      bookmarkType: bookmark.bookmarkType,
      ticker: bookmark.ticker.toUpperCase(),
      url: bookmark.url,
      bookmarkedPrice: Number(bookmark.bookmarkedPrice),
      bookmarkedDate: bookmark.bookmarkedDate,
    };

    next();

  },

  // removes bookmark
  removeBookmark: function (req, res, next) {
    let bookmark = req.body.data.bookmark;

    let bookmarksArr = null;
    if (bookmark.bookmarkType === "Crypto-Currency") bookmarksArr = "bookmarks_cc";

    // finding the user by id and removing the selected bookmark
    User.findById(req.auth.user._id, (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(404).json({ success: false, err: "Unable to find user and delete the selected bookmark" });
      else if (user) {
        let targetBookmark = user[bookmarksArr].filter(b => b.ticker === bookmark.ticker);
        if (targetBookmark.length === 0) return res.json({ success: false, err: "Unable to the find the bookmark to delete!" });

        User.findByIdAndUpdate({ _id: user._id }, { $pull: { [bookmarksArr]: targetBookmark[0] } }, { new: true, useFindAndModify: false }, (err, updatedUser) => {

          if (err) return next(err);
          if (!updatedUser) return res.status(404).json({ success: false, err: "Unable to delete bookmark", bookmark });
          else if (updatedUser) return res.status(200).json({ success: true, bookmark });
        });

      }
    });
  },

  // returns bookmarks
  returnBookmarks: function (req, res, next) {

    User.findById(req.auth.user._id, (err, user) => {
      if(err) return next(err);
      if(!user) return res.status(404).json({success: false, err: "Unable to find the user!"});
      else if(user) return res.status(200).json({success: true, bookmarks_cc: user.bookmarks_cc});
    });

  },

  // adds bookmark or updates if already existing
  addBookmark: function (req, res, next) {

    let bookmark = req.body.data.bookmark;

    let bookmarksArr = null;
    if (bookmark.bookmarkType === "Crypto-Currency") bookmarksArr = "bookmarks_cc";

    User.findById(req.auth.user._id, (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(404).json({ success: false, err: "Unable to update bookmark", bookmark });
      else if (user) {

        // checking if the bookmark for the target unit already exists
        if (user[bookmarksArr].filter(b => b.ticker === bookmark.ticker).length !== 0) {

          // updates the selected unit 
          User.update({ _id: req.auth.user._id, [bookmarksArr + ".ticker"]: bookmark.ticker }, { $set: { [bookmarksArr + ".$"]: bookmark } }, { new: true, useFindAndModify: false }, (err, status) => {

            if (err) return next(err);
            if (!status.ok) return res.status(404).json({ success: false, err: "Unable to update bookmark", bookmark });
            else if (status.ok) return res.status(200).json({ success: true, bookmark });
          });
        }

        else {
          // updating the target bookmarks array: adds a new bookmark
          User.findByIdAndUpdate({ _id: req.auth.user._id }, { $push: { [bookmarksArr]: bookmark } }, { new: true, useFindAndModify: false }, (err, updatedUser) => {
            if (err) return next(err);
            if (!updatedUser) return res.status(404).json({ success: false, err: "Unable to update bookmark", bookmark });
            else if (updatedUser) return res.status(200).json({ success: true, bookmark });
          });

        }

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
