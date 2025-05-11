import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import PetCard from '../components/PetCard';
import FilterPanel from '../components/FilterPanel';
import { PetType } from '../types';

const PetsPage = () => {
  const { filteredPets, filters, setFilters, isLoading } = usePets();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Handle URL params for filters
    const typeParam = searchParams.get('type') as PetType | null;
    if (typeParam && ['dog', 'cat', 'bird', 'rabbit', 'other'].includes(typeParam)) {
      setFilters({ ...filters, type: typeParam });
    }
  }, [searchParams]);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Pets</h1>
          <p className="text-gray-600">
            Find your perfect companion from our selection of available pets
          </p>
        </div>

        <FilterPanel />

        {filteredPets.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No pets found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to find more pets
            </p>
            <button
              onClick={() => setFilters({})}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-4 text-gray-600">
              Showing {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetsPage;