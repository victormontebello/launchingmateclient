import React from 'react';
import { Rocket, Code2, Zap, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Hero = () => {
  const [user, setUser] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLaunchNow = async () => {
    if (user) {
      navigate('/pricing');
    } else {
      setIsLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin + '/auth-callback',
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-1 rounded-full">
              <div className="bg-black px-6 py-2 rounded-full flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-bold text-sm tracking-wide">REVOLUTIONARY BOILERPLATE</span>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl lg:text-8xl font-black text-white mb-8 leading-none">
            BUILD YOUR PROJECT
            <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
              IN DAYS
            </span>
            <span className="block text-5xl lg:text-6xl text-gray-400">NOT MONTHS</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most INSANE boilerplate on the market. React + Vite + Supabase + Stripe in a 
            configuration that will make you FLY in development. Stop wasting time!
          </p>
          
          <div className="flex flex-col gap-3 justify-center items-center mb-16">
            <button
              className="group bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white px-12 py-5 rounded-full font-black text-lg tracking-wide hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 animate-pulse shadow-lg border-4 border-orange-400/30"
              onClick={handleLaunchNow}
              disabled={isLoading}
            >
              <Rocket className="h-6 w-6 group-hover:animate-bounce" />
              <span className="uppercase tracking-widest text-2xl drop-shadow-lg">I WANT TO MAKE MONEY FAST</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <span className="block text-orange-300 text-sm font-bold tracking-wide animate-pulse drop-shadow-lg text-center">
              Promotional price for the next 6 customers only!
            </span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <Code2 className="h-12 w-12 text-orange-400 mb-4 mx-auto" />
              <h3 className="text-white font-bold text-xl mb-2">CLEAN CODE</h3>
              <p className="text-gray-400">TypeScript + React 18 with best practices</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <Zap className="h-12 w-12 text-red-400 mb-4 mx-auto" />
              <h3 className="text-white font-bold text-xl mb-2">SUPER FAST</h3>
              <p className="text-gray-400">Vite + optimizations that make the difference</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <Rocket className="h-12 w-12 text-pink-400 mb-4 mx-auto" />
              <h3 className="text-white font-bold text-xl mb-2">EASY DEPLOY</h3>
              <p className="text-gray-400">Automatic configuration for production</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-float">
        <div className="bg-orange-500 p-3 rounded-xl transform rotate-12">
          <Code2 className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute top-1/3 right-20 animate-float delay-1000">
        <div className="bg-pink-500 p-3 rounded-xl transform -rotate-12">
          <Zap className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-10 animate-float delay-2000">
        <div className="bg-red-500 p-3 rounded-xl transform rotate-45">
          <Rocket className="h-6 w-6 text-white" />
        </div>
      </div>
    </section>
  );
};

export default Hero;