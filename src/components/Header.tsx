import React from 'react';
import { Layers, Menu, X, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Handler para navegação SPA com âncora
  const handleSectionNav = (section: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => scrollToSection(section), 400); // aguarda renderização
    } else {
      scrollToSection(section);
    }
    setIsMenuOpen(false);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/auth-callback',
      },
    });
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    localStorage.clear();
    setIsLoading(false);
  };

  const handleLogoClick = () => navigate('/');

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-xl border-b border-orange-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="relative cursor-pointer" onClick={handleLogoClick} tabIndex={0} role="button" aria-label="Go to home">
              <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-3 rounded-2xl transform rotate-12 shadow-lg">
                <Layers className="h-7 w-7 text-white transform -rotate-12" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black text-white tracking-tight">Launching</span>
              <div className="text-xs text-orange-400 font-bold tracking-widest">MATE</div>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button type="button" onClick={() => handleSectionNav('features')} className="bg-transparent border-0 p-0 m-0 text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide cursor-pointer focus:outline-none">FEATURES</button>
            <button type="button" onClick={() => handleSectionNav('demo')} className="bg-transparent border-0 p-0 m-0 text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide cursor-pointer focus:outline-none">DEMO</button>
            <Link to="/pricing" className="text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide">PRICING</Link>
            <button type="button" onClick={() => handleSectionNav('faq')} className="bg-transparent border-0 p-0 m-0 text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide cursor-pointer focus:outline-none">FAQ</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <span className="loading loading-spinner text-orange-500"></span>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.user_metadata?.avatar_url || 'https://github.com/identicons/github.png'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-orange-500 cursor-pointer"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onClick={handleLogoClick}
                  tabIndex={0}
                  role="button"
                  aria-label="Go to home"
                />
                <span className="text-white font-medium text-sm">{user.user_metadata?.user_name || user.email}</span>
                <button
                  className="bg-gray-800 text-orange-400 px-4 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white px-8 py-3 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 font-bold tracking-wide transform hover:scale-105"
                onClick={handleLogin}
              >
                Sign In with Github
              </button>
            )}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-orange-500/20 py-6">
            <nav className="flex flex-col space-y-6">
              <button type="button" onClick={() => handleSectionNav('features')} className="bg-transparent border-0 p-0 m-0 text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide cursor-pointer focus:outline-none">FEATURES</button>
              <button type="button" onClick={() => handleSectionNav('demo')} className="bg-transparent border-0 p-0 m-0 text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide cursor-pointer focus:outline-none">DEMO</button>
              <Link to="/pricing" className="text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide">PRICING</Link>
              <button type="button" onClick={() => handleSectionNav('faq')} className="bg-transparent border-0 p-0 m-0 text-gray-300 hover:text-orange-400 transition-colors font-medium tracking-wide cursor-pointer focus:outline-none">FAQ</button>
              {isLoading ? (
                <span className="loading loading-spinner text-orange-500 mx-auto"></span>
              ) : user ? (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={user.user_metadata?.avatar_url || 'https://github.com/identicons/github.png'}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-orange-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="text-white font-medium text-sm">{user.user_metadata?.user_name || user.email}</span>
                  <button
                    className="bg-gray-800 text-orange-400 px-4 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white px-8 py-3 rounded-full font-bold tracking-wide w-full"
                  onClick={handleLogin}
                >
                  SignIn with Github
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;