const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Todo = mongoose.model("Todo", todoSchema);
exports.Todo = Todo;
