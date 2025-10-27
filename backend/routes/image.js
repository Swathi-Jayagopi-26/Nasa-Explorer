const express = require('express');
const router = express.Router();
const axios = require('axios');
const cache = require('../utils/cache');

const NASA_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

// GET /api/image?term=curiosity&page=1
router.get('/', async (req, res) => {
  try {
    const { term , page } = req.query;
    const cacheKey = `image:${term}:${page}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(term)}&media_type=image&page=${page}`;
    const response = await axios.get(url, { timeout: 10000 });
    cache.set(cacheKey, response.data, 60 * 60);
    res.json(response.data);
  } catch (err) {
    console.error(err.msg || err);
    res.status(502).json({ error: 'Failed to fetch requested images' });
  }
});

module.exports = router;
