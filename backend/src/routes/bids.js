const express = require('express');
const router = express.Router();
const supabase = require('../db/supabaseClient');

router.post('/', async (req, res) => {
  const { meme_id, user_id, credits } = req.body;
  if (!meme_id || !user_id || credits == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (credits < 0) return res.status(400).json({ error: 'Invalid bid' });
  const { data, error } = await supabase
    .from('bids')
    .insert([{ meme_id, user_id, credits }])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:meme_id', async (req, res) => {
  const { meme_id } = req.params;
  const { data, error } = await supabase
    .from('bids')
    .select('*')
    .eq('meme_id', meme_id)
    .order('credits', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
