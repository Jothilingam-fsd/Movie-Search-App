import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isFavorite, addToFavorites, removeFromFavorites }) => {
  return (
    <div className="movie-card p-4">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
        className="w-full h-56 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-2 text-white">{movie.Title}</h3>
      <p className="text-gray-400 mb-4">{movie.Year}</p>
      <div className="flex justify-between gap-2">
        <Link
          to={`/movie/${movie.imdbID}`}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 btn"
        >
          View Details
        </Link>
        {isFavorite ? (
          <button
            onClick={() => removeFromFavorites(movie.imdbID)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 btn"
          >
            Remove Favorite
          </button>
        ) : (
          <button
            onClick={() => addToFavorites(movie)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 btn"
          >
            Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;