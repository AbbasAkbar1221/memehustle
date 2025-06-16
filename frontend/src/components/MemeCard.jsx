import React, { useEffect, useState } from 'react';
import BidPanel from './BidPanel';
import VoteButtons from './VoteButtons';
import AIButtons from './AIButtons';
import { api } from '../services/api';

export default function MemeCard({ meme, userId }) {
  const [highestBid, setHighestBid] = useState(null);

  const fetchHighestBid = async () => {
    try {
      const res = await api.get(`/bids/${meme.id}`);
      if (res.data.length) setHighestBid(res.data[0].credits);
      else setHighestBid(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHighestBid();
  }, [meme]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col">
      <img
        src={meme.image_url}
        alt={meme.title}
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="mt-2 text-lg font-bold text-neonBlue">{meme.title}</h2>
      <div className="flex flex-wrap mt-1">
        {meme.tags.map((tag, idx) => (
          <span key={idx} className="text-xs mr-2 bg-gray-800 px-2 py-1 rounded">#{tag}</span>
        ))}
      </div>
      <div className="mt-2 flex-1">
        {highestBid != null ? (
          <p className="text-sm">Highest Bid: <span className="text-neonGreen">{highestBid}</span></p>
        ) : <p className="text-sm">No bids yet</p>}
      </div>
      <BidPanel memeId={meme.id} userId={userId} onBidSuccess={fetchHighestBid} />
      <VoteButtons memeId={meme.id} />
      <AIButtons tags={meme.tags} />
    </div>
  );
}
