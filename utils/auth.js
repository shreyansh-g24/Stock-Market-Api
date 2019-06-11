// Authentication middleware //

// requiring user model
let User = require("./../models/User");

// exporting authentication middleware
module.exports.authenticate = function (req, res, next) {
  let token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (!user) return Promise.reject({ success: false, err: "Unable to authenticate the token!" });

      req.user = user;
      req.token = token;
      next();
    }).catch(e => {
      res.statusCode(401).json({ success: false, err: e });
    });
}
