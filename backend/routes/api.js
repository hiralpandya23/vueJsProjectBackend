const Artwork = require("../models/Artwork");
const { parse } = require('url');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf-8');

const handler = async (req, res) => {
  const { pathname } = parse(req.url, true);

  if (req.method === 'GET' && pathname === '/api/artworks') {
    try {
      const artworks = await Artwork.find({});
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(artworks));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: err.message }));
    }
  } else if (req.method === 'POST' && pathname === '/api/artworks') {
    let body = '';
    req.on('data', (data) => {
      body += decoder.write(data);
    });

    req.on('end', async () => {
      body += decoder.end();
      const artwork = new Artwork(JSON.parse(body));
      try {
        const newArtwork = await artwork.save();
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(newArtwork));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: err.message }));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      message: 'Route not found' }));
      }
      };
      
      module.exports = handler;

