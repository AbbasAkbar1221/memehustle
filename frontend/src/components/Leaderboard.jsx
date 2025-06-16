import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get('/votes/leaderboard');
      setLeaders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl text-center text-neonGreen mb-4">Leaderboard</h1>
      <ol className="list-decimal list-inside">
        {leaders.map((meme) => (
          <li key={meme.id} className="mb-2">
            <div className="flex justify-between">
              <span className="font-semibold">{meme.title}</span>
              <span className="text-neonYellow">{meme.upvotes} upvotes</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
