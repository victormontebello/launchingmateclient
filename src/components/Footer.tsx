import React from 'react';
import { Layers, Twitter, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-3 rounded-2xl transform rotate-12 shadow-lg">
                  <Layers className="h-7 w-7 text-white transform -rotate-12" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <Sparkles className="h-3 w-3 text-black" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">Launching</span>
                <div className="text-xs text-orange-400 font-bold tracking-widest">MATE</div>
              </div>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The most INSANE boilerplate to accelerate your React development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-white mb-6 text-lg tracking-wide">PRODUCT</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Features</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Demo</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-white mb-6 text-lg tracking-wide">COMPANY</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-white mb-6 text-lg tracking-wide">SUPPORT</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium">Guarantee</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-medium">
            © 2025 Launchingmate. All rights reserved.
          </p>
          <div className="flex space-x-8 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-400 transition-colors font-medium">
              Terms of Use
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors font-medium">
              Privacy
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors font-medium">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;