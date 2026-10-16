import React, { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Work from './components/Work/Work';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';

// The main single page layout
const HomeLayout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'auto' // instant jump back to section
        });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;
