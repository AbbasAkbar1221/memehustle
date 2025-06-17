import React, { useState } from 'react';
import { Sparkles, Heart, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function AIButtons({ tags }) {
  const [caption, setCaption] = useState(null);
  const [vibe, setVibe] = useState(null);
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [loadingVibe, setLoadingVibe] = useState(false);

  const fetchCaption = async () => {
    if (loadingCaption) return;
    setLoadingCaption(true);
    try {
      const res = await api.post('/ai/caption', { tags });
      setCaption(res.data.data.caption);
    } catch (err) {
      console.error(err);
      alert('Error fetching caption');
    } finally {
      setLoadingCaption(false);
    }
  };

  const fetchVibe = async () => {
    if (loadingVibe) return;
    setLoadingVibe(true);
    try {
      const res = await api.post('/ai/vibe', { tags });
      setVibe(res.data.data.vibe);
    } catch (err) {
      console.error(err);
      alert('Error fetching vibe');
    } finally {
      setLoadingVibe(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={fetchCaption}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none text-sm font-medium"
          disabled={loadingCaption}
        >
          {loadingCaption ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Caption
        </button>
        <button
          onClick={fetchVibe}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none text-sm font-medium"
          disabled={loadingVibe}
        >
          {loadingVibe ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart className="w-4 h-4" />
          )}
          Vibe
        </button>
      </div>
      
      {caption && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 animate-fade-in">
          <p className="text-sm text-purple-800 italic font-medium">"{caption}"</p>
        </div>
      )}
      
      {vibe && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3 animate-fade-in">
          <p className="text-sm text-orange-800">
            <span className="font-semibold">Vibe:</span> {vibe}
          </p>
        </div>
      )}
    </div>
  );
}