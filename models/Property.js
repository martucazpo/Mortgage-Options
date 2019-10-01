var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PropertySchema = new Schema({

  ListPrice: Number,
  TaxAnnualAmount: Number,
  img: String,
  img2: String,
  img3: String
});

// This creates our model from the above schema, using mongoose's model method
var Property = mongoose.model("Property", PropertySchema);

// Export the Note model
module.exports = Property;