import { Movie, Show } from '../store/slices/movieSlice';
import { mockMovies, mockShows } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const movieService = {
  async getMovies(): Promise<Movie[]> {
    await delay(800);
    return mockMovies;
  },

  async getMovieById(id: string): Promise<Movie | null> {
    await delay(500);
    return mockMovies.find(movie => movie.id === id) || null;
  },

  async getShowsByMovieId(movieId: string): Promise<Show[]> {
    await delay(600);
    return mockShows.filter(show => show.movieId === movieId);
  },

  async getShowById(showId: string): Promise<Show | null> {
    await delay(400);
    return mockShows.find(show => show.id === showId) || null;
  },

  async getFilteredMovies(filters: {
    language?: string;
    genre?: string;
    city?: string;
  }): Promise<Movie[]> {
    await delay(700);
    
    let filteredMovies = mockMovies;
    
    if (filters.language) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.language.includes(filters.language!)
      );
    }
    
    if (filters.genre) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre.includes(filters.genre!)
      );
    }
    
    if (filters.city) {
      const moviesInCity = mockShows
        .filter(show => show.city === filters.city)
        .map(show => show.movieId);
      
      filteredMovies = filteredMovies.filter(movie => 
        moviesInCity.includes(movie.id)
      );
    }
    
    return filteredMovies;
  }
};