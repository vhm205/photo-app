require("dotenv").config();
require("./config/db");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const routes = require("./routes");
const cmsRoute = require("./routes/cms");
const authRoute = require("./routes/auth");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.set("view engine", "ejs");

app.use("/", routes);
app.use("/auth", authRoute);
app.use("/cms", cmsRoute);

const PORT = process.env.PORT || 1002;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
