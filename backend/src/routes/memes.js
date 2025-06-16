const express = require('express');
const router = express.Router();
const supabase = require('../db/supabaseClient');

// Create meme: expects { title, image_url, tags: [] , owner_id }
router.post('/', async (req, res) => {
  const { title, image_url, tags, owner_id } = req.body;
  if (!title || !image_url || !owner_id) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const { data, error } = await supabase
    .from('memes')
    .insert([{ title, image_url, tags, owner_id }])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get all memes
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('memes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get single meme by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('memes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return res.status(404).json({ error: 'Meme not found' });
  res.json(data);
});

module.exports = router;
