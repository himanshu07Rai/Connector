const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

const connectDB = require("./DB/db");

// Connect to data base

connectDB();

// init Middleware

app.use(express.json());

const corsOptions = { origin: process.env.URL || "*" };
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.send("API running");
});

// Define routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, console.log(`server started on port ${PORT}`));
