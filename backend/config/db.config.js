require("dotenv").config();
const mongoose = require("mongoose");

//Local database
exports.connectLocalDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yagneshfall2024:yMMjgJ34szTUHEm3@cluster0.jpjky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todos"
    );
    console.log("Database connected...!");
  } catch (err) {
    console.log(err);
  }
};
