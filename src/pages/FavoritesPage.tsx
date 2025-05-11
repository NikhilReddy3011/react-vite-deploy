import { Link } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import PetCard from '../components/PetCard';
import { Heart, Search } from 'lucide-react';

const FavoritesPage = () => {
  const { favorites, pets, isLoading } = usePets();

  // Get the favorite pets from the favorites list
  const favoritePets = pets.filter(pet => favorites.includes(pet.id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="mb-8 flex items-center gap-3">
          <Heart className="h-6 w-6 text-primary-600" />
          <h1 className="text-3xl font-bold">Your Favorites</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Browse our available pets and click the heart icon to add them to your favorites
            </p>
            <Link to="/pets" className="btn btn-primary flex items-center gap-2 mx-auto w-fit">
              <Search className="h-5 w-5" />
              <span>Find Pets</span>
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              You have {favoritePets.length} {favoritePets.length === 1 ? 'pet' : 'pets'} in your favorites
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoritePets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;