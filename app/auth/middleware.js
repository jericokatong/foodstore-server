const config = require("../../config");
const { getToken } = require("../utils/get-token");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

const decodeToken = () => {
  return async (req, res, next) => {
    console.log("masuk decode token");
    try {
      let token = getToken(req);
      console.log("ini loh token: ", token);
      if (!token) return next();

      req.user = jwt.verify(token, config.secretKey);

      console.log("ini req user: ", req.user);

      let user = await User.findOne({ token: { $in: [token] } });

      console.log("ini user: ", user);

      if (!user) {
        return res.json({
          error: 1,
          message: "Token expired",
        });
      }
    } catch (error) {
      if (error && error.name === "JsonWebTokenError") {
        return res.json({
          error: 1,
          message: error.message,
        });
      }
    }
    next();
  };
};

module.exports = {
  decodeToken,
};
