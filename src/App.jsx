import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Education,
  Hero,
  Navbar,
  Tech,
  Works,
  SplashScreen,
  Footer,
} from "./components";
import { StarsCanvas } from "./components/canvas";
import { LanguageProvider } from "./context/LanguageContext";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          {loading ? (
            <SplashScreen key="splash" onComplete={() => setLoading(false)} />
          ) : (
            <div className="relative z-0 bg-primary">
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
              </div>
              <About />
              <Experience />
              <Tech />
              <Works />
              <Education />
              <div className="relative z-0">
                <Contact />
                <StarsCanvas />
              </div>
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
