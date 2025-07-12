import React from 'react';
import { Code2, Database, CreditCard, Zap, Shield, Smartphone, GitBranch, Users, Settings, Palette, Flame, CloudLightning as Lightning } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Code2 className="h-10 w-10" />,
      title: "EXTREME REACT 18",
      description: "TypeScript + React 18 with advanced hooks and optimized performance",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Lightning className="h-10 w-10" />,
      title: "TURBOCHARGED VITE",
      description: "Fastest build tool on the planet with instant HMR",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: "SUPABASE POWER",
      description: "PostgreSQL + Auth + Storage + Edge Functions configured",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "STRIPE MASTER",
      description: "Payments, subscriptions and webhooks ready to use",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "TOTAL SECURITY",
      description: "Complete auth with JWT, RLS and route protection",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "MOBILE FIRST",
      description: "Responsive design with optimized Tailwind CSS",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section id="features" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-1 rounded-full">
              <div className="bg-black px-6 py-2 rounded-full flex items-center space-x-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-white font-bold text-sm tracking-widest">INSANE FEATURES</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-6xl font-black text-white mb-6 leading-tight">
            EVERYTHING YOU
            <span className="block bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              ALWAYS WANTED
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            It's not just a boilerplate. It's a WAR MACHINE for modern development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 backdrop-blur-sm hover:transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mb-6 group-hover:shadow-2xl transition-shadow duration-500`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-white mb-6">
              + EPIC DOCUMENTATION
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Detailed guides, practical examples and VIP support on Discord
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg tracking-wide hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
              EXPLORE DOCS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;