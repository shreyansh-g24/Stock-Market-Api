// User controller

// importing modules
let User = require("./../models/User");

// exporting functions
module.exports = {

  // signing up new user
  signupUser: function(req, res, next){
    let userInfo = req.body;
    // checking if email is already registered
    User.find({email: userInfo.email}, (err, userEmail) => {
      if(err) return next(err);
      if(userEmail.length !== 0) return res.json({success: false, err: "Email is already registered!", userEmail});

      // checking if the username is already registered
      User.find({username: userInfo.username}, (err, userUsername) => {
        if(err) return next(err);
        if(userUsername.length !== 0) return res.json({success: false, err: "Username is already registered!", userUsername});
        // creating new user
        User.create(userInfo, (err, userNew) => {
          if(err) return next(err);
          return res.json({success: true, userNew});
        });
      });
    });
  },

  // logging in
  login: function(req, res, next){
    let userLogin = req.body;
    User.find({username: userLogin.username}, (err, user) => {
      if(err) return next(err);
      if(user.length === 0) return res.json({success: false, err: "Username not matched"});
      if(user[0].password === userLogin.password) return res.json({success: true, user});
      else if(user.password !== userLogin.password) return res.json({success: false, err: "Password Incorrect"});
    });
  },

};
