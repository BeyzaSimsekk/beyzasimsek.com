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
} from "./components";
import { StarsCanvas } from "./components/canvas";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <AnimatePresence>
          {loading && <SplashScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <div className="relative z-0">
          <About />
          <Tech />
          <Works />
          <Experience />
          <Education />
        </div>
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
