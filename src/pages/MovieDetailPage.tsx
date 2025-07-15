import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedMovie, setShows } from '../store/slices/movieSlice';
import { setSelectedShow, setBookingStep } from '../store/slices/bookingSlice';
import { movieService } from '../services/movieService';
import { Show } from '../store/slices/movieSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { StarIcon, ClockIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { PlayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedMovie } = useAppSelector((state) => state.movies);
  const [shows, setShowsData] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [showsLoading, setShowsLoading] = useState(false);

  useEffect(() => {
    const loadMovieAndShows = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [movie, showsData] = await Promise.all([
          movieService.getMovieById(id),
          movieService.getShowsByMovieId(id)
        ]);
        
        if (movie) {
          dispatch(setSelectedMovie(movie));
          setShowsData(showsData);
          dispatch(setShows(showsData));
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading movie details:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadMovieAndShows();
  }, [id, dispatch, navigate]);

  const handleShowSelection = (show: Show) => {
    dispatch(setSelectedShow(show));
    dispatch(setBookingStep('seats'));
    navigate(`/booking/seats/${show.id}`);
  };

  const groupShowsByTheaterAndDate = (shows: Show[]) => {
    const grouped: { [key: string]: { [date: string]: Show[] } } = {};
    
    shows.forEach(show => {
      const theaterKey = `${show.theater} - ${show.city}`;
      if (!grouped[theaterKey]) {
        grouped[theaterKey] = {};
      }
      if (!grouped[theaterKey][show.date]) {
        grouped[theaterKey][show.date] = [];
      }
      grouped[theaterKey][show.date].push(show);
    });
    
    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Movie not found</h2>
          <p className="text-muted-foreground mb-4">The movie you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  const groupedShows = groupShowsByTheaterAndDate(shows);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Movies</span>
        </button>
      </div>

      {/* Movie Details Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Movie Poster */}
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover"
                />
                {selectedMovie.trailer && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-primary text-primary-foreground rounded-full p-4 hover:bg-primary/90 transition-colors duration-200">
                      <PlayIcon className="h-8 w-8 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Info */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {selectedMovie.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">{selectedMovie.rating}/10</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-5 w-5" />
                      <span>{selectedMovie.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-5 w-5" />
                      <span>{new Date(selectedMovie.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMovie.genre.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">Languages: </span>
                    <span className="text-foreground">{selectedMovie.language.join(', ')}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedMovie.description}
                  </p>
                </div>

                {/* Cast */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cast</h3>
                  <p className="text-muted-foreground">{selectedMovie.cast.join(', ')}</p>
                </div>

                {/* Director */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Director</h3>
                  <p className="text-muted-foreground">{selectedMovie.director}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Book Tickets</h2>
        
        {shows.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No shows available</h3>
            <p className="text-muted-foreground">
              Check back later for available showtimes.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedShows).map(([theaterInfo, dateShows]) => (
              <div key={theaterInfo} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{theaterInfo}</h3>
                </div>
                
                {Object.entries(dateShows).map(([date, dayShows]) => (
                  <div key={date} className="mb-4 last:mb-0">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                    
                    <div className="flex flex-wrap gap-3">
                      {dayShows.map((show) => (
                        <button
                          key={show.id}
                          onClick={() => handleShowSelection(show)}
                          className="group bg-background border border-input hover:border-primary rounded-lg p-3 text-left transition-all duration-200 hover:shadow-md"
                        >
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                            {show.showTime}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {show.screen}
                          </div>
                          <div className="text-sm font-medium text-primary">
                            ₹{show.price}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {show.totalSeats - show.bookedSeats.length} seats available
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;