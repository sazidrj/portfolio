import { useState, useCallback } from 'react';
import './styles/globals.css';
import Loader from './components/ui/Loader';
import Cursor from './components/ui/Cursor';
import GridBackground from './components/ui/GridBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Showcase from './components/sections/Showcase';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Cursor />
      {!loaded && <Loader onComplete={onLoaderDone} />}
      {loaded && (
        <>
          <GridBackground />
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <Skills />
            <Showcase />
            <Projects />
            <Education />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
