const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "secretshh";
const expiration = "2h";

module.exports = {
  // function for authenticated routes
  authMiddleware: function (req, res, next) {
    // send token via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: "You have no token!" });
    }

    // verify token and retrieve user data
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }

    // send to next endpoint
    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
