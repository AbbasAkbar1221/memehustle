const axios = require('axios');
const cache = require('../utils/cache');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

async function generateCaption(tags) {
  const key = `caption:${tags.sort().join(',')}`;
  const cached = cache.get(key);
  if (cached) return cached;
  if (GEMINI_API_KEY) {
    try {
      // Placeholder: actual Gemini API call depends on API spec
      const response = await axios.post('https://gemini.api.endpoint/generate', {
        prompt: `Generate a witty meme caption based on tags: ${tags.join(', ')}`
      }, {
        headers: { 'Authorization': `Bearer ${GEMINI_API_KEY}` }
      });
      const caption = response.data.caption || fallbackCaption(tags);
      cache.set(key, caption);
      return caption;
    } catch (err) {
      console.error('Gemini caption error:', err.message);
      const cap = fallbackCaption(tags);
      cache.set(key, cap);
      return cap;
    }
  }
  const cap = fallbackCaption(tags);
  cache.set(key, cap);
  return cap;
}

async function generateVibe(tags) {
  const key = `vibe:${tags.sort().join(',')}`;
  const cached = cache.get(key);
  if (cached) return cached;
  if (GEMINI_API_KEY) {
    try {
      const response = await axios.post('https://gemini.api.endpoint/analyze', {
        prompt: `Analyze the vibe of a meme with tags: ${tags.join(', ')}`
      }, {
        headers: { 'Authorization': `Bearer ${GEMINI_API_KEY}` }
      });
      const vibe = response.data.vibe || fallbackVibe(tags);
      cache.set(key, vibe);
      return vibe;
    } catch (err) {
      console.error('Gemini vibe error:', err.message);
      const vb = fallbackVibe(tags);
      cache.set(key, vb);
      return vb;
    }
  }
  const vb = fallbackVibe(tags);
  cache.set(key, vb);
  return vb;
}

function fallbackCaption(tags) {
  const samples = [
    "When the caffeine kicks in but deadlines remain the same.",
    "Mood: I need more coffee and fewer meetings.",
    "That feeling when code works on first run... just kidding.",
    "Debugging: because punching the keyboard is frowned upon."
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}

function fallbackVibe(tags) {
  const samples = ["Neon-noir chaos", "Digital rebellion", "Cyber-lolz", "Hackathon fever"];
  return samples[Math.floor(Math.random() * samples.length)];
}

module.exports = { generateCaption, generateVibe };
