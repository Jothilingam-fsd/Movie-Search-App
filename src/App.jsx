import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import MovieDetails from './components/MovieDetails';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  // Add movie to favorites
  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove movie from favorites
  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;