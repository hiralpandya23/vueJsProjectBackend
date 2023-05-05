const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
  artwork_name: {
    type: String,
    required: true,
    trim: true,
  },
  artist_name: {
    type: String,
    required: true,
    trim: true,
  },
  date_of_creation: {
    type: String,
    required: true,
    trim: true,
  },
  art_style: {
    type: String,
    required: true,
    trim: true,
  },
  dimensions: {
    type: String,
    required: true,
    trim: true,
  },
  significance_history: {
    type: String,
    required: true,
    trim: true,
  },
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);

module.exports = Artwork;
