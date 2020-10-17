const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

router.use(async (req, res, next) => {
  if (req.signedCookies.token && await jwt.verify(req.signedCookies.token, process.env.SECRET_KEY)) {
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
      return res.render("cms/login", { error: "Tài khoản không tồn tại!!", isLogin: false });
    }

    const compare = await bcrypt.compare(password, checkUser.password);
    if (!compare) {
      return res.render("cms/login", { error: "Mật khẩu không trùng khớp!!", isLogin: false });
    }

    const token = await jwt.sign(
      { uid: checkUser._id },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, {
      httpOnly: true,
      signed: true,
      secure: false,
    });

    res.render("cms/dashboard", { error: '', isLogin: true });
  } catch (error) {
    res.render("cms/login", { error: "Có lỗi xảy ra!!", isLogin: false });
  }
});

module.exports = router;
