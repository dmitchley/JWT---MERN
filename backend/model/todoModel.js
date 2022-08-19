const mongoose = require("mongoose");
/* 

  The userSchema is used to define the structure of the user document in the database. I also changed the todoSchema to use the ObjectId type and 
  the ref property to reference the user model so the user id can be used to find all the todos for a specific user.

*/
const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Title: String,
    // add user token to the todo
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TODO", todoSchema);
