const express = require('express');
const router = express.Router();
const axios = require('axios');
const cache = require('../utils/cache');

const NASA_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

// GET /api/neo?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const cacheKey = `neo:${start_date || 'today'}:${end_date || 'today'}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_KEY}${start_date ? `&start_date=${start_date}` : ''}${end_date ? `&end_date=${end_date}` : ''}`;
    const response = await axios.get(url, { timeout: 10000 });
    cache.set(cacheKey, response.data, 60 * 30);
    res.json(response.data);
  } catch (err) {
    console.error(err.msg || err);
    res.status(502).json({ error: 'Failed to fetch NeoWs data' });
  }
});

module.exports = router;
