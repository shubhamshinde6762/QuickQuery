const user = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      res.status(400).json({
        error: "Fill All Details ",
      });
      return;
    }

    if (await user.findOne({ email })) {
      res.status(400).json({
        error: "400-EMAIL",
      });
      return;
    }

    let hashpw;

    try {
      hashpw = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(500).json({
        error: "error in Hashing",
      });
    }

    const response = await user.create({
      email,
      password: hashpw,
    });
    console.log(email, password, hashpw);

    const payload = {
      email: email,
    };

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
  } catch (err) {
    res.status(400).json({
      error: "Unknown Error",
    });
  }
};

module.exports = signIn;
