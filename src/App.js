import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import Shows from './pages/Shows/Shows';
import Gallery from './pages/Gallery/Gallery';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Home />
        <Video />
        <Shows />
        <Gallery />
        <Contact />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
