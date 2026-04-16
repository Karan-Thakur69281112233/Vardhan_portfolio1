import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import {
  FaUser, FaRocket, FaTrophy,
  FaBriefcase, FaEnvelope, FaGamepad
} from 'react-icons/fa';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingIcons from './components/FloatingIcons';
import ArtButton from './components/ArtButton';
import ArtGalleryPage from './pages/ArtGalleryPage';
import Intro3D from './components/Intro3D';
import StoryProgress from './components/StoryProgress';
import ChapterTransition from './components/ChapterTransition';
import GamesCorner from './components/GamesCorner';
import GameWorld from './components/GameWorld';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

// Home page component
const HomePage = () => {
  return (
    <GameWorld>
      <div className="app">
        {/* Floating Gaming Icons */}
        <FloatingIcons />

        {/* Floating Art Gallery Button */}
        <ArtButton />

        {/* Story Progress Sidebar */}
        <StoryProgress />

        <Navbar />

        <main>
          {/* Chapter 1 — The Beginning */}
          <Hero />

          {/* Transition to Chapter 2 */}
          <ChapterTransition
            number={2}
            title="The Player"
            tagline="Meet the character behind the code"
            icon={FaUser}
            color="#6366f1"
          />

          {/* Chapter 2 — The Player */}
          <About />

          {/* Transition to Chapter 3 */}
          <ChapterTransition
            number={3}
            title="The Quests"
            tagline="Adventures undertaken, worlds built"
            icon={FaRocket}
            color="#ec4899"
          />

          {/* Chapter 3 — The Quests */}
          <Projects />

          {/* Transition to Chapter 4 */}
          <ChapterTransition
            number={4}
            title="The Journey"
            tagline="A timeline of growth and adventure"
            icon={FaBriefcase}
            color="#f59e0b"
          />

          {/* Chapter 4 — The Journey */}
          <Resume />

          {/* Transition to Chapter 5 */}
          <ChapterTransition
            number={5}
            title="The Arcade"
            tagline="Take a break and test your gaming skills"
            icon={FaGamepad}
            color="#06b6d4"
          />

          {/* Chapter 5 — The Arcade */}
          <GamesCorner />

          {/* Transition to Chapter 6 */}
          <ChapterTransition
            number={6}
            title="Join the Party"
            tagline="Ready to start a co-op?"
            icon={FaEnvelope}
            color="#8b5cf6"
          />

          {/* Chapter 6 — Join the Party */}
          <Contact />
        </main>

        <Footer />
      </div>
    </GameWorld>
  );
};

function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('introShown');
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('introShown', 'true');
    setShowIntro(false);
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && <Intro3D onComplete={handleIntroComplete} />}
      </AnimatePresence>
      {!showIntro && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/art" element={<ArtGalleryPage />} />
          </Routes>
        </AnimatePresence>
      )}
    </>
  );
}

export default App;
