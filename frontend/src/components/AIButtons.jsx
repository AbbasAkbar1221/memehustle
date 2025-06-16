import React, { useState } from 'react';
import { api } from '../services/api';

export default function AIButtons({ tags }) {
  const [caption, setCaption] = useState(null);
  const [vibe, setVibe] = useState(null);

  const fetchCaption = async () => {
    try {
      const res = await api.post('/ai/caption', { tags });
      setCaption(res.data.caption);
    } catch (err) {
      console.error(err);
      alert('Error fetching caption');
    }
  };
  const fetchVibe = async () => {
    try {
      const res = await api.post('/ai/vibe', { tags });
      setVibe(res.data.vibe);
    } catch (err) {
      console.error(err);
      alert('Error fetching vibe');
    }
  };

  return (
    <div className="mt-2">
      <button onClick={fetchCaption} className="px-2 py-1 bg-neonBlue rounded mr-2 hover:brightness-125">Caption</button>
      <button onClick={fetchVibe} className="px-2 py-1 bg-neonYellow rounded hover:brightness-125">Vibe</button>
      {caption && <p className="mt-1 text-sm italic">"{caption}"</p>}
      {vibe && <p className="mt-1 text-sm">Vibe: {vibe}</p>}
    </div>
  );
}
