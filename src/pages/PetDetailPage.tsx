import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import { convertToRupees, formatCurrency } from '../utils/currencyUtils';

const PetDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getPetById, isLoading } = usePets();
    const [showAdoptionForm, setShowAdoptionForm] = useState(false);

    const pet = getPetById(id!);

    if (isLoading || !pet) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const priceInRupees = convertToRupees(pet.price);

    return (
        <div className="section">
            <div className="container max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img 
                            src={pet.imageUrl} 
                            alt={pet.name} 
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">About {pet.name}</h2>
                                <p className="text-gray-600">{pet.description}</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Details</h2>
                                <ul className="space-y-2">
                                    <li><span className="font-medium">Breed:</span> {pet.breed}</li>
                                    <li><span className="font-medium">Age:</span> {pet.age} {pet.age === 1 ? 'year' : 'years'} old</li>
                                    <li><span className="font-medium">Location:</span> {pet.location}</li>
                                    <li><span className="font-medium">Adoption Fee:</span> {formatCurrency(priceInRupees)}</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Health Information</h2>
                                <ul className="space-y-2">
                                    <li><span className="font-medium">Vaccinated:</span> {pet.isVaccinated ? 'Yes' : 'No'}</li>
                                    <li><span className="font-medium">Spayed/Neutered:</span> {pet.isSpayedNeutered ? 'Yes' : 'No'}</li>
                                    <li><span className="font-medium">Medical History:</span> {pet.medicalHistory}</li>
                                </ul>
                            </div>
                            <div className="pt-4">
                                <button 
                                    onClick={() => setShowAdoptionForm(true)}
                                    className="btn btn-primary w-full"
                                >
                                    Apply for Adoption
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetailPage; 