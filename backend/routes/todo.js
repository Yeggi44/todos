const express = require("express");
const router = express.Router();
const {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
} = require("../controllers/todo.controller");
const {auth}=require("../middleware/auth")

router.post("/", auth,createToDo);
router.get("/", auth,getAllToDo);
router.put("/:id", auth,updateToDo);
router.delete("/:id",auth, deleteToDo);

module.exports = router;
