import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from "react"
import { lazy } from 'react';
import { Wrapper } from './Wrapper';

const CustomCursor = lazy(() => import('./components/CustomCursor'));
const Navigation = lazy(() => import('./components/Navigation'));
const Footer = lazy(() => import('./components/Footer'));

const Hero = lazy(() => import('./components/Hero'));
const Skills = lazy(() => import('./components/Skills'));
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const CaseStudy = lazy(() => import('./components/CaseStudy'));
const Experience = lazy(() => import('./components/Experience'));
const Architecture = lazy(() => import('./components/Architecture'));
const Contact = lazy(() => import('./components/Contact'));

function HomePage() {
  return (
    <>
      <Hero />

      <Wrapper>
        <Skills />
      </Wrapper>

      <Wrapper>
        <CaseStudies />
      </Wrapper>

      <Wrapper>
        <Experience />
      </Wrapper>

      <Wrapper>
        <Architecture />
      </Wrapper>

      <Wrapper>
        <Contact />
      </Wrapper>
    </>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen font-['Inter',sans-serif] md:cursor-none">
          <Suspense fallback={null}>
            <CustomCursor />
            <Navigation />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/case-study/:id' element={<CaseStudy />} />
            </Routes>
            <Footer />
          </Suspense>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
