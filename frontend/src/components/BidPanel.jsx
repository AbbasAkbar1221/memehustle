import React, { useState } from 'react';
import { api } from '../services/api';
import { socket } from '../socket';

export default function BidPanel({ memeId, userId, onBidSuccess }) {
  const [credits, setCredits] = useState('');

  const handleBid = async () => {
    const val = parseInt(credits);
    if (isNaN(val) || val < 0) return alert('Invalid bid');
    try {
      await api.post('/bids', { meme_id: memeId, user_id: userId, credits: val });
      socket.emit('bidPlaced', { memeId, userId, credits: val });
      setCredits('');
      onBidSuccess();
    } catch (err) {
      console.error(err);
      alert('Error placing bid');
    }
  };

  return (
    <div className="mt-2 flex space-x-2">
      <input
        type="number"
        min="0"
        placeholder="Bid"
        value={credits}
        onChange={e => setCredits(e.target.value)}
        className="p-1 bg-gray-800 border border-gray-600 rounded w-16"
      />
      <button onClick={handleBid} className="px-2 bg-neonPink rounded hover:brightness-125">Bid</button>
    </div>
  );
}
