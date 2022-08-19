const express = require("express");
const router = express.Router();

// import from the userController
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");
// middleware to protect routes authMiddleware.js
const { protect } = require("../middleware/authMiddleware");

// router post request to register a new user
router.post("/", registerUser);
// router post request to login a user
router.post("/login", loginUser);
// router get request to get user profile
router.get("/me", protect, getMe);

module.exports = router;
