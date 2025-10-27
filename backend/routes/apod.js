const express = require('express');
const router = express.Router();
const axios = require('axios');
const cache = require('../utils/cache');
const NASA_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

// GET /api/apod?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const date = req.query.date || '';
    const cacheKey = `apod:${date}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}${date ? `&date=${date}` : ''}`;
    const response = await axios.get(url, { timeout: 8000 });
    cache.set(cacheKey, response.data, 60 * 60);
    res.json(response.data);
  } catch (err) {
    console.error(err.msg || err);
    res.status(502).json({ error: 'Failed to fetch APOD' });
  }
});

module.exports = router;
