export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  size: PetSize;
  gender: PetGender;
  description: string;
  imageUrl: string;
  location: string;
  vaccinated: boolean;
  neutered: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  adoptionFee: number;
}

export type PetType = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
export type PetSize = 'small' | 'medium' | 'large';
export type PetGender = 'male' | 'female';

export interface PetFilters {
  type?: PetType;
  ageMin?: number;
  ageMax?: number;
  size?: PetSize;
  gender?: PetGender;
  goodWithKids?: boolean;
  goodWithPets?: boolean;
  searchQuery?: string;
}

export interface AdoptionForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  housingType: string;
  hasYard: boolean;
  hasOtherPets: boolean;
  otherPetsDetails: string;
  hasChildren: boolean;
  childrenAges: string;
  petExperience: string;
  workSchedule: string;
  reasonForAdoption: string;
  questions: string;
}