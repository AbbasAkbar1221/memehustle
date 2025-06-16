import React, { useState } from 'react';
import { DollarSign, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { socket } from '../socket';

export default function BidPanel({ memeId, userId, onBidSuccess }) {
  const [credits, setCredits] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBid = async () => {
    const val = parseInt(credits);
    if (isNaN(val) || val < 0) {
      return; 
    }
    setLoading(true);
    try {
      await api.post('/bids', { meme_id: memeId, user_id: userId, credits: val });
      socket.emit('bidPlaced', { memeId, userId, credits: val });
      setCredits('');
      onBidSuccess();
    } catch (err) {
      console.error(err);
      alert('Error placing bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="number"
          min="0"
          placeholder="Enter bid"
          value={credits}
          onChange={e => setCredits(e.target.value)}
          className="text-black w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
          disabled={loading}
        />
      </div>
      <button
        onClick={handleBid}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none text-sm font-medium min-w-[80px]"
        disabled={loading || !credits}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <DollarSign className="w-4 h-4" />
            Bid
          </>
        )}
      </button>
    </div>
  );
}