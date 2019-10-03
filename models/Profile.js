var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String
  },
  // `link` is required and of type String
  email: {
    type: String
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  downPayment: {
    type: Number
  },
  desiredPayment: {
    type: Number
  },
  property: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Profile = mongoose.model("Profile", ProfileSchema);

// Export the Article model
module.exports = Profile;
