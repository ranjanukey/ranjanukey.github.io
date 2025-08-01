import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 2,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#915EFF]/20 rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const DynamicBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animated gradient overlay */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/5 via-transparent to-[#7c3aed]/5"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "400% 400%",
      }}
    />
    
    {/* Floating particles */}
    <FloatingParticles />
    
    {/* Subtle grid pattern */}
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #915EFF 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }}
    />
  </div>
);

export default DynamicBackground;
