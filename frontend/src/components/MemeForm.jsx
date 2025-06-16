import React, { useState, useContext } from 'react';
import { api } from '../services/api';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function MemeForm() {
  const { userId } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
    try {
      await api.post('/memes', { title, image_url: imageUrl, tags, owner_id: userId });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error creating meme');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="p-2 bg-gray-800 border border-gray-600 rounded"
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        className="p-2 bg-gray-800 border border-gray-600 rounded"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tagsInput}
        onChange={e => setTagsInput(e.target.value)}
        className="p-2 bg-gray-800 border border-gray-600 rounded"
      />
      <button type="submit" className="p-2 bg-neonPink rounded hover:brightness-125">Create Meme</button>
    </form>
  );
}
