import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react"
import { CustomCursor } from './components/CustomCursor';
import Navigation from './components/Navigation';
import { Hero } from './components/Hero';

function HomePage() {
  return (
    <>
      <Hero />
    </>
  )
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen font-['Inter',sans-serif] md:cursor-none">
          <CustomCursor />
          <Navigation />
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
