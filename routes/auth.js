const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

router.use(async (req, res, next) => {
  if (
    req.signedCookies.token &&
    (await jwt.verify(req.signedCookies.token, process.env.SECRET_KEY))
  ) {
    return res.redirect("/cms/dashboard");
  }

  next();
});

router.get("/login", (_, res) => {
  res.render("cms/login", { error: "", isLogin: false });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await UserModel.findOne({ username });
    if (!checkUser) {
      return res.render("cms/login", { error: "Tài khoản không tồn tại!!" });
    }

    const compare = await bcrypt.compare(password, checkUser.password);
    if (!compare) {
      return res.render("cms/login", { error: "Mật khẩu không trùng khớp!!" });
    }

    const token = await jwt.sign(
      { uid: checkUser._id },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, {
      maxAge: 1000 * 60 ** 2, // would expire after 60 minutes
      httpOnly: true,
      signed: true,
      secure: false,
    });

    res.redirect("/cms/dashboard");
  } catch (error) {
    return res.render("cms/login", { error: "Có lỗi xảy ra!!" });
  }
});

module.exports = router;
