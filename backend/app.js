const http = require("http");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

// Importing API routes
const apiRoutes = require("./routes/api");

// MongoDB connection
const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://hiral:pandya@cluster0.kbaskpj.mongodb.net/modernart";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const handleRequest = async (req, res) => {
  // Enabling CORS
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Using API routes
  if (req.url.startsWith("/api/artworks")) {
    await apiRoutes(req, res);
  } else {
    // Serve the frontend application
    const publicPath = path.join(__dirname, "public");

    let filePath;
    if (req.url === "/") {
      filePath = path.join(publicPath, "index.html");
    } else {
      filePath = path.join(publicPath, req.url);
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".jpg": "image/jpeg",
      ".png": "image/png",
    };
    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          res.writeHead(404);
          res.end("404 Not Found");
        } else {
          res.writeHead(500);
          res.end(`Error: ${error.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
};


const server = http.createServer(handleRequest);

// Error handling
server.on("error", (err) => {
  console.error(err.stack);
});

// Starting the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
