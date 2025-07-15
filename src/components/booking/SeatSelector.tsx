import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSeatSelection } from '../../store/slices/bookingSlice';

interface SeatSelectorProps {
  totalSeats: number;
  bookedSeats: string[];
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ totalSeats, bookedSeats }) => {
  const dispatch = useAppDispatch();
  const { selectedSeats } = useAppSelector((state) => state.booking);

  // Generate seat layout (10 seats per row for simplicity)
  const generateSeatLayout = () => {
    const seats = [];
    const seatsPerRow = 10;
    const rows = Math.ceil(totalSeats / seatsPerRow);
    
    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.
      const rowSeats = [];
      
      for (let seatNum = 1; seatNum <= seatsPerRow && (row * seatsPerRow + seatNum) <= totalSeats; seatNum++) {
        const seatId = `${rowLetter}${seatNum}`;
        rowSeats.push(seatId);
      }
      
      seats.push(rowSeats);
    }
    
    return seats;
  };

  const seatLayout = generateSeatLayout();

  const getSeatStatus = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatClassName = (status: string) => {
    const baseClasses = 'w-8 h-8 text-xs font-medium rounded-md border-2 transition-all duration-200 cursor-pointer flex items-center justify-center';
    
    switch (status) {
      case 'booked':
        return `${baseClasses} bg-destructive/20 border-destructive text-destructive cursor-not-allowed`;
      case 'selected':
        return `${baseClasses} bg-primary border-primary text-primary-foreground hover:bg-primary/90`;
      case 'available':
        return `${baseClasses} bg-background border-input text-foreground hover:border-primary hover:bg-primary/10`;
      default:
        return baseClasses;
    }
  };

  const handleSeatClick = (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status !== 'booked') {
      dispatch(toggleSeatSelection(seatId));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Screen */}
      <div className="mb-8">
        <div className="bg-gradient-to-b from-primary/20 to-primary/10 rounded-lg p-4 text-center">
          <div className="text-lg font-semibold text-foreground mb-2">SCREEN</div>
          <div className="h-2 bg-primary/30 rounded-full"></div>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="space-y-4 max-w-fit mx-auto">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center space-x-2">
            {/* Row Label */}
            <div className="w-8 text-center font-medium text-muted-foreground">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            
            {/* Seats */}
            <div className="flex space-x-2">
              {row.map((seatId) => {
                const status = getSeatStatus(seatId);
                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    className={getSeatClassName(status)}
                    disabled={status === 'booked'}
                    title={`Seat ${seatId} - ${status}`}
                  >
                    {seatId.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-background border-2 border-input rounded"></div>
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary border-2 border-primary rounded"></div>
          <span className="text-sm text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-destructive/20 border-2 border-destructive rounded"></div>
          <span className="text-sm text-muted-foreground">Booked</span>
        </div>
      </div>

      {/* Seat Selection Info */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">
                Selected Seats: {selectedSeats.join(', ')}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected (Max: 10)
              </div>
            </div>
            {selectedSeats.length >= 10 && (
              <div className="text-sm text-amber-600 font-medium">
                Maximum seats reached
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;