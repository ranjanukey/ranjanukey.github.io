import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import ResumeModal from "./ResumeModal";
import useCountUp from "../hooks/useCountUp";

const AnimatedStat = ({ value, suffix, label, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(isVisible ? value : 0, 2000, 0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div 
      className='text-center group cursor-pointer'
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.8 }}
    >
      <div className='text-2xl lg:text-3xl font-bold text-[#915EFF] group-hover:text-[#7c3aed] transition-colors duration-300 relative'>
        {count}{suffix}
        <div className='absolute inset-0 rounded-lg bg-[#915EFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl'></div>
      </div>
      <div className='text-xs lg:text-sm text-secondary uppercase tracking-wider group-hover:text-white transition-colors duration-300'>
        {label}
      </div>
    </motion.div>
  );
};

const TypewriterText = () => {
  const texts = [
    "transform raw data into\nactionable business intelligence",
    "build interactive dashboards\nthat drive strategic decisions", 
    "leverage Python & SQL to\nuncover hidden patterns",
    "create compelling data stories\nthat influence stakeholders",
    "am a Data Science Student\npassionate about analytics"
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 30 : 60; // Faster deletion (30ms), faster typing (60ms)
    const pauseDuration = isDeleting ? 300 : 1200; // Shorter pauses (300ms after deleting, 1.2s after typing)

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentTextIndex, texts]);

  return (
    <p className={`${styles.heroSubText} mt-2 text-white-100`}>
      I <span className="text-[#915EFF]">{displayedText}</span>
      <span className="animate-pulse text-[#915EFF]">|</span>
    </p>
  );
};

const Hero = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
        style={{ zIndex: 20 }}
      >
        <div className='flex flex-col justify-center items-center mt-28 md:mt-5 lg:5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="mt-28 md:mt-5 lg:5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className='text-[#915EFF]'>Ranjan Ukey</span>
            </h1>
            
            {/* View Resume Button - Next to Name */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className='mt-4 lg:mt-0 relative pointer-events-auto'
              style={{ zIndex: 100 }}
            >
              <button
                onClick={openResumeModal}
                className='relative bg-gradient-to-r from-[#915EFF] to-[#7c3aed] text-white px-6 py-3 rounded-full font-bold text-base hover:scale-105 hover:shadow-xl hover:shadow-[#915EFF]/60 transition-all duration-300 flex items-center gap-2 border-2 border-[#915EFF]/30 shadow-lg animate-pulse hover:animate-none cursor-pointer pointer-events-auto'
                style={{ zIndex: 100 }}
              >
                <span className='text-lg'>�</span>
                Explore My Journey
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#915EFF] to-[#7c3aed] opacity-30 animate-ping pointer-events-none'></div>
              </button>
            </motion.div>
          </div>
          
          <TypewriterText />
          
          {/* Professional Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className='mt-8 grid grid-cols-3 gap-6 lg:gap-8'
          >
            <AnimatedStat value={5} suffix="+" label="Technologies" delay={1200} />
            <AnimatedStat value={500} suffix="+" label="Hours Coded" delay={1400} />
            <AnimatedStat value={8} suffix="+" label="Dashboards Created" delay={1600} />
          </motion.div>
        </div>
      </div>

      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'auto',
          touchAction: 'none'
        }}
      >
        <ComputersCanvas />
      </div>

      {/* Professional Quick Actions */}
      <div className='absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:flex flex-col gap-4'>
        <motion.a
          href="/Ranjanukey_cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className='group relative w-12 h-12 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#915EFF]/50 transition-all duration-300'
        >
          <span className='text-white text-xl'>📄</span>
          <div className='absolute right-14 bg-black/80 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
            Download Resume
          </div>
        </motion.a>
        
        <motion.a
          href="mailto:work.ranjanukey@gmail.com"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className='group relative w-12 h-12 bg-gradient-to-r from-[#00d4ff] to-[#0099cc] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#00d4ff]/50 transition-all duration-300'
        >
          <span className='text-white text-xl'>✉️</span>
          <div className='absolute right-14 bg-black/80 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
            Send Email
          </div>
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/ranjanukey"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className='group relative w-12 h-12 bg-gradient-to-r from-[#0077b5] to-[#005885] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#0077b5]/50 transition-all duration-300'
        >
          <span className='text-white text-xl'>💼</span>
          <div className='absolute right-14 bg-black/80 text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
            LinkedIn Profile
          </div>
        </motion.a>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={closeResumeModal} 
      />
    </section>
  );
};

export default Hero;
