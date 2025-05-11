import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import { Check, ChevronLeft } from 'lucide-react';

const AdoptionFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPetById, isLoading } = usePets();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    housingType: 'house',
    hasYard: false,
    hasOtherPets: false,
    otherPetsDetails: '',
    hasChildren: false,
    childrenAges: '',
    petExperience: '',
    workSchedule: '',
    reasonForAdoption: '',
    questions: '',
    agreeToTerms: false
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to the server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="section">
        <div className="container max-w-3xl">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-700 mb-6">
              Thank you for your interest in adopting {pet.name}. We've received your application and will contact you soon to discuss the next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/pets/${pet.id}`} className="btn btn-outline">
                Return to {pet.name}'s Profile
              </Link>
              <Link to="/pets" className="btn btn-primary">
                Browse More Pets
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container max-w-4xl">
        <div className="mb-6">
          <Link to={`/pets/${pet.id}`} className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to {pet.name}'s profile</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8 border-b">
            <div className="flex items-center gap-4">
              <img 
                src={pet.imageUrl} 
                alt={pet.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">Adoption Application for {pet.name}</h1>
                <p className="text-gray-600">
                  {pet.breed} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old • {pet.location}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="input"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Address Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="input"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className="input"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      className="input"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      required
                      className="input"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Living Situation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-1">
                    Housing Type *
                  </label>
                  <select
                    id="housingType"
                    name="housingType"
                    required
                    className="input"
                    value={formData.housingType}
                    onChange={handleChange}
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex items-center h-full pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasYard"
                      checked={formData.hasYard}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span>Do you have a yard?</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Household Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      name="hasOtherPets"
                      checked={formData.hasOtherPets}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span>Do you have other pets?</span>
                  </label>
                  {formData.hasOtherPets && (
                    <textarea
                      name="otherPetsDetails"
                      placeholder="Please describe your other pets (species, age, temperament)"
                      className="input h-24"
                      value={formData.otherPetsDetails}
                      onChange={handleChange}
                    ></textarea>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      name="hasChildren"
                      checked={formData.hasChildren}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span>Do you have children in the household?</span>
                  </label>
                  {formData.hasChildren && (
                    <input
                      type="text"
                      name="childrenAges"
                      placeholder="Please provide the ages of the children"
                      className="input"
                      value={formData.childrenAges}
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="workSchedule" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Schedule *
                  </label>
                  <input
                    type="text"
                    id="workSchedule"
                    name="workSchedule"
                    placeholder="e.g., Mon-Fri, 9am-5pm"
                    required
                    className="input"
                    value={formData.workSchedule}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Pet Experience</h2>
              <div>
                <label htmlFor="petExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Experience with Pets *
                </label>
                <textarea
                  id="petExperience"
                  name="petExperience"
                  required
                  placeholder="Please describe your previous experience with pets, including any experience with this specific breed/species."
                  className="input h-32"
                  value={formData.petExperience}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="reasonForAdoption" className="block text-sm font-medium text-gray-700 mb-1">
                    Why are you interested in adopting {pet.name}? *
                  </label>
                  <textarea
                    id="reasonForAdoption"
                    name="reasonForAdoption"
                    required
                    className="input h-32"
                    value={formData.reasonForAdoption}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-1">
                    Do you have any questions about {pet.name} or the adoption process?
                  </label>
                  <textarea
                    id="questions"
                    name="questions"
                    className="input h-32"
                    value={formData.questions}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 mt-1"
                  />
                  <span className="text-sm">
                    I understand that submitting this application does not guarantee adoption, and that PawFriends reserves the right to refuse an adoption if it's determined not to be in the best interest of the animal. I certify that all information provided is accurate and complete. *
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary px-8 py-3">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionFormPage;