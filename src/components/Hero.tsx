import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { usePets } from '../context/PetContext';

const Hero = () => {
  const { searchPets } = usePets();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPets(searchValue);
  };

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Dog and cat together"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/80"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 animate-bounce-slow">
            Adopt, Don't Shop
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect <span className="text-primary-400">Furry</span> Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Every pet deserves a loving home. Browse our available pets and give them a second chance at happiness.
          </p>

          <form onSubmit={handleSearch} className="mb-8 max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for pets..."
              className="w-full px-5 py-3 pr-36 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 bg-primary-600 hover:bg-primary-700 text-white px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </form>

          <div className="flex flex-wrap gap-4">
            <Link to="/pets" className="btn btn-primary text-base px-6 py-3">
              Browse All Pets
            </Link>
            <Link to="/pets?type=dog" className="btn btn-outline border-white text-white hover:bg-white/10 text-base px-6 py-3">
              Find Dogs
            </Link>
            <Link to="/pets?type=cat" className="btn btn-outline border-white text-white hover:bg-white/10 text-base px-6 py-3">
              Find Cats
            </Link>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;