import { Link } from 'react-router-dom';
import { Heart, Search, HandHeart } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="section bg-white overflow-hidden relative">
      <div className="container">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl overflow-hidden shadow-xl relative">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500 opacity-20"></div>
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-secondary-500 opacity-20"></div>
          
          <div className="px-6 py-12 md:p-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Meet Your Perfect Pet?</h2>
                <p className="text-white/90 mb-8 text-lg">
                  Whether you're looking for a playful puppy, a cuddly kitten, or a friendly rabbit, 
                  we have many wonderful animals waiting for their forever homes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/pets" 
                    className="btn bg-white text-primary-600 hover:bg-gray-100 font-medium flex items-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Find a Pet</span>
                  </Link>
                  <Link 
                    to="/favorites" 
                    className="btn bg-white/20 text-white hover:bg-white/30 font-medium flex items-center gap-2"
                  >
                    <Heart className="h-5 w-5" />
                    <span>View Favorites</span>
                  </Link>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm">
                  <div className="flex justify-center mb-5">
                    <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                      <HandHeart className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Volunteer or Donate</h3>
                  <p className="text-gray-600 text-center mb-5">
                    Help us save more animals by volunteering your time or donating to support our mission.
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="btn btn-outline text-sm flex-1">Volunteer</a>
                    <a href="#" className="btn btn-primary text-sm flex-1">Donate</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;