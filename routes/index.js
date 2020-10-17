const router = require("express").Router();
const PhotoModel = require("../models/photo.model");
const cloudinary = require("cloudinary").v2;

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
  cloudinary.search
    .expression('folder:photos/newborn')
    .sort_by('public_id','desc')
    .max_results(50)
    .execute().then(result => {
      const photos = result.resources.map(img => ({
        image: img.secure_url,
        status: img.status,
        name: img.filename,
        format: img.format,
        type: img.resource_type,
        createdAt: `${new Date(img.created_at).getMonth()}/${new Date(img.created_at).getFullYear()}`
      }));
      res.render("photos", { results: photos, type: 'NEW BORN', error: "" });
    });
});

router.get("/photos-baby", async (_, res) => {
  cloudinary.search
    .expression('folder:photos/baby')
    .sort_by('public_id','desc')
    .max_results(50)
    .execute().then(result => {
      const photos = result.resources.map(img => ({
        image: img.secure_url,
        status: img.status,
        name: img.filename,
        format: img.format,
        type: img.resource_type,
        createdAt: `${new Date(img.created_at).getMonth()}/${new Date(img.created_at).getFullYear()}`
      }));
      res.render("photos", { results: photos, type: 'BABY', error: "" });
    });
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
