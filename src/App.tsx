import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthCallback from './components/AuthCallback';
import Success from './components/Success';

const LandingPage = () => (
  <>
    <Header />
    <Hero />
    <Features />
    <Demo />
    <Testimonials />
    <FAQ />
    <Footer />
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<><Header /><Pricing /><Footer /></>} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;