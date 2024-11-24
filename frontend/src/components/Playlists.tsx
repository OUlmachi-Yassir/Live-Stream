import React, { useEffect, useState } from 'react';
import { searchMovies } from '../api/omdbApi'; 
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToPlaylist, createPlaylist, fetchPlaylists } from '../redux/slices/playlistsSlice'; 
import { AppDispatch, RootState } from '../redux/store';

interface Movie {
  imdbID: string;
  Title: string;  
  Poster: string;
  Genre: string;
  Director: string;
  Released: string;
}

interface Playlist {
  id: string;
  name: string;
  owner: string;
  movies: Movie[];
}

const Playlists: React.FC = () => {
  const playlists = useSelector((state: RootState) => state.playlists.playlists);
  const dispatch = useDispatch<AppDispatch>();
  
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistOwner, setNewPlaylistOwner] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const status = useSelector((state: RootState) => state.playlists.status);


  const createPlaylistHandler = async () => {
    const newPlaylist = {
      name: newPlaylistName,
      owner: newPlaylistOwner,
      movies: [],
    };

    try {
      const action = await dispatch(createPlaylist(newPlaylist)); 
      if (action.type === 'playlists/createPlaylist/fulfilled') {  
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    } finally {
      setIsCreatePopupOpen(false);
      setNewPlaylistName('');
      setNewPlaylistOwner('');
    }
  };

  const openSearchPopup = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setIsSearchPopupOpen(true);
  };

  const closeSearchPopup = () => {
    setIsSearchPopupOpen(false);
    setSearchResults([]);
    setSearchQuery('');
    setSelectedMovies([]);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results || []);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    }
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPlaylists());
    }
  }, [dispatch, status]);

  const addMoviesToPlaylist = () => {
    if (selectedPlaylistId && selectedMovies.length > 0) {
      selectedMovies.forEach((movie) => {
        const formattedMovie = {
          title: movie.Title,  
          image: movie.Poster,
          trailer: `https://www.youtube.com/results?search_query=${movie.Title} trailer`,
        };

        dispatch(addMovieToPlaylist({ playlistId: selectedPlaylistId, movie: formattedMovie }));
      });
    }
    closeSearchPopup();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Playlists</h1>
      <button
        onClick={() => setIsCreatePopupOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Playlist
      </button>

      <ul className="mt-4">
        {playlists.map((playlist) => (
          <li key={playlist._id} className="py-2">
            <div>
              <strong>{playlist.name}</strong> (Owner: {playlist.owner})
              <button
                onClick={() => openSearchPopup(playlist._id)}
                className="bg-green-500 text-white px-2 py-1 ml-4 rounded"
              >
                Add Movies
              </button>
            </div>
            <ul className="ml-4 mt-2">
              {playlist.movies.map((movie, index) => (
                <li key={index} className="py-1">
                  {movie.title}  
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {isCreatePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Playlist</h2>
            <input
              type="text"
              placeholder="Playlist Name"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Owner Name"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              value={newPlaylistOwner}
              onChange={(e) => setNewPlaylistOwner(e.target.value)}
            />
            <button
              onClick={createPlaylistHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
            <button
              onClick={() => setIsCreatePopupOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isSearchPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg">
            <h2 className="text-lg font-bold mb-4">Search for Movies</h2>
            <input
              type="text"
              placeholder="Search movies..."
              className="border border-gray-300 rounded p-2 w-full mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
              Search
            </button>
            <ul className="max-h-60 overflow-y-auto">
              {searchResults.map((movie) => (
                <li
                  key={movie.imdbID}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <div>
                    <strong>{movie.Title}</strong> 
                  </div>
                  <button
                    onClick={() => setSelectedMovies([...selectedMovies, movie])}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={addMoviesToPlaylist}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Add Selected Movies
            </button>
            <button
              onClick={closeSearchPopup}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;
