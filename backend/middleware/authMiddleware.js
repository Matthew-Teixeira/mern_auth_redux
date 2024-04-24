const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../db/models");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Set token to name of cookie ('jwt')
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password -__v");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
