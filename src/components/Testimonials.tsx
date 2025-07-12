import React from 'react';
import { Star, Quote, Flame } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Founder @ TechStart",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "DUDE, this boilerplate is INSANE! I saved 3 weeks of development. The code quality is next level!",
      rating: 5,
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Ana Costa",
      role: "Full Stack Developer",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "Best investment I made! The Supabase and Stripe setup worked PERFECTLY. I recommend it 1000%!",
      rating: 5,
      gradient: "from-pink-500 to-purple-500"
    },
    {
      name: "Pedro Santos",
      role: "Product Manager",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "I was able to validate my idea MUCH faster. The boilerplate has everything I need for a professional MVP.",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Maria Oliveira",
      role: "CEO @ SaaS Labs",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "CLEAN code, well structured and with best practices. My team adapted quickly!",
      rating: 5,
      gradient: "from-green-500 to-teal-500"
    },
    {
      name: "João Ferreira",
      role: "Freelancer",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "I've used it in 5 different projects. Every client was IMPRESSED with the delivery speed!",
      rating: 5,
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      name: "Laura Mendes",
      role: "Startup Founder",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      content: "The Stripe integration SAVED my life! I was able to launch my product in 2 weeks. INCREDIBLE!",
      rating: 5,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-1 rounded-full">
              <div className="bg-black px-6 py-2 rounded-full flex items-center space-x-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-white font-bold text-sm tracking-widest">REAL TESTIMONIALS</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-6xl font-black text-white mb-6 leading-tight">
            WHAT THE
            <span className="block bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              DEVS SAY
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Over 500+ developers have already TURBOCHARGED their projects with our boilerplate.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="relative mb-8">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-orange-500/30" />
                <p className="text-gray-300 leading-relaxed pl-6 font-medium">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-700"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center`}>
                    <Star className="h-3 w-3 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <div className="font-black text-white text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-white mb-6">
              JOIN 500+ DEVS
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Who have already REVOLUTIONIZED their projects with our boilerplate
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-12 py-4 rounded-full font-black text-lg tracking-wide hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
              🚀 START NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;