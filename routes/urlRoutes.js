const express = require("express");
const { generateShortURL, getOriginalURL } = require("../controllers/urlController")

const router = express.Router();

router.post("/", generateShortURL);

router.get("/:shortID", getOriginalURL);

module.exports = router;