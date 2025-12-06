import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Blog } from './components/Blog';
import { Guestbook } from './components/Guestbook';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeButton } from './components/ResumeButton';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';
import { VisitorCounter } from './components/VisitorCounter';
import { EasterEgg } from './components/EasterEgg';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" />
      <ScrollProgress />
      <CommandPalette />
      <VisitorCounter />
      <EasterEgg />
      <Navbar />
      <ResumeButton />
      <main>
        <Hero />
        <Skills />
        <Timeline />
        <Certifications />
        <Blog />
        <Projects />
        <Guestbook />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;