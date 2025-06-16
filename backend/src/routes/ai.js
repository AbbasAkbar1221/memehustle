const express = require('express');
const router = express.Router();
const { generateCaption, generateVibe } = require('../services/aiService');

// Generate caption: { tags: [] }
router.post('/caption', async (req, res) => {
  const { tags } = req.body;
  if (!Array.isArray(tags)) return res.status(400).json({ error: 'Invalid tags' });
  const caption = await generateCaption(tags);
  res.json({ caption });
});

// Generate vibe: { tags: [] }
router.post('/vibe', async (req, res) => {
  const { tags } = req.body;
  if (!Array.isArray(tags)) return res.status(400).json({ error: 'Invalid tags' });
  const vibe = await generateVibe(tags);
  res.json({ vibe });
});

module.exports = router;
