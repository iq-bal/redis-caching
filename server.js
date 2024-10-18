const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis");

// Initialize Redis client
const redisClient = Redis.createClient();

redisClient.connect();

const DEFAULT_EXPIRATION = 3600;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/photos", async (req, res) => {
  try {
    const albumId = req.query.albumId;
    const cachedPhotos = await redisClient.get(`photos?albumId=${albumId}`);
    if (cachedPhotos) {
      console.log("Cache hit");
      return res.json(JSON.parse(cachedPhotos));
    } else {
      console.log("Cache miss");
      // Fetch photos from API
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        { params: { albumId } }
        //   If albumId is undefined or not provided, the URL will simply be: https://jsonplaceholder.typicode.com/photos
        // No ?albumId=... will be appended to the URL.
      );

      // Store data in Redis with expiration
      await redisClient.setEx(
        `photos?albumId=${albumId}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(data)
      );
      res.json(data);
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/photos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cachedPhotos = await redisClient.get(`photos/${id}`);
    if (cachedPhotos) {
      console.log("cache hit");
      return res.json(JSON.parse(cachedPhotos));
    } else {
      console.log("cache miss");
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
      );
      // Store data in Redis with expiration
      await redisClient.setEx(
        `photos/${id}`,
        DEFAULT_EXPIRATION,
        JSON.stringify(data)
      );
      res.json(data);
    }
  } catch (error) {
    console.error("Error fetching photo by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
