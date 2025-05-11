import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Hero from '../components/Hero';
import FeaturedPets from '../components/FeaturedPets';
import HowItWorks from '../components/HowItWorks';
import PetTypeSelector from '../components/PetTypeSelector';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <section className="bg-indigo-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-end space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-white py-2">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      <Hero />
      <FeaturedPets />
      <HowItWorks />
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Find Pets by Type</h2>
            <p className="text-gray-600 mt-2">
              Browse our available pets by category
            </p>
          </div>
          <PetTypeSelector />
        </div>
      </section>
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage;