const { login, register } = require("../controllers/auth");
const express = require("express");
const Authrouter = express.Router();

Authrouter.route("/login").post(login);
Authrouter.route("/register").post(register);

module.exports = Authrouter;
