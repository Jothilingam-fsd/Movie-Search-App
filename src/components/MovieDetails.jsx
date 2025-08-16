import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = ({ favorites, addToFavorites, removeFromFavorites }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '4b9c65bc';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        if (response.data.Response === 'True') {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="loader"></div>;
  if (error) return <p className="text-red-500 text-center text-lg font-medium mt-10">{error}</p>;
  if (!movie) return null;

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="text-blue-400 hover:text-white mb-6 inline-block font-medium">
        &larr; Back to Search
      </Link>
      <div className="details-container">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}
          alt={movie.Title}
          className="w-full md:w-1/3 h-auto rounded-lg"
        />
        <div className="flex-1">
          <h2 className="movie-title">{movie.Title}</h2>
          <p className="movie-info">Year: {movie.Year}</p>
          <p className="movie-info">Genre: {movie.Genre}</p>
          <p className="movie-info">Cast: {movie.Actors}</p>
          <p className="movie-info">Plot: {movie.Plot}</p>
          <p className="movie-info">Rating: {movie.imdbRating}/10</p>
          {isFavorite ? (
            <button
              onClick={() => removeFromFavorites(movie.imdbID)}
              className="bg-red-600 text-white btn mt-4 hover:bg-red-700"
            >
              Remove from Favorites
            </button>
          ) : (
            <button
              onClick={() => addToFavorites(movie)}
              className="bg-green-600 text-white btn mt-4 hover:bg-green-700"
            >
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;