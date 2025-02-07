const express = require("express");
const { generateShortURL, getOriginalURL, getAnalytics } = require("../controllers/urlController")

const router = express.Router();

router.post("/", generateShortURL);

router.get("/:shortID", getOriginalURL);

router.get("/analytics/:shortID", getAnalytics);

module.exports = router;