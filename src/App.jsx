import { HashRouter } from "react-router-dom";
import { Navbar, Hero, About, Education, Experience, Tech, Works, Contact, StarsCanvas } from "./components";
import ScrollProgress from "./components/ScrollProgress";

const App = () => {
  return (
    <HashRouter>
      <div className='relative z-0 bg-primary'>
        {/* Futuristic Enhancements */}
        <ScrollProgress />
        
        {/* Neural Network Background */}
        <div className="neural-network" />
        
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Education />
        <Experience />
        <Tech />
        <Works />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
