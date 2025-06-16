import React from 'react';
import { api } from '../services/api';
import { socket } from '../socket';

export default function VoteButtons({ memeId }) {
  const vote = async (delta) => {
    try {
      await api.post('/votes', { meme_id: memeId, delta });
      socket.emit('votePlaced', { memeId, delta });
    } catch (err) {
      console.error(err);
      alert('Error voting');
    }
  };

  return (
    <div className="mt-2 flex space-x-2">
      <button onClick={() => vote(1)} className="px-2 bg-neonGreen rounded hover:brightness-125">Upvote</button>
      <button onClick={() => vote(-1)} className="px-2 bg-neonPink rounded hover:brightness-125">Downvote</button>
    </div>
  );
}
