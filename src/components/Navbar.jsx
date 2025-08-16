import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-wide">Movie Search</h1>
        <div className="flex gap-6 text-lg">
          <Link to="/" className="text-white hover:text-red-400 transition-colors">Search</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;