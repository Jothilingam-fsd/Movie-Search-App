import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const SearchPage = ({ favorites, addToFavorites, removeFromFavorites }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '4b9c65bc';

  // Fetch movies based on query, type, and page
  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&type=${type}&page=${page}&apikey=${API_KEY}`
      );
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults));
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [query, type, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies();
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSearch} className="search-form flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, series, or games..."
          className="flex-1 p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          className="p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="game">Game</option>
        </select>
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 btn"
        >
          Search
        </button>
      </form>

      {loading && <div className="loader"></div>}
      {error && <p className="text-red-400 text-center text-lg font-medium">{error}</p>}
      {movies.length === 0 && !loading && !error && (
        <p className="text-center text-gray-400 text-lg">No results found. Try a different search.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>

      {totalResults > 10 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 btn"
          >
            Previous
          </button>
          <span className="text-gray-300 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;