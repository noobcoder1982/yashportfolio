import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SeekBar from './components/SeekBar';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [phase, setPhase] = useState('loading');
  const currentYear = new Date().getFullYear();

  // Clear hash and force scroll to top on refresh to prevent jumping directly to About
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        window.history.replaceState(null, null, window.location.pathname);
      }, 50);
    }
  }, []);

  const handlePreloaderExit = () => {
    setPhase('exiting');
    setTimeout(() => setPhase('done'), 1400);
  };

  return (
    <>
      {phase !== 'done' && <Preloader onComplete={handlePreloaderExit} />}

      <SeekBar />

      <div className={`app-wrapper ${phase !== 'loading' ? 'fade-in-ready' : ''} ${phase === 'done' ? 'content-visible' : ''}`}>
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
