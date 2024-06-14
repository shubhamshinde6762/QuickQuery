const user = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await user.findOne({ email });

    if (!response) {
      res.status(401).json({
        error: "401-USER",
      });
      return;
    }

    const payload = {
      email,
    };

    if (await bcrypt.compare(password, response.password)) {
      let token = jwt.sign(payload, "shubham", { expiresIn: "2h" });
      response.token = token;
      response.password = undefined;

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, option).status(200).json({
        sucess: "true",
        data: response,
      });
    } else {
      res.status(401).json({
        error: "401-PASSWORD",
      });
      return;
    }
  } catch (err) {
    res.status(400).json({
      error: "Unknown Error",
    });
  }
};

exports.autoLogin = async (req, res, next) => {
  try {
    const response = await user.findOne({ email: res.user.email });

    if (!response || response.lastUpdated[0] !== res.user.lastUpdated[0]) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    res.status(200).json({
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
