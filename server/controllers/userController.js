const { User } = require("../models");
const { signToken } = require("../utils/auth");

/**
 * Get single user
 * Register single user
 * Login single user
 */

module.exports = {
  // get single user by id or username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user.id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: "Cannot find user with this id" });
    }

    res.json(foundUser);
  },
  // register a user, sign a token, send it back (to client/src/components/RegisterForm.js);
  async registerUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return (
        res
          .status(400)
          // TODO: How to display more accurate error message here?
          .json({ message: "Something went wrong with your registration" })
      );
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // login a user, sign a token, and send back (to client/src/components/LoginForm.js)
  async loginUser({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
};
