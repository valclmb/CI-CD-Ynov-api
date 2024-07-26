const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthDate: String,
  zipCode: String,
  city: String,
});

module.exports = mongoose.model("User", UserSchema);
