const User = require("../model/userSchema");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("You are not Authorized to access this route");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name }; //user data will be passed to next() id and name passed to next
    req.body.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).send("You are not Authorized to access this route");
  }
};

module.exports = auth;
