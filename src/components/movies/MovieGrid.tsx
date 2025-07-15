import React from 'react';
import { Movie } from '../../store/slices/movieSlice';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No movies found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or check back later for new releases.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Movies in Cinemas
        </h2>
        <span className="text-muted-foreground">
          {movies.length} movie{movies.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;