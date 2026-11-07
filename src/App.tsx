import { BrowserRouter, Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { MotionConfig } from 'motion/react';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Skills from './components/Skills';
import CaseStudies from './components/CaseStudies';
import Experience from './components/Experience';
import Architecture from './components/Architecture';
import Contact from './components/Contact';
import ScrollManager from './components/ScrollManager';

// Only non-critical / off-route code is code-split. Home sections are rendered
// eagerly so in-page navigation (#contact etc.), scroll-spy, Ctrl+F and crawlers
// can always find every section.
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const CaseStudy = lazy(() => import('./components/CaseStudy'));
const NotFound = lazy(() => import('./components/NotFound'));

function HomePage() {
  return (
    <>
      <title>Rishabh Agarwal — Senior Frontend Engineer</title>
      <Hero />
      <Skills />
      <CaseStudies />
      <Experience />
      <Architecture />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollManager />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-zinc-800 focus:text-white"
        >
          Skip to content
        </a>

        <div className="min-h-screen flex flex-col">
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>

          <Navigation />

          <main id="main" className="flex-1">
            <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/case-study/:id" element={<CaseStudy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
