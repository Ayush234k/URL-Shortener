const { URL} = require("../models/urlModels");
const shortid = require("shortid");

async function generateShortURL(req, res) {
    const body = req.body;
    
    if(!body.url) {
        return res.status(400).json({
            error : "URL is required"
        })
    }

    const generateShortId = shortid();
    await URL.create({
        shortID : generateShortId,
        redirectUrl : body.url,
        visitHistory : [],
    });

    return res.json({
        id : generateShortId,
    })
}

async function getOriginalURL(req, res) {
    const shortId = req.params.shortID;
    const date = new Date(Date.now());
    const formattedDate = date.toLocaleDateString("en-GB");
    const entry = await URL.findOneAndUpdate(
        { shortID: shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: formattedDate,
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectUrl);
}

async function getAnalytics(req, res) {
    const data = await URL.findOne({ shortID: req.params.shortID })
    return res.json({
        totalVisits : data.visitHistory.length,
        analytics : data.visitHistory
    });
}

module.exports = {
    generateShortURL,
    getOriginalURL,
    getAnalytics
}