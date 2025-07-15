import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMovies, setLoading, setError } from '../store/slices/movieSlice';
import { movieService } from '../services/movieService';
import MovieFilters from '../components/movies/MovieFilters';
import MovieGrid from '../components/movies/MovieGrid';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies, filters, loading } = useAppSelector((state) => state.movies);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        dispatch(setLoading(true));
        const moviesData = await movieService.getMovies();
        dispatch(setMovies(moviesData));
        dispatch(setError(null));
      } catch (error) {
        dispatch(setError('Failed to load movies'));
        console.error('Error loading movies:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadMovies();
  }, [dispatch]);

  useEffect(() => {
    const applyFilters = async () => {
      try {
        dispatch(setLoading(true));
        
        // Check if any filters are active
        const hasActiveFilters = Object.values(filters).some(filter => filter !== '');
        
        if (hasActiveFilters) {
          const filtered = await movieService.getFilteredMovies({
            language: filters.language || undefined,
            genre: filters.genre || undefined,
            city: filters.city || undefined,
          });
          setFilteredMovies(filtered);
        } else {
          setFilteredMovies(movies);
        }
      } catch (error) {
        console.error('Error applying filters:', error);
        setFilteredMovies(movies);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (movies.length > 0) {
      applyFilters();
    }
  }, [filters, movies, dispatch]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Book Your Movie Tickets
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your favorite movie, pick a showtime, and book your seat in a few taps. 
              Experience cinema like never before.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <MovieFilters />

        {/* Movies Grid */}
        <MovieGrid movies={filteredMovies} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;