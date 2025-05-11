import { Link } from 'react-router-dom';
import { PawPrint as Paw, Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="section flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="mb-6">
        <Paw className="h-16 w-16 text-primary-500 mx-auto" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        Oops! It seems like the page you're looking for has wandered off. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn btn-primary flex items-center gap-2">
          <Home className="h-5 w-5" />
          <span>Go Home</span>
        </Link>
        <Link to="/pets" className="btn btn-outline flex items-center gap-2">
          <Search className="h-5 w-5" />
          <span>Browse Pets</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;