import { useState, useEffect } from 'react';
import { usePets } from '../context/PetContext';
import { Filter, X, Search } from 'lucide-react';
import { PetFilters, PetType, PetSize, PetGender } from '../types';

const FilterPanel = () => {
  const { filters, setFilters } = usePets();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<PetFilters>(filters);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setLocalFilters(filters);
    if (filters.searchQuery) {
      setSearchValue(filters.searchQuery);
    }
  }, [filters]);

  const handleSearch = () => {
    setFilters({ ...localFilters, searchQuery: searchValue });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setLocalFilters({});
    setSearchValue('');
    setFilters({});
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleFilterChange = (key: keyof PetFilters, value: any) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md mb-6">
      {/* Search bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search pets..."
            className="input pl-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-primary py-1 px-3 text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 border-b">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full btn btn-outline flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {Object.keys(localFilters).length > 0 && (
            <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {Object.keys(localFilters).length}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <div
        className={`border-b md:border-b-0 overflow-hidden transition-all duration-300 ${
          isOpen || window.innerWidth >= 768 ? 'max-h-[2000px]' : 'max-h-0 md:max-h-[2000px]'
        }`}
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
            <select
              className="input"
              value={localFilters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
            >
              <option value="">All Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="bird">Birds</option>
              <option value="rabbit">Rabbits</option>
              <option value="other">Others</option>
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                min="0"
                className="input"
                value={localFilters.ageMin || ''}
                onChange={(e) => handleFilterChange('ageMin', e.target.value ? Number(e.target.value) : undefined)}
              />
              <input
                type="number"
                placeholder="Max"
                min="0"
                className="input"
                value={localFilters.ageMax || ''}
                onChange={(e) => handleFilterChange('ageMax', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select
              className="input"
              value={localFilters.size || ''}
              onChange={(e) => handleFilterChange('size', e.target.value || undefined)}
            >
              <option value="">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              className="input"
              value={localFilters.gender || ''}
              onChange={(e) => handleFilterChange('gender', e.target.value || undefined)}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Good with Kids */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Good with Kids</label>
            <select
              className="input"
              value={localFilters.goodWithKids === undefined ? '' : localFilters.goodWithKids ? 'true' : 'false'}
              onChange={(e) => 
                handleFilterChange('goodWithKids', 
                  e.target.value === '' ? undefined : e.target.value === 'true'
                )
              }
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Good with Pets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Good with Other Pets</label>
            <select
              className="input"
              value={localFilters.goodWithPets === undefined ? '' : localFilters.goodWithPets ? 'true' : 'false'}
              onChange={(e) => 
                handleFilterChange('goodWithPets', 
                  e.target.value === '' ? undefined : e.target.value === 'true'
                )
              }
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <div className="p-4 flex justify-between bg-gray-50">
          <button onClick={handleReset} className="btn btn-outline flex items-center gap-1">
            <X className="h-4 w-4" />
            Reset
          </button>
          <button onClick={handleApplyFilters} className="btn btn-primary">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;