import React, { useEffect, useState, useContext } from 'react';
import { api } from '../services/api';
import MemeCard from './MemeCard';
import { socket } from '../socket';
import { UserContext } from '../contexts/UserContext';

export default function MemeList() {
  const [memes, setMemes] = useState([]);
  const { userId } = useContext(UserContext);

  const fetchMemes = async () => {
    try {
      const res = await api.get('/memes');
      setMemes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMemes();
    socket.emit('join');
    socket.on('bidUpdate', () => fetchMemes());
    socket.on('voteUpdate', () => fetchMemes());
    return () => {
      socket.off('bidUpdate');
      socket.off('voteUpdate');
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {memes.map(meme => (
        <MemeCard key={meme.id} meme={meme} userId={userId} />
      ))}
    </div>
  );
}
