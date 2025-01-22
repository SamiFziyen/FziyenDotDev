import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeButton } from './components/ResumeButton';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" />
      <Navbar />
      <ResumeButton />
      <main>
        <Hero />
        <Skills />
        <Timeline />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;