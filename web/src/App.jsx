import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import ROI from './components/ROI';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-dark-slate min-h-screen text-white font-sans selection:bg-signal-orange selection:text-white">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <ROI />
      <Footer />
    </main>
  )
}

export default App
