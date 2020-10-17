const router = require("express").Router();
const PhotoModel = require("../models/photo.model");

router.get("/", (_, res) => {
  res.render("index");
});

router.get("/introduction", (_, res) => {
  res.render("introduction");
});

router.get("/price-new-born", (_, res) => {
  res.render("price-new-born");
});

router.get("/price-baby", (_, res) => {
  res.render("price-baby");
});

router.get("/photos-new-born", async (_, res) => {
  try {
    const photos = await PhotoModel.find({ type: "NEWBORN" }).sort({
      createdAt: -1,
    });
    console.log(photos)
    res.render("photos", { results: photos, type: 'NEW BORN', error: "" });
  } catch (error) {
    console.log(error)
    res.render("photos", { results: [], type: '', error });
  }
});

router.get("/photos-baby", async (_, res) => {
  try {
    const photos = await PhotoModel.find({ type: "BABY" }).sort({
      createdAt: -1,
    });
    res.render("photos", { results: photos, type: 'BABY', error: "" });
  } catch (error) {
    res.render("photos", { results: [], type: '', error });
  }
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
