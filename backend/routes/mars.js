const express = require('express');
const router = express.Router();
const axios = require('axios');
const cache = require('../utils/cache');

const NASA_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

// GET /api/mars/rover?rover=curiosity&sol=1000&camera=fhaz
router.get('/rover', async (req, res) => {
  try {
    const { rover = 'curiosity', sol = 1000, camera } = req.query;
    const cacheKey = `mars:${rover}:${sol}:${camera || 'all'}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const cameraParam = camera ? `&camera=${camera}` : '';
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_KEY}`;
    const response = await axios.get(url, { timeout: 10000 });
    cache.set(cacheKey, response.data, 60 * 60);
    res.json(response.data);
  } catch (err) {
    console.error(err.msg || err);
    res.status(502).json({ error: 'Failed to fetch Mars rover photos' });
  }
});

module.exports = router;
