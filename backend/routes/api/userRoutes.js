const router = require("express").Router();
const {
  getUsers,
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../../controllers/user/userAuth");
const protect = require("../../middleware/authMiddleware");

router.get("/all", getUsers);
router.post("/auth", loginUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
