const express = require("express");
const router = express.Router();
const Artwork = require("../models/Artwork");

// Get all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find({});
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new artwork
router.post("/", async (req, res) => {
  const artwork = new Artwork({
    artwork_name: req.body.artwork_name,
    artist_name: req.body.artist_name,
    date_of_creation: req.body.date_of_creation,
    art_style: req.body.art_style,
    dimensions: req.body.dimensions,
    significance_history: req.body.significance_history
  });

  try {
    const newArtwork = await artwork.save();
    res.status(201).json(newArtwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
