const router = require("express").Router();
const {
  getSingleUser,
  registerUser,
  loginUser,
} = require("../../controllers/userController");

// import authentication middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

// token required to view user dashboard
router.route("/me").get(authMiddleware, getSingleUser);

module.exports = router;
