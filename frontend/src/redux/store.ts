import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomsReducer from './slices/roomsSlice';
import playlistsReducer from './slices/playlistsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    playlists: playlistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
