// Defining User Model //

// Importing Modules
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

// Importing config file
const config = require("./../config/config");

// Defining user schema
let userSchema = new mongoose.Schema({

  username: {
    type: String,
    trim: true,
    minlength: 4,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  access: {
    type: String,
    default: "authorized",
  }
});

// specifying user fields to be returned upon any query
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return {username: userObject.username, email: userObject.email, password: userObject.password};
}

// Declaring model and instance methods //
// generating auth token
userSchema.methods.generateAuthToken = function () {
  let user = this;
  let token = jwt.sign({ _id: user._id.toHexString(), access: user.access }, config.SECRET);
  return token;
}

// finding user by token
// token: receives a token
// returns a promise, rejecting if error, user if success 
userSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  // trying to decode the token, returning a promise with rejection if error
  try {
    decoded = jwt.verify(token, config.SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({ _id: decoded._id });
}

// requiring model
let UserModel = mongoose.model("User", userSchema);

// exporting model
module.exports = UserModel;
