const cloudinary = require("cloudinary").v2;

const configCloudinary = () => {
  const { CLOUD_NAME, API_SECRET, API_KEY } = process.env;

  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
};

module.exports = configCloudinary;
