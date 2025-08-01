import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gradient-to-r from-black-100/80 to-primary/80 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-secondary text-sm">
              © 2025 Ranjan Ukey. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Data Analyst | Business Intelligence | Python & SQL
            </p>
          </div>
          
          {/* Right side - Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/ranjanukey"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <FaGithub 
                size={24} 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 group-hover:scale-110 transform"
              />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                GitHub
              </span>
            </a>
            
            <a 
              href="https://linkedin.com/in/ranjanukey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative"
            >
              <FaLinkedin 
                size={24} 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 group-hover:scale-110 transform"
              />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                LinkedIn
              </span>
            </a>
            
            <a
              href="mailto:work.ranjanukey@gmail.com"
              className="group relative"
            >
              <FaEnvelope 
                size={24} 
                className="text-gray-400 hover:text-green-400 transition-colors duration-300 group-hover:scale-110 transform"
              />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Email
              </span>
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-center text-xs text-gray-500">
            Built with React, Three.js, and passion for data ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;