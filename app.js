const express = require("express");
const path = require("path");
const router = require("./routes/route.js");
const Authrouter = require("./routes/auth.js");
const connectDB = require("./db/connect.js");
const authenticateUser = require("./middleware/authentication.js");
const notFound = require("./middleware/not-found.js");
require("dotenv").config();
const app = express();
const port = 3000;
//MiddleWare

app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); //parse request body data.

//router
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/notes", authenticateUser, router);

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Login", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Register", "register.html"));
});
app.get("/Notebook", authenticateUser, (req, res) => {
  console.log("dashboard exicuted..!");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening at port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
