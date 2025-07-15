import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../store/slices/movieSlice';
import { StarIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { PlayIcon } from '@heroicons/react/24/outline';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium">
          <StarIcon className="h-3 w-3 text-yellow-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Play Button Overlay */}
        {movie.trailer && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors duration-200">
              <PlayIcon className="h-6 w-6 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-2">
          {movie.title}
        </h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
          {movie.genre.length > 2 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{movie.genre.length - 2}
            </span>
          )}
        </div>

        {/* Movie Info */}
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4" />
            <span>{movie.duration}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {movie.language.map((lang, index) => (
              <React.Fragment key={lang}>
                <span>{lang}</span>
                {index < movie.language.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <Link
          to={`/movie/${movie.id}`}
          className="block w-full bg-primary text-primary-foreground text-center py-2 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;