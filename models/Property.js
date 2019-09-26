var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PropertySchema = new Schema({

  address: String,
  askingPrice: Number,
  details: String,
  image1: String,
  image2: String,
  image3: String
});

// This creates our model from the above schema, using mongoose's model method
var Property = mongoose.model("Property", PropertySchema);

// Export the Note model
module.exports = Property;