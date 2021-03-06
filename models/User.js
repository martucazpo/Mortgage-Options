const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  profile: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profile"
    }
  ],
  property: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property"
    }
  ]
});
module.exports = User = mongoose.model("users", UserSchema);