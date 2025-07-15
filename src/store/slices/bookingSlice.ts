import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingState {
  selectedShow: any | null;
  selectedSeats: string[];
  totalAmount: number;
  bookingStep: 'movie' | 'show' | 'seats' | 'payment' | 'confirmation';
  bookingId: string | null;
  userBookings: Booking[];
}

export interface Booking {
  id: string;
  movieTitle: string;
  theater: string;
  screen: string;
  showTime: string;
  date: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
  qrCode?: string;
}

const initialState: BookingState = {
  selectedShow: null,
  selectedSeats: [],
  totalAmount: 0,
  bookingStep: 'movie',
  bookingId: null,
  userBookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedShow: (state, action: PayloadAction<any>) => {
      state.selectedShow = action.payload;
    },
    toggleSeatSelection: (state, action: PayloadAction<string>) => {
      const seatId = action.payload;
      const index = state.selectedSeats.indexOf(seatId);
      
      if (index > -1) {
        state.selectedSeats.splice(index, 1);
      } else {
        if (state.selectedSeats.length < 10) {
          state.selectedSeats.push(seatId);
        }
      }
      
      state.totalAmount = state.selectedSeats.length * (state.selectedShow?.price || 0);
    },
    clearSeatSelection: (state) => {
      state.selectedSeats = [];
      state.totalAmount = 0;
    },
    setBookingStep: (state, action: PayloadAction<BookingState['bookingStep']>) => {
      state.bookingStep = action.payload;
    },
    setBookingId: (state, action: PayloadAction<string>) => {
      state.bookingId = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.userBookings.push(action.payload);
    },
    resetBooking: (state) => {
      state.selectedShow = null;
      state.selectedSeats = [];
      state.totalAmount = 0;
      state.bookingStep = 'movie';
      state.bookingId = null;
    },
  },
});

export const {
  setSelectedShow,
  toggleSeatSelection,
  clearSeatSelection,
  setBookingStep,
  setBookingId,
  addBooking,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;