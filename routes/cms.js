const router = require("express").Router();
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const PhotoModel = require("../models/photo.model");
const configCloudinary = require("../config/upload");

configCloudinary();

router.use(async (req, res, next) => {
  if (
    !req.signedCookies.token ||
    !(await jwt.verify(req.signedCookies.token, process.env.SECRET_KEY))
  ) {
    return res.redirect("/auth/login");
  }

  next();
});

router.get("/dashboard", (_, res) => {
  res.render("cms/dashboard", { error: "", isLogin: true });
});

router.post("/add-photo", async (req, res) => {
  const { title, type, image } = req.body;
  cloudinary.uploader.upload(
    image,
    { overwrite: true, folder: `photos/${type}` },
    async (err, result) => {
      if (err) return res.status(400).json(err);

      try {
        await PhotoModel.create({
          title,
          type,
          image: result.secure_url,
        });

        return res.status(200).json({ msg: "Thêm thành công" });
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  );
});

router.get("/logout", async (req, res) => {
  if (
    req.signedCookies.token &&
    (await jwt.verify(req.signedCookies.token, process.env.SECRET_KEY))
  ) {
    res.clearCookie("token");
    return res.redirect("login");
  }

  return res.redirect("dashboard");
});

module.exports = router;
