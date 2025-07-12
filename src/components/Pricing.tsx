import React from 'react';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

function useCountdownToMidnight() {
  const getSecondsToMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  };
  const [timeLeft, setTimeLeft] = React.useState(getSecondsToMidnight());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getSecondsToMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const plans = [
  {
    name: 'STARTER',
    price: '$99.90',
    oldPrice: '$149.90',
    discount: 50,
    priceId: import.meta.env.VITE_STRIPE_STARTERID,
    description: 'For personal projects',
    icon: <Zap className="h-8 w-8" />,
    features: [
      'Complete source code',
      'React + TypeScript',
      'API + Web',
      'Supabase configured',
      '4 layers security',
      'Stripe integration',
      'OpenAI integration',
      'Full documentation',
    ],
    popular: false,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'PRO',
    price: '$149.90',
    oldPrice: '$199.90',
    discount: 50,
    priceId: import.meta.env.VITE_STRIPE_PROID,
    description: 'For commercial products',
    icon: <Crown className="h-8 w-8" />,
    features: [
      'Everything in Starter +',
      'Advanced components',
      'Stripe webhooks',
      'API advanced middlewares',
      'SEO tools',
      'Priority support',
      'VIP Discord',
    ],
    popular: true,
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    name: 'ULTIMATE',
    price: '$219.90',
    oldPrice: '$269.90',
    discount: 50,
    priceId: import.meta.env.VITE_STRIPE_ULTIMATEID,
    description: 'For teams and agencies',
    icon: <Rocket className="h-8 w-8" />,
    features: [
      'Everything in Pro +',
      'Unlimited commercial license',
      '1-on-1 consulting',
      'Custom setup',
      'Team training',
      'Full white-label',
      '24/7 support',
    ],
    popular: false,
    gradient: 'from-blue-500 to-cyan-500',
  },
];

const Pricing = () => {
  const countdown = useCountdownToMidnight();
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

  const handleChoosePlan = async (planName: string) => {
    const plan = plans.find(p => p.name === planName);
    if (!plan) return;
    if (!user) {
      setIsLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin + '/auth-callback',
        },
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: user.id,
          email: user.email,
          planName: plan.name,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error starting checkout.");
      }
      const { sessionId } = await response.json();
      const stripeClient = await loadStripe(import.meta.env.VITE_STRIPE_PK);
      if (!stripeClient) throw new Error("Stripe was not initialized.");
      await stripeClient.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error('Error creating checkout session:', err);
      alert('Error redirecting to checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center py-24 px-4">
      <div className="w-full flex flex-col items-center mb-10">
        <div className="animate-pulse bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-400 text-white text-lg md:text-2xl font-extrabold px-8 py-4 rounded-full shadow-2xl border-4 border-white/10 drop-shadow-lg uppercase tracking-widest mb-4 flex flex-col md:flex-row items-center gap-2">
          <span>🔥 Discount ends in</span>
          <span className="bg-black/80 px-4 py-2 rounded-xl font-mono text-2xl md:text-3xl tracking-widest border-2 border-orange-400 animate-pulse shadow-lg">
            {countdown}
          </span>
        </div>
        <span className="text-orange-300 text-sm md:text-base font-bold tracking-wide">After that, all plans return to the original price!</span>
      </div>
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-1 rounded-full">
            <div className="bg-black px-6 py-2 rounded-full flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white font-bold text-sm tracking-widest">CHOOSE YOUR PLAN</span>
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            </div>
          </div>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
          Plans to <span className="bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">accelerate</span> your project
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          One-time investment for the best React boilerplate on the market, production-ready and with VIP support.
        </p>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-3xl border border-orange-500/20 bg-gradient-to-br ${plan.gradient} p-8 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl duration-300 ${plan.popular ? 'ring-4 ring-pink-500/40 z-10 scale-105' : ''}`}
          >
            {/* Badge de desconto no canto superior esquerdo */}
            <span className="absolute -top-5 left-5 z-20">
              <span className="animate-pulse bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white text-xs md:text-sm font-extrabold px-5 py-2 rounded-full shadow-lg border-2 border-white/20 drop-shadow-lg uppercase tracking-widest">
                Save ${plan.discount}
              </span>
            </span>
            {/* Badge MOST POPULAR centralizado */}
            {plan.popular && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg animate-float z-30">
                MOST POPULAR
              </span>
            )}
            <div className="flex items-center justify-center mb-6 mt-2">
              <span className="text-5xl font-extrabold text-white mr-3">{plan.price}</span>
              <span className="text-2xl text-gray-400 font-bold line-through">{plan.oldPrice}</span>
            </div>
            <ul className="mb-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-white/90 text-base">
                  <Check className="h-5 w-5 text-orange-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-full font-black text-lg tracking-wide hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => handleChoosePlan(plan.name)}
              disabled={isLoading}
            >
              CHOOSE PLAN
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;