// Defining User Model //

// Importing Modules
let mongoose = require("mongoose");

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
});

// Declaring model and instance methods

// requiring model
let UserModel = mongoose.model("User", userSchema);

// exporting model
module.exports = UserModel;
