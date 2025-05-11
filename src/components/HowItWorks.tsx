import { Search, Heart, ClipboardCheck, Home } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse Available Pets',
    description: 'Search our database of pets looking for their forever homes based on your preferences.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: Heart,
    title: 'Save Your Favorites',
    description: 'Found a pet you love? Add them to your favorites to revisit their profile later.',
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    icon: ClipboardCheck,
    title: 'Submit an Application',
    description: 'Complete our adoption application form to begin the process of bringing your new pet home.',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    icon: Home,
    title: 'Welcome Your New Pet',
    description: 'After approval, schedule a time to meet and bring your new family member home!',
    color: 'bg-green-100 text-green-600',
  },
];

const HowItWorks = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How Adoption Works</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Our simple adoption process makes it easy to find your perfect pet companion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className={`${step.color} p-5 rounded-full mb-4 transform transition-transform hover:scale-110`}
              >
                <step.icon className="h-8 w-8" />
              </div>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                Step {index + 1}
              </span>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="#" className="btn btn-primary">
            Learn More About Adoption
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;