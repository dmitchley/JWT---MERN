const mongoose = require("mongoose");

/* 
  The userSchema is used to define the structure of the user document in the database. I also changed the todoSchema to use the ObjectId type 
  for the user field so the user id can be used to find all the todos for a specific user.
*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
