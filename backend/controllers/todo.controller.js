const Joi = require("joi");
const { Todo } = require("../model/todo");

//create todo
exports.createToDo = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(200).required(),
      author: Joi.string().min(3),
      uid: Joi.string(),
      isComplete: Joi.boolean(),
      date: Joi.date(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, author, isComplete, date, uid } = req.body;

    let todo = new Todo({
      name,
      author,
      isComplete,
      date,
      uid,
    });
    todo = await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

//get todo
exports.getAllToDo = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    const filteredTodos = todos.filter((todo) => todo.uid === req.user._id);
    res.send(filteredTodos);
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

//update todo
exports.updateToDo = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      author: Joi.string().min(3),
      uid: Joi.string(),
      isComplete: Joi.boolean(),
      date: Joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(result.error.details[0].message);

    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send("Todo not found...");

    if (todo.uid !== req.user._id)
      return res.status(401).send("Todo update failed. Not authorized...");

    const { name, author, isComplete, date, uid } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { name, author, isComplete, date, uid },
      { new: true }
    );

    res.send(updatedTodo);
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

//delete todo
exports.deleteToDo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send("Todo not found...");

    if (todo.uid !== req.user._id)
      return res.status(401).send("Todo deletion failed. Not authorized...");

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    res.send(deletedTodo);
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
