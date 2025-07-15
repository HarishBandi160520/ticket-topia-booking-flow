import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  genre: string[];
  language: string[];
  rating: number;
  duration: string;
  releaseDate: string;
  cast: string[];
  director: string;
  trailer?: string;
}

export interface Show {
  id: string;
  movieId: string;
  theater: string;
  screen: string;
  showTime: string;
  date: string;
  city: string;
  price: number;
  totalSeats: number;
  bookedSeats: string[];
}

export interface MovieFilters {
  language: string;
  genre: string;
  city: string;
  date: string;
}

interface MovieState {
  movies: Movie[];
  shows: Show[];
  selectedMovie: Movie | null;
  filters: MovieFilters;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  shows: [],
  selectedMovie: null,
  filters: {
    language: '',
    genre: '',
    city: '',
    date: '',
  },
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setShows: (state, action: PayloadAction<Show[]>) => {
      state.shows = action.payload;
    },
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<MovieFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        language: '',
        genre: '',
        city: '',
        date: '',
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMovies,
  setShows,
  setSelectedMovie,
  setFilters,
  clearFilters,
  setLoading,
  setError,
} = movieSlice.actions;

export default movieSlice.reducer;