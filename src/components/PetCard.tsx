import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { Pet } from '../types';
import { usePets } from '../context/PetContext';
import { convertToRupees, formatCurrency } from '../utils/currencyUtils';

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = usePets();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const favorite = isFavorite(pet.id);
  const priceInRupees = convertToRupees(pet.price);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(pet.id);
    } else {
      addToFavorites(pet.id);
    }
  };

  return (
    <Link 
      to={`/pets/${pet.id}`}
      className="card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="sr-only">Loading image</span>
          </div>
        )}
        <img 
          src={pet.imageUrl} 
          alt={`${pet.name} - ${pet.breed}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            favorite 
              ? 'bg-white text-red-500' 
              : 'bg-white/70 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-red-500' : ''}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{pet.name}</h3>
          <p className="text-white/90 text-sm">{pet.breed}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{pet.location}</span>
          </div>
          <span className="text-sm font-medium text-primary-600">
            {formatCurrency(priceInRupees)}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {pet.age} {pet.age === 1 ? 'year' : 'years'}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full capitalize">
            {pet.gender}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full capitalize">
            {pet.size}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;