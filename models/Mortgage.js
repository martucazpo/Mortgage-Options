var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var MortgageSchema = new Schema({
  // `title` is required and of type String
  insurance: {
    type: Number
  },
  // `link` is required and of type String
  loanAmount: {
    type: Number
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  principalAndInteres: {
    type: Number
  },
  tax: {
    type: Number
  },
  termMonths: {
    type: Number
  },
  total: 
    {
      type: Number
    
    }
  
});

// This creates our model from the above schema, using mongoose's model method
var Mortgage = mongoose.model("Mortgage", MortgageSchema);

// Export the Article model
module.exports = Mortgage;
