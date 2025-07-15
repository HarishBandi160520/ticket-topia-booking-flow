import { Movie, Show } from '../store/slices/movieSlice';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Avengers: Endgame',
    description: 'The Avengers assemble once more to reverse the destruction caused by Thanos and restore balance to the universe.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: ['English', 'Hindi'],
    rating: 8.4,
    duration: '3h 1m',
    releaseDate: '2024-01-15',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 'Mark Ruffalo'],
    director: 'Anthony Russo, Joe Russo',
    trailer: 'https://example.com/trailer1'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    description: 'Batman faces his greatest challenge yet when the Joker wreaks havoc on Gotham City.',
    poster: 'https://images.unsplash.com/photo-1635863138275-d9864d29c6d6?w=400&h=600&fit=crop',
    genre: ['Action', 'Crime', 'Drama'],
    language: ['English'],
    rating: 9.0,
    duration: '2h 32m',
    releaseDate: '2024-02-10',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Maggie Gyllenhaal'],
    director: 'Christopher Nolan'
  },
  {
    id: '3',
    title: 'Spider-Man: No Way Home',
    description: 'Peter Parker seeks help from Doctor Strange to make everyone forget his identity as Spider-Man.',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop',
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: ['English', 'Hindi', 'Tamil'],
    rating: 8.2,
    duration: '2h 28m',
    releaseDate: '2024-01-20',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Willem Dafoe'],
    director: 'Jon Watts'
  },
  {
    id: '4',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    language: ['English', 'Hindi'],
    rating: 8.8,
    duration: '2h 28m',
    releaseDate: '2024-03-05',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Ellen Page'],
    director: 'Christopher Nolan'
  },
  {
    id: '5',
    title: 'Black Panther',
    description: 'T\'Challa returns home to take his place as king of Wakanda but faces challenges from within and outside.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: ['English', 'Hindi'],
    rating: 7.3,
    duration: '2h 14m',
    releaseDate: '2024-02-25',
    cast: ['Chadwick Boseman', 'Michael B. Jordan', 'Lupita Nyong\'o', 'Danai Gurira'],
    director: 'Ryan Coogler'
  },
  {
    id: '6',
    title: 'Dune',
    description: 'Paul Atreides leads nomadic tribes in a rebellion against the evil Harkonnen to free his desert world.',
    poster: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
    genre: ['Action', 'Adventure', 'Drama'],
    language: ['English'],
    rating: 8.0,
    duration: '2h 35m',
    releaseDate: '2024-03-15',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac', 'Josh Brolin'],
    director: 'Denis Villeneuve'
  }
];

export const mockShows: Show[] = [
  // Avengers: Endgame shows
  {
    id: 's1',
    movieId: '1',
    theater: 'PVR Cinemas',
    screen: 'Screen 1',
    showTime: '10:00 AM',
    date: '2024-01-20',
    city: 'Mumbai',
    price: 200,
    totalSeats: 100,
    bookedSeats: ['A1', 'A2', 'B5', 'C3', 'D7', 'E2']
  },
  {
    id: 's2',
    movieId: '1',
    theater: 'INOX',
    screen: 'Screen 2',
    showTime: '2:30 PM',
    date: '2024-01-20',
    city: 'Mumbai',
    price: 250,
    totalSeats: 120,
    bookedSeats: ['A1', 'A3', 'B2', 'C1', 'D4']
  },
  {
    id: 's3',
    movieId: '1',
    theater: 'Cinepolis',
    screen: 'Screen 3',
    showTime: '7:00 PM',
    date: '2024-01-20',
    city: 'Delhi',
    price: 300,
    totalSeats: 80,
    bookedSeats: ['F1', 'F2', 'G3', 'H1']
  },
  // The Dark Knight shows
  {
    id: 's4',
    movieId: '2',
    theater: 'PVR Cinemas',
    screen: 'Screen 2',
    showTime: '11:30 AM',
    date: '2024-01-20',
    city: 'Mumbai',
    price: 180,
    totalSeats: 100,
    bookedSeats: ['A5', 'B3', 'C2', 'D1']
  },
  {
    id: 's5',
    movieId: '2',
    theater: 'INOX',
    screen: 'Screen 1',
    showTime: '6:00 PM',
    date: '2024-01-20',
    city: 'Bangalore',
    price: 220,
    totalSeats: 90,
    bookedSeats: ['E1', 'E2', 'F4', 'G2']
  },
  // Spider-Man shows
  {
    id: 's6',
    movieId: '3',
    theater: 'Cinepolis',
    screen: 'Screen 1',
    showTime: '9:30 AM',
    date: '2024-01-20',
    city: 'Chennai',
    price: 200,
    totalSeats: 110,
    bookedSeats: ['A2', 'B1', 'C4', 'D3', 'E5']
  },
  {
    id: 's7',
    movieId: '3',
    theater: 'PVR Cinemas',
    screen: 'Screen 3',
    showTime: '3:00 PM',
    date: '2024-01-20',
    city: 'Delhi',
    price: 280,
    totalSeats: 100,
    bookedSeats: ['F3', 'G1', 'H2', 'I1']
  }
];

export const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
export const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali'];
export const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];