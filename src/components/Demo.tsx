import React from 'react';
import { Clock, Zap, Shield, Users, TrendingUp, CheckCircle, Rocket, Star, ArrowRight, Code2, Database, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Demo = () => {
  const [user, setUser] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleGetStarted = async () => {
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

  const benefits = [
    {
      icon: <Clock className="h-12 w-12" />,
      title: "SAVE MONTHS",
      description: "Skip the boring setup. Get straight to building your product.",
      metric: "80% faster",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "ZERO CONFIGURATION",
      description: "Everything works out of the box. No complex setup required.",
      metric: "0 config",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "PRODUCTION READY",
      description: "Enterprise-grade security and best practices included.",
      metric: "100% secure",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "TEAM APPROVED",
      description: "Used by 500+ developers. Trusted by startups and agencies.",
      metric: "500+ devs",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const integrations = [
    {
      icon: <Code2 className="h-8 w-8" />,
      name: "React 18",
      status: "Ready",
      color: "text-blue-400"
    },
    {
      icon: <Database className="h-8 w-8" />,
      name: "Supabase",
      status: "Connected",
      color: "text-green-400"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      name: "Stripe",
      status: "Integrated",
      color: "text-purple-400"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      name: "Auth",
      status: "Protected",
      color: "text-orange-400"
    }
  ];

  const testimonials = [
    {
      quote: "I saved 3 weeks of development time. The code quality is INSANE!",
      author: "Alex Chen",
      role: "Full Stack Developer",
      company: "TechStart Inc"
    },
    {
      quote: "Best investment I made! Everything worked perfectly out of the box.",
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "InnovateLab"
    },
    {
      quote: "My clients were impressed with the delivery speed. Game changer!",
      author: "Mike Rodriguez",
      role: "Agency Owner",
      company: "Digital Solutions"
    }
  ];

  return (
    <section id="demo" className="py-32 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-1 rounded-full">
              <div className="bg-black px-6 py-2 rounded-full flex items-center space-x-2">
                <Rocket className="h-4 w-4 text-orange-400" />
                <span className="text-white font-bold text-sm tracking-widest">WHY CHOOSE US</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-6xl font-black text-white mb-6 leading-tight">
            STOP WASTING
            <span className="block bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              TIME ON SETUP
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Focus on what matters: building your product. We handle the boring stuff.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-black/40 rounded-2xl border border-gray-800 p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
              <div className={`bg-gradient-to-r ${benefit.color} p-4 rounded-2xl w-fit mb-6`}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-400 mb-4">{benefit.description}</p>
              <div className="text-3xl font-black text-orange-400">{benefit.metric}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Integrations */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-4xl font-black text-white mb-4">
                EVERYTHING
                <span className="block bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                  INTEGRATED
                </span>
              </h3>
              <p className="text-lg text-gray-400 mb-8">
                All the tools you need, working together seamlessly.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {integrations.map((integration, index) => (
                <div key={index} className="bg-black/60 rounded-xl border border-gray-800 p-6 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-gray-400">
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{integration.name}</h4>
                      <span className={`text-sm font-bold ${integration.color}`}>{integration.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-400">Ready to use</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <TrendingUp className="h-8 w-8 text-orange-400" />
                <div>
                  <h4 className="font-black text-white text-lg">Performance Optimized</h4>
                  <p className="text-gray-400 text-sm">Lighthouse score: 95+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Testimonials */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-black text-white mb-4">
                WHAT DEVELOPERS
                <span className="block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  ARE SAYING
                </span>
              </h3>
            </div>
            
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black/40 rounded-2xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-6 text-center">
              <h4 className="text-2xl font-black text-white mb-2">Ready to accelerate?</h4>
              <p className="text-orange-100 mb-4">Join 500+ developers who already saved weeks</p>
              <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 mx-auto" onClick={handleGetStarted} disabled={isLoading}>
                <span>Get Started Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;