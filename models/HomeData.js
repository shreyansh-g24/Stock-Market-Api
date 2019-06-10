// HOME DATA SCHEMA: HomeData.js //

// Importing Modules
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// Defining a schema for Home data
let homeDataSchema = new Schema({

  data: {
    type: String,
  },

}, {timestamps: true});

// requiring and exporting model
let HomeDataModel = mongoose.model("HomeData", homeDataSchema);
module.exports = HomeDataModel;
