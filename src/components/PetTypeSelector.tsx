import { Dog, Cat, Bird, Rabbit, HelpCircle } from 'lucide-react';
import { PetType } from '../types';
import { usePets } from '../context/PetContext';

const PetTypeSelector = () => {
  const { filters, setFilters } = usePets();

  const handleTypeSelect = (type: PetType | undefined) => {
    if (type === filters.type) {
      // If clicking the same type, clear the filter
      setFilters({ ...filters, type: undefined });
    } else {
      setFilters({ ...filters, type });
    }
  };

  const petTypes = [
    { type: 'dog' as PetType, label: 'Dogs', Icon: Dog },
    { type: 'cat' as PetType, label: 'Cats', Icon: Cat },
    { type: 'bird' as PetType, label: 'Birds', Icon: Bird },
    { type: 'rabbit' as PetType, label: 'Rabbits', Icon: Rabbit },
    { type: 'other' as PetType, label: 'Others', Icon: HelpCircle },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {petTypes.map(({ type, label, Icon }) => (
        <button
          key={type}
          onClick={() => handleTypeSelect(type)}
          className={`flex flex-col items-center p-4 rounded-lg transition-all ${
            filters.type === type
              ? 'bg-primary-100 text-primary-600 shadow-md scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
          }`}
        >
          <div 
            className={`p-3 rounded-full mb-2 ${
              filters.type === type 
                ? 'bg-primary-200' 
                : 'bg-gray-100'
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
      <button
        onClick={() => handleTypeSelect(undefined)}
        className={`flex flex-col items-center p-4 rounded-lg transition-all ${
          !filters.type
            ? 'bg-primary-100 text-primary-600 shadow-md scale-105'
            : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
        }`}
      >
        <div 
          className={`p-3 rounded-full mb-2 ${
            !filters.type 
              ? 'bg-primary-200' 
              : 'bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5v14" />
          </svg>
        </div>
        <span className="text-sm font-medium">All Pets</span>
      </button>
    </div>
  );
};

export default PetTypeSelector;