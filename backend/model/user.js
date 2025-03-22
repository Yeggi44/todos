const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("dotenv").config();

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
});

const User = mongoose.model("User", userSchema);

exports.User = User;