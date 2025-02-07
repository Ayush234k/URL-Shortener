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
    const entry = await URL.findOneAndUpdate(
        { shortID: shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
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


module.exports = {
    generateShortURL,
    getOriginalURL,
}