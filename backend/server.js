const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const app = express();
// see .env file for the MONGO_URI
const port = process.env.PORT || 5000;
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleWare");
// connect db to server
const connectDb = require("./config/db");

connectDb();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// main route

app.use("/api/todo", require("./routes/todoRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// error handler is a middleware that will be executed when an error occurs
app.use(errorHandler);

// listening to port

app.listen(port, () => console.log(`Server is running on port ${port}`));
