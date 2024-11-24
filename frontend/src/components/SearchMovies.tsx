import React, { useState } from 'react';
import { fetchMovieDetails, searchMovies } from '../api/omdbApi';

const SearchMovies: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    const movies = await searchMovies(query);
    setResults(movies || []);
  };

  const handleAddToPlaylist = async (movieId: string) => {
    const movieDetails = await fetchMovieDetails(movieId);
    console.log('Movie to Add:', movieDetails); 
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Search Movies</h2>
      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        {results.length > 0 ? (
          <ul>
            {results.map((movie) => (
              <li key={movie.imdbID} className="border-b py-2 flex justify-between items-center">
                <span>{movie.Title} ({movie.Year})</span>
                <button
                  onClick={() => handleAddToPlaylist(movie.imdbID)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Add to Playlist
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
