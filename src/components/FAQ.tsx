import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [showEmail, setShowEmail] = React.useState(false);

  const faqs = [
    {
      question: "What comes in the boilerplate?",
      answer: "You get the COMPLETE source code with React 18, TypeScript, Vite, configured Supabase, Stripe integration, authentication, reusable components, EPIC documentation and practical examples. Everything ready for production!"
    },
    {
      question: "Can I use it for commercial projects?",
      answer: "OF COURSE! All plans include commercial license. You can use it to create commercial products, client websites and SaaS applications without ANY restrictions."
    },
    {
      question: "How does support work?",
      answer: "VIP support via Discord, email and detailed documentation. The Pro plan includes priority support and Enterprise includes 1-on-1 consulting with me personally!"
    },
    {
      question: "Do I need to be a React expert?",
      answer: "Basic React knowledge is enough. We include STEP-BY-STEP documentation, practical examples and automatic configuration to make setup MUCH easier."
    },
    {
      question: "How does payment work?",
      answer: "ONE-TIME payment via Stripe with credit card. No monthly fees or hidden charges."
    },
    {
      question: "Do I get updates?",
      answer: "YES! Depending on the plan, you get updates for 6 months, 12 months or LIFETIME. This includes improvements, fixes and INSANE new features."
    },
    {
      question: "Is the code clean?",
      answer: "ABSOLUTELY! We follow development best practices, clean code, typed TypeScript and complete documentation to facilitate maintenance."
    },
    {
      question: "Can I customize everything?",
      answer: "OBVIOUSLY! The code is 100% YOURS after purchase. You can modify, customize and adapt according to your specific needs. No limitations!"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-1 rounded-full">
              <div className="bg-black px-6 py-2 rounded-full flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-orange-400" />
                <span className="text-white font-bold text-sm tracking-widest">EPIC FAQ</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-6xl font-black text-white mb-6 leading-tight">
            FREQUENTLY
            <span className="block bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              ASKED QUESTIONS
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about our INSANE boilerplate
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset rounded-2xl"
              >
                <h3 className="text-xl font-black text-white tracking-wide">
                  {faq.question}
                </h3>
                <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-full">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-white" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-white mb-6">
              STILL HAVE QUESTIONS?
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Our team is ready to HELP you choose the best plan
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-black tracking-wide hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
                💬 WHATSAPP
              </button>
              <button className="border-2 border-orange-500 text-orange-400 px-8 py-4 rounded-full font-black tracking-wide hover:bg-orange-500 hover:text-black transition-all duration-300" onClick={() => setShowEmail(true)}>
                📧 EMAIL
              </button>
            </div>
          </div>
        </div>
      </div>
      {showEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-1 rounded-3xl shadow-2xl max-w-xs w-full">
            <div className="bg-black rounded-3xl p-8 flex flex-col items-center">
              <h4 className="text-2xl font-black text-white mb-4">Contact Support</h4>
              <p className="text-lg text-orange-200 mb-6 select-all">support@launchingmate.com</p>
              <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-400 transition-all duration-300" onClick={() => setShowEmail(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FAQ;