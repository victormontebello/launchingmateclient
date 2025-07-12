import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Sparkles } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        navigate('/pricing', { replace: true });
      } else {
        setError('Authentication failed. Please try again.');
      }
      setIsLoading(false);
    };
    checkSession();
  }, [navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-1 rounded-full mb-8 animate-float">
        <div className="bg-black px-8 py-4 rounded-full flex items-center space-x-3">
          <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
          <span className="text-white font-bold text-lg tracking-widest">Authenticating...</span>
        </div>
      </div>
      <div className="bg-black/80 border border-orange-500/20 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
        {isLoading ? (
          <>
            <div className="flex justify-center mb-6">
              <span className="loading loading-spinner loading-lg text-orange-500"></span>
            </div>
            <p className="text-white text-lg font-bold">Finalizing your login with GitHub...</p>
            <p className="text-orange-300 mt-2">Please wait, you will be redirected soon.</p>
          </>
        ) : error ? (
          <>
            <p className="text-red-400 text-lg font-bold mb-2">{error}</p>
            <a href="/" className="text-orange-400 underline font-medium">Back to Home</a>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default AuthCallback; 