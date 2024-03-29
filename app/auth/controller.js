const User = require("../user/model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");
const { getToken } = require("../utils/get-token");

const register = async (req, res, next) => {
  try {
    const payload = req.body;

    let user = new User(payload);
    await user.save();

    return res.json(user);
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }

    next(error);
  }
};

const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt -cart_items -token"
    );
    if (!user) return done();

    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());

      return done(null, userWithoutPassword);
    }
  } catch (error) {
    done(error, null);
  }

  done();
};

const login = async (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) return next(err);

    if (!user)
      return res.json({
        error: 1,
        message: "email or password incorrect",
      });

    let signed = jwt.sign(user, config.secretKey);

    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { token: signed } },
      { new: true }
    );

    return res.json({
      message: "logged in successfully",
      user: user,
      token: signed,
    });
  })(req, res, next);
};

const me = (req, res, next) => {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `You're not login or token expired`,
    });
  }

  return res.json(req.user);
};

const logout = async (req, res, next) => {
  console.log("masuk sini");
  let token = getToken(req);

  let user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token } },
    { useFindAndModify: false }
  );

  if (!user || !token) {
    return res.json({
      error: 1,
      message: "No user found",
    });
  }

  return res.json({
    error: 0,
    message: "Logout berhasil",
  });
};

module.exports = {
  register,
  localStrategy,
  login,
  me,
  logout,
};
