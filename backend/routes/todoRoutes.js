const express = require("express");
const router = express.Router();

const {
  getToDo,
  addToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/todoController");
const { protect } = require("../middleware/authMiddleware");

// defining the routes for get and post requests and using the controllers to handle the requests

router.route("/").get(protect, getToDo).post(protect, addToDo);

// defining the routes for put and delete requests and using the controllers to handle the requests
// the id is passed as a parameter in the url

router.route("/:id").put(protect, updateToDo).delete(protect, deleteToDo);

module.exports = router;
