import React from 'react';
import { motion } from 'framer-motion';

const AdvancedEffectsDemo = () => {
  return (
    <div className="min-h-screen bg-primary p-8 flex flex-wrap gap-8 justify-center items-center">
      
      {/* Hologram Text Effect */}
      <motion.div 
        className="hologram-text text-4xl font-bold p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        HOLOGRAM TEXT
      </motion.div>

      {/* Neon Glow Button */}
      <motion.button 
        className="neon-glow bg-[#915EFF] text-white px-8 py-4 rounded-lg font-bold text-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        NEON GLOW BUTTON
      </motion.button>

      {/* Digital Glitch Text */}
      <div className="digital-glitch text-3xl font-bold text-[#915EFF] p-4">
        GLITCH EFFECT
      </div>

      {/* Cyber Pulse Card */}
      <div className="cyber-pulse bg-tertiary p-6 rounded-lg border border-[#915EFF]/30">
        <h3 className="text-white text-xl font-bold mb-2">Cyber Pulse Card</h3>
        <p className="text-secondary">This card has a cyberpunk pulse effect</p>
      </div>

      {/* Scan Line Effect */}
      <div className="scan-line-effect bg-black/50 p-6 rounded-lg border border-[#915EFF]/50">
        <h3 className="text-white text-xl font-bold mb-2">Scan Line Effect</h3>
        <p className="text-secondary">Watch the scanning line animation</p>
      </div>

      {/* Data Stream Effect */}
      <div className="data-stream-effect bg-tertiary p-6 rounded-lg">
        <h3 className="text-white text-xl font-bold mb-2">Data Stream</h3>
        <p className="text-secondary">Data flowing across the surface</p>
      </div>

      {/* Interactive Hover Effect */}
      <div className="interactive-hover bg-tertiary p-6 rounded-lg cursor-pointer">
        <h3 className="text-white text-xl font-bold mb-2">Interactive Hover</h3>
        <p className="text-secondary">Hover to see mouse-following effect</p>
      </div>

      {/* Futuristic Border */}
      <div className="futuristic-border bg-tertiary p-6 rounded-lg">
        <h3 className="text-white text-xl font-bold mb-2">Futuristic Border</h3>
        <p className="text-secondary">Animated gradient border effect</p>
      </div>

      {/* Matrix Rain Effect */}
      <div className="relative h-32 w-full bg-black rounded-lg overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="matrix-effect absolute w-1 h-4 bg-[#915EFF]"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold">Matrix Rain Effect</h3>
        </div>
      </div>

    </div>
  );
};

export default AdvancedEffectsDemo;
