import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Pet, PetFilters } from '../types';
import { petsData } from '../data/pets';

interface PetContextType {
  pets: Pet[];
  filteredPets: Pet[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  filters: PetFilters;
  setFilters: (filters: PetFilters) => void;
  addToFavorites: (petId: string) => void;
  removeFromFavorites: (petId: string) => void;
  isFavorite: (petId: string) => boolean;
  getPetById: (id: string) => Pet | undefined;
  searchPets: (query: string) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PetFilters>({});

  // Initialize pets from data
  useEffect(() => {
    try {
      setPets(petsData);
      setFilteredPets(petsData);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load pets');
      setIsLoading(false);
    }
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('petFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('petFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Apply filters
  useEffect(() => {
    let result = [...pets];

    if (filters.type) {
      result = result.filter(pet => pet.type === filters.type);
    }

    if (filters.size) {
      result = result.filter(pet => pet.size === filters.size);
    }

    if (filters.gender) {
      result = result.filter(pet => pet.gender === filters.gender);
    }

    if (filters.ageMin !== undefined) {
      result = result.filter(pet => pet.age >= filters.ageMin!);
    }

    if (filters.ageMax !== undefined) {
      result = result.filter(pet => pet.age <= filters.ageMax!);
    }

    if (filters.goodWithKids !== undefined) {
      result = result.filter(pet => pet.goodWithKids === filters.goodWithKids);
    }

    if (filters.goodWithPets !== undefined) {
      result = result.filter(pet => pet.goodWithPets === filters.goodWithPets);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(pet => 
        pet.name.toLowerCase().includes(query) || 
        pet.breed.toLowerCase().includes(query) ||
        pet.description.toLowerCase().includes(query)
      );
    }

    setFilteredPets(result);
  }, [pets, filters]);

  const addToFavorites = (petId: string) => {
    setFavorites(prev => [...prev, petId]);
  };

  const removeFromFavorites = (petId: string) => {
    setFavorites(prev => prev.filter(id => id !== petId));
  };

  const isFavorite = (petId: string) => {
    return favorites.includes(petId);
  };

  const getPetById = (id: string) => {
    return pets.find(pet => pet.id === id);
  };

  const searchPets = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        filteredPets,
        favorites,
        isLoading,
        error,
        filters,
        setFilters,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getPetById,
        searchPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};