import React from 'react';
import { Link } from 'react-router-dom';
import { FilmIcon, TicketIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FilmIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">BookMyShow</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Movies
            </Link>
            <Link 
              to="/my-bookings" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              My Bookings
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <TicketIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Select City</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200">
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;