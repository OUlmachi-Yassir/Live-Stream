import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Playlist {
  _id: string;
  name: string;
  owner: string;
  movies: { title: string; image: string; trailer: string }[];
}

interface PlaylistsState {
  playlists: Playlist[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PlaylistsState = {
  playlists: [],
  status: 'idle',
};

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async () => {
  const response = await axios.get('http://localhost:3000/playlists');
  return response.data;
});

export const addMovieToPlaylist = createAsyncThunk(
  'playlists/addMovieToPlaylist',
  async ({ playlistId, movie }: { playlistId: string; movie: { title: string; image: string; trailer: string } }) => {
    const response = await axios.put(`http://localhost:3000/playlists/${playlistId}`, {
      movies: movie,
    });
    return response.data;
  }
);



export const createPlaylist = createAsyncThunk(
  'playlists/createPlaylist',
  async (newPlaylist: { name: string; owner: string }) => {
    const response = await axios.post('http://localhost:3000/playlists', {
      ...newPlaylist,
      movies: [],
    });
    return response.data;
  }
);

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlists.push(action.payload);
      })
      .addCase(addMovieToPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.playlists[index] = action.payload;
        }
      });
  },
});

export default playlistsSlice.reducer;
