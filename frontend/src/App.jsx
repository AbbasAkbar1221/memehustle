import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MemeList from './components/MemeList';
import MemeForm from './components/MemeForm';
import Leaderboard from './components/Leaderboard';
import TerminalEffect from './components/TerminalEffect';

function App() {
  return (
    <Router>
      <div className="min-h-screen p-4">
        <TerminalEffect />
        <nav className="flex space-x-4 mb-4">
          <Link to="/" className="text-neonPink hover:underline">Home</Link>
          <Link to="/create" className="text-neonBlue hover:underline">Create Meme</Link>
          <Link to="/leaderboard" className="text-neonGreen hover:underline">Leaderboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<MemeList />} />
          <Route path="/create" element={<MemeForm />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
