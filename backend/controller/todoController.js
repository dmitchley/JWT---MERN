const asyncHandler = require("express-async-handler");

// car model to specify the schema of the car

const TODO = require("../model/todoModel");
const User = require("../model/userModel");

// function to get the car information from the database
const getToDo = asyncHandler(async (req, res) => {
  const todo = await TODO.find({ user: req.user._id });
  res.status(200).json(todo);
});

// function to add a new todo to the database
const addToDo = asyncHandler(async (req, res) => {
  const { Title } = req.body;
  const todo = new TODO({
    Title,
    user: req.user._id,
  });
  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
});

// function to update todo of the user
const updateToDo = asyncHandler(async (req, res) => {
  const { Title } = req.body;
  const todo = await TODO.findById(req.params.id);
  const user = await User.findById(req.user._id);
  // user id is compared with the user id of the todo
  if (todo.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (todo) {
    todo.Title = Title;
    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

// function to delete a todo from the database
const deleteToDo = asyncHandler(async (req, res) => {
  const todo = await TODO.findById(req.params.id);
  const user = await User.findById(req.user._id);
  // user id is compared with the user id of the todo
  if (todo.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (todo) {
    await todo.remove();
    res.status(200).json({ message: "Todo removed" });
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

// export the functions

module.exports = {
  getToDo,
  addToDo,
  updateToDo,
  deleteToDo,
};
