import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { PawPrint as Paw, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <Paw className="h-6 w-6" />
            <span>PawFriends</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/pets" 
              className={({ isActive }) => 
                `font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              Find Pets
            </NavLink>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => 
                `flex items-center gap-1 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </NavLink>
            <Link to="/pets" className="btn btn-primary">
              Adopt Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute w-full bg-white transition-all duration-300 shadow-lg ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `py-2 font-medium ${isActive ? 'text-primary-600' : 'text-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/pets" 
            className={({ isActive }) => 
              `py-2 font-medium ${isActive ? 'text-primary-600' : 'text-gray-700'}`
            }
          >
            Find Pets
          </NavLink>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => 
              `py-2 flex items-center gap-1 font-medium ${isActive ? 'text-primary-600' : 'text-gray-700'}`
            }
          >
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
          </NavLink>
          <Link to="/pets" className="btn btn-primary w-full">
            Adopt Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;