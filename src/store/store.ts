import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './slices/movieSlice';
import bookingSlice from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    booking: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;