import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedShow } from '../store/slices/bookingSlice';
import { movieService } from '../services/movieService';
import SeatSelector from '../components/booking/SeatSelector';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const SeatBookingPage: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedShow, selectedSeats, totalAmount } = useAppSelector((state) => state.booking);
  const { selectedMovie } = useAppSelector((state) => state.movies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShow = async () => {
      if (!showId) return;
      
      try {
        const show = await movieService.getShowById(showId);
        if (show) {
          dispatch(setSelectedShow(show));
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading show:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (!selectedShow || selectedShow.id !== showId) {
      loadShow();
    } else {
      setLoading(false);
    }
  }, [showId, selectedShow, dispatch, navigate]);

  const handleProceedToPayment = () => {
    // Navigate to booking confirmation (we'll create this next)
    navigate('/booking/confirmation');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading seat information...</p>
        </div>
      </div>
    );
  }

  if (!selectedShow || !selectedMovie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Show not found</h2>
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/movie/${selectedMovie.id}`)}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Movie Details</span>
        </button>

        {/* Booking Header */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{selectedMovie.title}</h1>
              <div className="space-y-1 text-muted-foreground">
                <p>{selectedShow.theater} - {selectedShow.screen}</p>
                <p>{new Date(selectedShow.date).toDateString()} - {selectedShow.showTime}</p>
                <p>{selectedShow.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">₹{selectedShow.price}</div>
              <div className="text-sm text-muted-foreground">per seat</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Choose your seats</h2>
            <p className="text-muted-foreground mb-6">Green means available. Grey means taken.</p>
            <SeatSelector
              totalSeats={selectedShow.totalSeats}
              bookedSeats={selectedShow.bookedSeats}
            />
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Movie</div>
                  <div className="font-medium text-foreground">{selectedMovie.title}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Theater</div>
                  <div className="font-medium text-foreground">{selectedShow.theater}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Date & Time</div>
                  <div className="font-medium text-foreground">
                    {new Date(selectedShow.date).toDateString()}<br />
                    {selectedShow.showTime}
                  </div>
                </div>
                
                {selectedSeats.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground">Selected Seats</div>
                    <div className="font-medium text-foreground">{selectedSeats.join(', ')}</div>
                  </div>
                )}
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Seats ({selectedSeats.length})</span>
                    <span className="font-medium">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleProceedToPayment}
                disabled={selectedSeats.length === 0}
                className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {selectedSeats.length === 0 ? 'Select seats to continue' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBookingPage;