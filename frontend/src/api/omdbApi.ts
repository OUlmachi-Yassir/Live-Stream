import axios from 'axios';

const OMDB_BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '2fdc9a3a';

export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await axios.get(`${OMDB_BASE_URL}`, {
      params: {
        i: movieId,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${OMDB_BASE_URL}`, {
      params: {
        s: query,
        apikey: API_KEY,
      },
    });
    return response.data.Search; 
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};
