import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-green-800 mb-8">Chrisland Tuck Shop</h1>
      <div className="grid gap-4 w-full max-w-sm">
        <Link to="/login" className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">🎓 Student Login</Link>
        <Link to="/admin" className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600">🧑‍🏫 Admin Dashboard</Link>
        <Link to="/topup" className="bg-white text-green-700 py-3 border-2 border-green-600 rounded-lg hover:bg-green-100">👨‍👩‍👧 Parent Top-Up</Link>
        <Link to="/snacks" className="bg-green-800 text-white py-3 rounded-lg hover:bg-green-900">🍪 View Snacks</Link>
      </div>
    </div>
  );
}

function Placeholder({ title }) {
  return <div className="p-8 text-center text-lg">{title} Page Coming Soon</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Placeholder title="Student Login" />} />
        <Route path="/admin" element={<Placeholder title="Admin Dashboard" />} />
        <Route path="/topup" element={<Placeholder title="Parent Top-Up" />} />
        <Route path="/snacks" element={<Placeholder title="Snacks Catalogue" />} />
      </Routes>
    </Router>
  );
}

export default App;