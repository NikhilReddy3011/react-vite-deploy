import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Calendar, Ruler, Check, X, ChevronLeft } from 'lucide-react';
import { usePets } from '../context/PetContext';

const PetDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPetById, isFavorite, addToFavorites, removeFromFavorites, isLoading } = usePets();
  const [imageLoaded, setImageLoaded] = useState(false);

  const pet = getPetById(id!);

  useEffect(() => {
    if (!isLoading && !pet) {
      navigate('/not-found');
    }
  }, [pet, isLoading, navigate]);

  if (isLoading || !pet) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const favorite = isFavorite(pet.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(pet.id);
    } else {
      addToFavorites(pet.id);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="mb-6">
          <Link to="/pets" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to pets</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 lg:p-8">
              <div className="relative rounded-xl overflow-hidden aspect-square">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="sr-only">Loading image</span>
                  </div>
                )}
                <img 
                  src={pet.imageUrl} 
                  alt={`${pet.name} - ${pet.breed}`}
                  className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{pet.age} {pet.age === 1 ? 'year' : 'years'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Ruler className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-medium capitalize">{pet.size}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {pet.gender === 'male' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5v14" />
                      ) : (
                        <circle cx="12" cy="12" r="7" strokeWidth={2} />
                      )}
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">{pet.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{pet.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Health & Behavior</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    {pet.vaccinated ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>Vaccinated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {pet.neutered ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>Neutered/Spayed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {pet.goodWithKids ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>Good with Kids</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {pet.goodWithPets ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                    <span>Good with Other Pets</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{pet.name}</h1>
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    favorite 
                      ? 'bg-red-100 text-red-500' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
                  }`}
                  aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-6 w-6 ${favorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-gray-600 mb-2">{pet.breed}</p>
              <div className="flex items-center mb-6">
                <span className="text-lg font-semibold text-primary-600">
                  ${pet.adoptionFee}
                </span>
                <span className="text-gray-500 ml-2">adoption fee</span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">About {pet.name}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {pet.description}
                </p>
              </div>

              <div className="space-y-4">
                <Link to={`/adopt/${pet.id}`} className="btn btn-primary w-full py-3">
                  Adopt {pet.name}
                </Link>
                <button
                  onClick={handleFavoriteToggle}
                  className={`btn w-full py-3 ${
                    favorite 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'btn-outline'
                  }`}
                >
                  {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Have Questions?</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Contact us to learn more about {pet.name} or to schedule a meet and greet.
                </p>
                <a href="tel:+1234567890" className="btn btn-outline w-full text-sm">
                  Call Us: (123) 456-7890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;