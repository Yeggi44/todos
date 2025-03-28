const express = require("express");
const cors = require("cors");
const todo = require("./routes/todo");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");
const { connectLocalDB } = require("./config/db.config");

const app = express();
app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json());

//routes
app.use("/api/tasks", todo);
app.use("/api/register", signUp);
app.use("/api/login", signIn);

app.get("/", function (req, res) {
  res.send("Welcome!");
});

//mongoDB connection
connectLocalDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
