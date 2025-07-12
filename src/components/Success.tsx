import React from 'react';
import { CheckCircle, Github, Download, Rocket, Mail, AlertCircle, Users, User } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Toast from './Toast';
import { supabase } from '../lib/supabase';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [repoData, setRepoData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const [user, setUser] = React.useState<any>(null);
  const [userLoading, setUserLoading] = React.useState(true);
  const hasCreatedRepo = React.useRef(false);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setUserLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (userLoading || hasCreatedRepo.current) return;
    hasCreatedRepo.current = true;
    const fetchRepoData = async () => {
      try {
        const email = searchParams.get('email') || user?.email || '';
        const planName = searchParams.get('plan') || 'PRO';
        const customerName = searchParams.get('name') || email.split('@')[0];
        const userName = user?.user_metadata?.user_name || null;
        console.log({ email, planName, customerName, userName });
        if (!email || !planName || !userName) {
          setError('Dados insuficientes para criar o repositório.');
          setIsLoading(false);
          return;
        }
        const createRepoResponse = await fetch('/api/create-repository', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            planName,
            customerName,
            userName,
          }),
        });
        if (!createRepoResponse.ok) {
          const errorData = await createRepoResponse.json();
          throw new Error(errorData.message || 'Erro ao criar repositório');
        }
        const createRepoData = await createRepoResponse.json();
        setRepoData(createRepoData.repoResult);
      } catch (error: any) {
        console.error('Erro ao criar repositório:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRepoData();
  }, [userLoading, user, searchParams]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({
        message: 'Link copied to clipboard!',
        type: 'success',
        isVisible: true,
      });
    } catch (err) {
      console.error('Erro ao copiar:', err);
      setToast({
        message: 'Error copying link',
        type: 'error',
        isVisible: true,
      });
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center py-24 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-4">Processing your payment...</h2>
          <p className="text-gray-400">Please wait while we prepare your project!</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center py-24 px-4">
        <div className="text-center">
          <div className="bg-red-500 p-3 rounded-full mx-auto mb-6 w-fit">
            <AlertCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Error loading data</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  if (!repoData) {
    return null;
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center py-24 px-4">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-green-500 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Payment <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">Confirmed!</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Congratulations! Your project is ready and has been delivered successfully.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <Rocket className="h-8 w-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Your Project is Ready!</h2>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <a
                  href={repoData.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white p-4 rounded-xl transition-all duration-300 group mb-4"
                >
                  <div className="flex items-center">
                    <Github className="h-6 w-6 mr-3 text-orange-500" />
                    <span>View on GitHub</span>
                  </div>
                  <Download className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <button
                  onClick={() => copyToClipboard(repoData.repoUrl || '')}
                  className="flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-4 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center">
                    <Download className="h-6 w-6 mr-3" />
                    <span>Copy Link</span>
                  </div>
                </button>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 mt-4">
                  <p className="text-gray-400 text-sm mb-2">Clone command:</p>
                  <code className="text-green-400 text-sm break-all">
                    git clone {repoData.repoUrl}
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </button>
            <a
              href="mailto:support@launchingmate.com"
              className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
            >
              <Mail className="h-5 w-5 mr-2" />
              Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success; 