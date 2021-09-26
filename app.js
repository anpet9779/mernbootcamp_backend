require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

// const bodyParser = require("body-parser");  // This one is deprecated since express version 4.16.0 so now instead of body parser simply express.json can be used
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route Declaration
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connection established");
  })
  .catch(console.log("Connection failed"));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes); 

// Port
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
