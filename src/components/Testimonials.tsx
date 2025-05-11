const testimonials = [
  {
    name: 'Sarah J.',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pet: 'Max, German Shepherd',
    petImage: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Adopting Max from PawFriends was the best decision I ever made. The process was smooth, and they were helpful throughout. Max has brought so much joy to my life!',
  },
  {
    name: 'David L.',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pet: 'Luna, Maine Coon',
    petImage: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Luna has been the perfect addition to our family. PawFriends made sure we were a good match and provided all the information we needed to give her a loving home.',
  },
  {
    name: 'Emily & Josh',
    location: 'Denver, CO',
    image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pet: 'Buddy, Golden Retriever',
    petImage: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Buddy has brought so much happiness into our lives. The adoption process was straightforward, and the PawFriends team was incredibly supportive throughout.',
  },
];

const Testimonials = () => {
  return (
    <section className="section bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Happy Adoption Stories</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            See how our adopters and their pets have found happiness together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic mb-6">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <img 
                    src={testimonial.petImage} 
                    alt={testimonial.pet} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium">Adopted: {testimonial.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="text-primary-600 font-medium hover:underline">
            Read more adoption stories →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;