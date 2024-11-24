import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Playlist } from './../../../../backend/src/playlist/entities/playlist.schema';

interface Room {
  _id: string;
  name: string;
  owner: string;
  participants: string[];
  playlists: string[];
}

interface RoomsState {
  rooms: Room[];
  playlists: Playlist[];  

  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RoomsState = {
  rooms: [],
  playlists: [],

  status: 'idle',
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await axios.get('http://localhost:3000/rooms');
  return response.data;
});

export const fetchPlaylists = createAsyncThunk('rooms/fetchPlaylists', async () => {
  const response = await axios.get('http://localhost:3000/playlists'); 
  return response.data;
});

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (roomData: { name: string; owner: string; participants: string[] }) => {
    const response = await axios.post('http://localhost:3000/rooms', roomData);
    return response.data;
  }
);



export const addPlaylistToRoom = createAsyncThunk(
  'rooms/addPlaylistToRoom',
  async ({ roomId, playlistId }: { roomId: string; playlistId: string }) => {
    const response = await axios.put(
      `http://localhost:3000/rooms/${roomId}/add-playlist`,
      { playlistId }
    );
    return response.data;
  }
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;  
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(addPlaylistToRoom.fulfilled, (state, action) => {
        const roomIndex = state.rooms.findIndex((room) => room._id === action.payload.id);
        if (roomIndex !== -1) {
          state.rooms[roomIndex] = action.payload;
        }
      });
  },
});

export default roomsSlice.reducer;
