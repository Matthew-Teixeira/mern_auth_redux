const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");
const generateToken = require("../../utils/generateToken");

const getUsers = asyncHandler(async (req, res) => {});

// @desc    Auth user/set token
// rout     POST /api/user/auth
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// rout     POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout a user
// rout     POST /api/user/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

// @desc    Get a user
// rout     GET /api/use/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
});

// @desc    Logout a user
// rout     PUT /api/use/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-__v");

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User could not be found");
  }
});

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
