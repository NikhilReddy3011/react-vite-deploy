import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Pet } from '../types';
import PetCard from './PetCard';
import { usePets } from '../context/PetContext';

const FeaturedPets = () => {
  const { pets } = usePets();
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);

  useEffect(() => {
    if (pets.length > 0) {
      // Get random pets for featured section
      const shuffled = [...pets].sort(() => 0.5 - Math.random());
      setFeaturedPets(shuffled.slice(0, 4));
    }
  }, [pets]);

  if (featuredPets.length === 0) {
    return null;
  }

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Pets</h2>
            <p className="text-gray-600 mt-2">Meet our wonderful pets looking for loving homes</p>
          </div>
          <Link to="/pets" className="btn btn-outline flex items-center gap-1">
            <span>See all</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;